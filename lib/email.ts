/**
 * Email service using Resend.
 * If RESEND_API_KEY is not set, emails are logged to console (dev mode).
 */
import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "noreply@ascend360.org";
const ORG_EMAIL = "info@ascend360.org";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ascend360.org";

/* ── helpers ──────────────────────────────────────────────────────────────── */

// Lazy — only instantiate Resend when an API key exists (avoids build-time crash)
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

function isConfigured() {
  return !!process.env.RESEND_API_KEY;
}

function inquiryLabel(type: string) {
  const map: Record<string, string> = {
    STUDENT: "Student inquiry",
    VOLUNTEER: "Volunteer application",
    PARTNER: "Partnership inquiry",
    MEDIA: "Media inquiry",
    OTHER: "General inquiry",
  };
  return map[type] ?? type;
}

/* ── Contact form ─────────────────────────────────────────────────────────── */

export async function sendContactNotification(data: {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  submissionId: string;
}) {
  if (!isConfigured()) {
    console.log("[email] RESEND_API_KEY not set — skipping notification email", data);
    return;
  }

  const label = inquiryLabel(data.inquiryType);
  const adminUrl = `${SITE_URL}/admin/submissions`;

  await getResend()!.emails.send({
    from: FROM,
    to: ORG_EMAIL,
    replyTo: data.email,
    subject: `[ascend360] New ${label} from ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
        <div style="background:#1F4788;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">New Contact Submission</h1>
        </div>
        <div style="background:#f9f9f9;padding:32px;border-radius:0 0 8px 8px;border:1px solid #eee;border-top:none">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-weight:600;width:140px;color:#555">From</td><td style="padding:8px 0">${data.name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#555">Email</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#4CAF50">${data.email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#555">Type</td><td style="padding:8px 0">${label}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <p style="font-weight:600;color:#555;margin-bottom:8px">Message</p>
          <p style="background:white;padding:16px;border-radius:4px;border:1px solid #eee;white-space:pre-wrap;line-height:1.6">${data.message}</p>
          <div style="margin-top:24px;text-align:center">
            <a href="${adminUrl}" style="display:inline-block;background:#1F4788;color:white;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:600">View in Admin Panel</a>
          </div>
          <p style="font-size:12px;color:#999;text-align:center;margin-top:24px">Submission ID: ${data.submissionId}</p>
        </div>
      </div>
    `,
  });
}

export async function sendContactAutoReply(data: {
  name: string;
  email: string;
  inquiryType: string;
}) {
  if (!isConfigured()) {
    console.log("[email] RESEND_API_KEY not set — skipping auto-reply email");
    return;
  }

  const label = inquiryLabel(data.inquiryType);

  await getResend()!.emails.send({
    from: FROM,
    to: data.email,
    subject: "We've received your message — ascend360",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
        <div style="background:#1F4788;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">Thank you, ${data.name}!</h1>
        </div>
        <div style="background:#f9f9f9;padding:32px;border-radius:0 0 8px 8px;border:1px solid #eee;border-top:none">
          <p style="line-height:1.7">We've received your <strong>${label}</strong> and will get back to you within <strong>48 hours</strong>.</p>
          <p style="line-height:1.7">In the meantime, feel free to explore our work and follow us on social media for updates on Xcel360 sessions and scholarship opportunities.</p>
          <div style="margin:28px 0;text-align:center">
            <a href="${SITE_URL}/projects/xcel360" style="display:inline-block;background:#4CAF50;color:white;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:600">Explore Xcel360</a>
          </div>
          <hr style="border:none;border-top:1px solid #eee"/>
          <p style="font-size:13px;color:#666;line-height:1.6">
            ascend360 is a registered Nigerian NGO committed to education access, poverty reduction, and environmental action.
          </p>
          <p style="font-size:12px;color:#999">
            This is an automated confirmation. Please do not reply to this email — reply to <a href="mailto:${ORG_EMAIL}" style="color:#4CAF50">${ORG_EMAIL}</a> to reach us directly.
          </p>
        </div>
      </div>
    `,
  });
}
