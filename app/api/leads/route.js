import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { sendTransactionalEmail } from "@/lib/brevo";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isHoneypotTriggered } from "@/lib/honeypot";
import { validateLeadInput, escapeHtml } from "@/lib/validation";

function buildLeadEmailHtml(body) {
  return `
    <h2>New lead from bhaashaseekho.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
    <p><strong>Interested in:</strong> ${escapeHtml(body.interest)}</p>
    <p><strong>How they heard about us:</strong> ${escapeHtml(body.howHeard || "-")}</p>
    <p><strong>UTM source/medium/campaign:</strong> ${escapeHtml(body.utmSource || "-")} /
      ${escapeHtml(body.utmMedium || "-")} / ${escapeHtml(body.utmCampaign || "-")}</p>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (isHoneypotTriggered(body.honeypot)) {
      // Silently pretend success so the bot doesn't learn it was caught —
      // no DB write, no email.
      return NextResponse.json({ success: true });
    }

    const { allowed } = checkRateLimit(`leads:${getClientIp(request)}`);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { valid, errors } = validateLeadInput(body);
    if (!valid) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Saving the lead is the critical path — if this fails, the request
    // fails, because the lead is genuinely lost otherwise.
    await connectDB();
    await Lead.create({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email.trim().toLowerCase(),
      interest: body.interest.trim(),
      howHeard: (body.howHeard || "").trim(),
      utmSource: (body.utmSource || "").trim(),
      utmMedium: (body.utmMedium || "").trim(),
      utmCampaign: (body.utmCampaign || "").trim(),
    });

    // Brevo notification is best-effort: the lead is already safely in
    // MongoDB, so a failed notification email shouldn't fail the request.
    try {
      const notifyEmail = process.env.CLIENT_NOTIFICATION_EMAIL;
      if (notifyEmail) {
        await sendTransactionalEmail({
          to: notifyEmail,
          subject: `New lead: ${body.name} (${body.interest})`,
          htmlContent: buildLeadEmailHtml(body),
        });
      }
    } catch (emailErr) {
      console.error("Brevo notification failed for lead:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/leads failed:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
