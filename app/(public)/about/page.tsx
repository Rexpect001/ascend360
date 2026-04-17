import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ascend360's mission, vision, founding story, and the 9 strategic objectives driving our work across Nigeria.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-white text-center overflow-hidden hero-section"
        style={{ backgroundImage: "url('/images/about-bg.svg')" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(10,28,68,0.80)" }} />
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-80 h-80 bg-[#4CAF50] top-[-80px] right-[-40px] opacity-[0.14] animate-float-a" />
        <div className="orb w-64 h-64 bg-[#2196F3] bottom-[-40px] left-[-30px] opacity-[0.16] animate-float-b" />
        <div className="orb w-40 h-40 bg-white top-[40%] right-[15%] opacity-[0.06] animate-float-c" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            About ascend360
          </h1>
          <p className="text-blue-100 text-xl leading-relaxed max-w-2xl mx-auto">
            A Nigerian NGO founded on the belief that access to information
            changes lives — and that no student should be left behind for lack
            of a mentor.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,50 L0,25 Q360,50 720,15 Q1080,0 1440,30 L1440,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* All animated content */}
      <AboutContent />
    </>
  );
}
