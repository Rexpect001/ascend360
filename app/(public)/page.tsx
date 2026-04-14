import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

async function getHomepageData() {
  const latestPosts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      content: true,
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
  return { latestPosts };
}

export default async function HomePage() {
  const { latestPosts } = await getHomepageData();

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden hero-section"
        style={{ backgroundImage: "url('/images/hero-bg.svg')" }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, rgba(13,45,94,0.78) 0%, rgba(31,71,136,0.72) 45%, rgba(22,58,110,0.78) 100%)",
          }}
        />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-dots-white" />

        {/* Floating orbs */}
        <div className="orb w-[420px] h-[420px] bg-[#4CAF50] top-[-100px] right-[-80px] opacity-[0.10] animate-float-a" />
        <div className="orb w-[320px] h-[320px] bg-[#2196F3] bottom-[-60px] left-[-60px] opacity-[0.12] animate-float-b" />
        <div className="orb w-[200px] h-[200px] bg-[#4CAF50] top-[30%] left-[10%] opacity-[0.08] animate-float-c" />
        <div
          className="orb w-[160px] h-[160px] bg-white bottom-[20%] right-[12%] opacity-[0.05] animate-float-a"
          style={{ animationDelay: "-4s" }}
        />

        {/* Spinning accent rings */}
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-spin-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div
          className="absolute w-[400px] h-[400px] rounded-full border border-[#4CAF50]/10 animate-spin-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ animationDirection: "reverse", animationDuration: "20s" }}
        />

        {/* Content — staggered rise animations */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 bg-[#4CAF50]/15 border border-[#4CAF50]/35 text-[#4CAF50] text-xs font-bold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest"
            style={{ animation: "rise 0.6s ease-out 0.1s both" }}
          >
            <span>🇳🇬</span>
            <span>Registered Nigerian NGO</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight"
            style={{ animation: "rise 0.65s ease-out 0.28s both" }}
          >
            Empowering Africa&apos;s{" "}
            <span className="text-[#4CAF50] relative">
              Next Generation
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 300 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,6 Q75,0 150,5 Q225,10 300,4"
                  stroke="#4CAF50"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ animation: "rise 0.65s ease-out 0.46s both" }}
          >
            ASCEND360 is a Nigerian NGO committed to education access, poverty
            reduction, and environmental action — turning potential into
            achievement for students across Nigeria.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "rise 0.65s ease-out 0.62s both" }}
          >
            <Link
              href="/get-involved"
              className="btn-primary text-base shadow-lg shadow-green-900/30"
            >
              Get Involved
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-secondary text-base">
              Our Story
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-14 flex justify-center"
            style={{ animation: "rise 0.65s ease-out 0.9s both" }}
          >
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div
                className="w-px h-8 bg-white"
                style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
              />
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="wave-bottom">
          <svg
            viewBox="0 0 1440 80"
            className="w-full"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path
              d="M0,80 L0,40 Q180,0 360,35 Q540,70 720,30 Q900,0 1080,38 Q1260,72 1440,28 L1440,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── All animated scroll sections ── */}
      <HomeContent latestPosts={latestPosts} />
    </>
  );
}
