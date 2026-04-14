import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendContactNotification, sendContactAutoReply } from "@/lib/email";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxSubmissions = 3;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxSubmissions) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkContactRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        inquiryType: parsed.data.inquiryType,
      },
    });

    // Fire emails in background — don't block the response
    Promise.all([
      sendContactNotification({
        name: parsed.data.name,
        email: parsed.data.email,
        inquiryType: parsed.data.inquiryType,
        message: parsed.data.message,
        submissionId: submission.id,
      }),
      sendContactAutoReply({
        name: parsed.data.name,
        email: parsed.data.email,
        inquiryType: parsed.data.inquiryType,
      }),
    ]).catch((err) => console.error("[email] Failed to send contact emails:", err));

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! We'll be in touch soon.",
      id: submission.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
