import { NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/brevo";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isHoneypotTriggered } from "@/lib/honeypot";
import { validateContactInput, escapeHtml } from "@/lib/validation";

function buildContactEmailHtml(body) {
  return `
    <h2>New contact message from bhaashaseekho.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(body.message || "(no message provided)")}</p>
  `;
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

    // No DB save for contact messages (per spec) — Brevo is the only path,
    // so unlike /api/leads, its failure must surface to the visitor since
    // there's no persisted record to fall back on.
    const notifyEmail = process.env.CLIENT_NOTIFICATION_EMAIL;
    if (!notifyEmail) {
      throw new Error("CLIENT_NOTIFICATION_EMAIL is not configured");
    }

    await sendTransactionalEmail({
      to: notifyEmail,
      subject: `New contact message from ${body.name}`,
      htmlContent: buildContactEmailHtml(body),
      replyTo: body.email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return NextResponse.json(
      { success: false, message: "Message could not be sent. Please try WhatsApp or call us directly." },
      { status: 502 }
    );
  }
}
