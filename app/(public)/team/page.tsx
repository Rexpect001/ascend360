import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import TeamContent from "./TeamContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the trustees, staff, and mentors behind ASCEND360 — passionate Nigerians committed to education access and community development.",
  keywords: ["ASCEND360 team", "Nigerian NGO founders", "education NGO leadership"],
  openGraph: {
    title: "Our Team | ASCEND360",
    description: "Meet the trustees, staff, and mentors driving ASCEND360's mission.",
    url: "/team",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

async function getTeam() {
  return prisma.teamMember.findMany({
    where: { isActive: true },
    select: { id: true, name: true, title: true, roleType: true, bio: true, imageUrl: true, linkedinUrl: true, email: true },
    orderBy: [{ roleType: "asc" }, { displayOrder: "asc" }],
  });
}

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-white text-center overflow-hidden hero-section"
        style={{ backgroundImage: "url('/images/about-bg.svg')" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(10,28,68,0.80)" }} />
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-72 h-72 bg-[#4CAF50] top-[-60px] right-[-40px] opacity-[0.14] animate-float-a" />
        <div className="orb w-56 h-56 bg-[#2196F3] bottom-[-30px] left-[-30px] opacity-[0.16] animate-float-b" />
        <div className="relative z-10 max-w-3xl mx-auto" style={{ animation: "rise 0.65s ease-out 0.2s both" }}>
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our People</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Meet the Team</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Passionate Nigerians united by a belief that every student deserves
            access to life-changing information and mentorship.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,50 L0,20 Q360,50 720,10 Q1080,0 1440,32 L1440,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      <TeamContent members={members} />
    </>
  );
}
