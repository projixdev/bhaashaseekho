import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendTransactionalEmail } from "@/lib/brevo";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isHoneypotTriggered } from "@/lib/honeypot";
import { validateContactInput, escapeHtml } from "@/lib/validation";
import { renderEmailLayout, emailButton, getWhatsAppUrl } from "@/lib/emailTemplate";

function buildOwnerEmailHtml(body) {
  const inner = `
    <h2 style="margin:0 0 16px; font-size:18px; color:#0f172a;">New contact message</h2>
    <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(body.name)}</p>
    <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(body.email)}</p>
    <p style="margin:16px 0 4px;"><strong>Message:</strong></p>
    <p style="margin:0; padding:12px; background-color:#f8fafc; border-radius:6px; color:#334155;">${escapeHtml(body.message || "(no message provided)")}</p>
  `;
  return renderEmailLayout({ preheader: `New contact message from ${body.name}`, bodyHtml: inner });
}

function buildUserConfirmationHtml(body) {
  const whatsappUrl = getWhatsAppUrl();

  const inner = `
    <p style="margin:0 0 16px;">Hi ${escapeHtml(body.name)},</p>
    <p style="margin:0 0 20px;">Thanks for reaching out to Bhaasha Seekho! We've received your message and someone from our team will get back to you within 24 hours.</p>
    ${whatsappUrl ? `<p style="margin:0 0 24px;">${emailButton("Chat on WhatsApp", whatsappUrl)}</p>` : ""}
    <p style="margin:0 0 4px; font-size:13px; color:#64748b;">Your message:</p>
    <p style="margin:0 0 20px; padding:12px; background-color:#f8fafc; border-radius:6px; color:#334155; font-size:14px;">${escapeHtml(body.message || "(no message provided)")}</p>
    <p style="margin:0;">— The Bhaasha Seekho Team</p>
  `;
  return renderEmailLayout({
    preheader: "We've received your message and will be in touch within 24 hours.",
    bodyHtml: inner,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (isHoneypotTriggered(body.honeypot)) {
      return NextResponse.json({ success: true });
    }

    const { allowed } = checkRateLimit(`contact:${getClientIp(request)}`);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { valid, errors } = validateContactInput(body);
    if (!valid) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Saving the message is the critical path — if this fails, the request
    // fails, because the message is genuinely lost otherwise.
    await connectDB();
    await Contact.create({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      message: (body.message || "").trim(),
    });

    // Both emails are best-effort: the message is already safely stored,
    // so a failed send shouldn't fail the request.
    const notifyEmail = process.env.CLIENT_NOTIFICATION_EMAIL;
    if (notifyEmail) {
      try {
        await sendTransactionalEmail({
          to: notifyEmail,
          subject: `New contact message from ${body.name}`,
          htmlContent: buildOwnerEmailHtml(body),
          replyTo: body.email,
        });
      } catch (ownerErr) {
        console.error("Contact owner notification failed:", ownerErr);
      }
    }

    try {
      await sendTransactionalEmail({
        to: body.email,
        subject: "We've received your message — Bhaasha Seekho",
        htmlContent: buildUserConfirmationHtml(body),
      });
    } catch (confirmErr) {
      console.error("Contact confirmation email failed:", confirmErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return NextResponse.json(
      { success: false, message: "Message could not be sent. Please try WhatsApp or call us directly." },
      { status: 502 }
    );
  }
}
