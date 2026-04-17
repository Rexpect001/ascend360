import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ImpactContent from "./ImpactContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See the measurable impact of ascend360's programs — 500+ students reached, scholarships won, and communities transformed across Nigeria.",
  keywords: ["NGO impact Nigeria", "scholarship outcomes", "student success stories", "ascend360 impact"],
  openGraph: {
    title: "Our Impact | ascend360",
    description: "500+ students reached, scholarships won, and communities transformed across Nigeria.",
    url: "/impact",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

async function getImpactData() {
  return prisma.impactStory.findMany({
    where: { isPublished: true },
    select: { id: true, studentName: true, storyTitle: true, storyContent: true, imageUrl: true, outcome: true },
    orderBy: { publishedAt: "desc" },
  });
}

export default async function ImpactPage() {
  const stories = await getImpactData();

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-white text-center overflow-hidden hero-section"
        style={{ backgroundImage: "url('/images/impact-bg.svg')" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(8,24,58,0.78)" }} />
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-72 h-72 bg-[#4CAF50] top-[-60px] right-[-40px] opacity-[0.14] animate-float-a" />
        <div className="orb w-56 h-56 bg-[#2196F3] bottom-[-30px] left-[-30px] opacity-[0.16] animate-float-b" />
        <div className="relative z-10 max-w-3xl mx-auto" style={{ animation: "rise 0.65s ease-out 0.2s both" }}>
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our Impact</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Real Change. Measured Impact.</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Every session, every mentorship, every scholarship win is a data point in our story of transformation.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,50 L0,25 Q360,50 720,15 Q1080,0 1440,30 L1440,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      <ImpactContent stories={stories} />
    </>
  );
}
