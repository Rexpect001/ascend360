import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Can't use prisma in edge — read from public API instead
async function getPost(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ascend360.org";
    const res = await fetch(`${base}/api/posts/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as { title: string; excerpt?: string; featuredImage?: string; author?: { name: string } } | null;
  } catch {
    return null;
  }
}

export default async function BlogOGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post?.title ?? "ascend360 Blog";
  const author = post?.author?.name ?? "ascend360";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1F4788",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blurred featured image as background */}
        {post?.featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.25,
            }}
          />
        )}

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,25,60,0.95) 60%, rgba(10,25,60,0.6))",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Blog label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#4CAF50",
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "sans-serif",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            ascend360 · Blog
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 60 ? 44 : 56,
              fontWeight: 800,
              color: "white",
              fontFamily: "sans-serif",
              letterSpacing: "-1px",
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {title}
          </div>

          {/* Author */}
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif" }}>
            By {author}
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            top: 56,
            right: 72,
            fontSize: 20,
            color: "rgba(255,255,255,0.35)",
            fontFamily: "sans-serif",
          }}
        >
          ascend360.org
        </div>
      </div>
    ),
    { ...size }
  );
}
