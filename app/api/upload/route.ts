import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { requireAuth } from "@/lib/auth";
import crypto from "crypto";

const BUCKET = process.env.S3_BUCKET_NAME || "";
const REGION = process.env.S3_REGION || "us-east-1";
const ENDPOINT = process.env.S3_ENDPOINT; // optional — Cloudflare R2 or custom

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function isConfigured() {
  return !!(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    BUCKET
  );
}

function getS3() {
  return new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    ...(ENDPOINT ? { endpoint: ENDPOINT } : {}),
  });
}

/** POST /api/upload
 * Body: { contentType: string; size: number; folder?: string }
 * Returns: { uploadUrl: string; publicUrl: string }
 */
export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Storage not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and S3_BUCKET_NAME." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { contentType, size, folder = "uploads" } = body;

  if (!ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "Unsupported file type. Use JPEG, PNG, WebP, or GIF." }, { status: 400 });
  }
  if (!size || size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5 MB)." }, { status: 400 });
  }

  const ext = contentType.split("/")[1].replace("jpeg", "jpg");
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    ContentLength: size,
    // Make uploaded objects publicly readable
    ACL: "public-read",
  });

  const uploadUrl = await getSignedUrl(getS3(), command, { expiresIn: 300 });

  const publicUrl = ENDPOINT
    ? `${ENDPOINT}/${BUCKET}/${key}`
    : `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

  return NextResponse.json({ uploadUrl, publicUrl });
}
