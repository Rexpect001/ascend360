import type { Metadata } from "next";
import GetInvolvedContent from "./GetInvolvedContent";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join ASCEND360 as a student, volunteer, mentor, or partner — and help expand education access across Nigeria.",
  keywords: ["volunteer Nigeria NGO", "mentor Nigerian students", "partner with NGO", "scholarship programme Nigeria"],
  openGraph: {
    title: "Get Involved | ASCEND360",
    description: "Join as a student, volunteer, mentor, or partner — help expand education access across Nigeria.",
    url: "/get-involved",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function GetInvolvedPage() {
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
        <div className="max-w-3xl mx-auto relative z-10" style={{ animation: "rise 0.65s ease-out 0.2s both" }}>
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Take Action</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get Involved</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Whether you&apos;re a student hungry for opportunities, a professional ready to give back,
            or an organisation with resources to share — there&apos;s a place for you here.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,50 L0,25 Q360,50 720,15 Q1080,0 1440,30 L1440,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      <GetInvolvedContent />
    </>
  );
}
