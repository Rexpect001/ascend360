import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "ASCEND360's three initiatives: Xcel360 (education), Poverty Reduction, and Climate Action — each aligned to a UN Sustainable Development Goal.",
  keywords: ["Xcel360", "SDG 4 Nigeria", "Nigerian NGO projects", "climate action Nigeria", "poverty reduction NGO"],
  openGraph: {
    title: "Our Projects | ASCEND360",
    description: "Three SDG-aligned initiatives: Xcel360, Poverty Reduction, and Climate Action.",
    url: "/projects",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-white text-center overflow-hidden hero-section"
        style={{ backgroundImage: "url('/images/programs-bg.svg')" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(8,22,55,0.78)" }} />
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-72 h-72 bg-[#4CAF50] top-[-60px] right-[-40px] opacity-[0.14] animate-float-a" />
        <div className="orb w-56 h-56 bg-[#2196F3] bottom-[-30px] left-[-30px] opacity-[0.16] animate-float-b" />
        <div className="max-w-3xl mx-auto relative z-10" style={{ animation: "rise 0.65s ease-out 0.2s both" }}>
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">What We Do</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Projects</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Three focused initiatives. Three UN Sustainable Development Goals.
            One mission: unlocking human potential across Nigeria.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,50 L0,25 Q360,50 720,15 Q1080,0 1440,30 L1440,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      <ProjectsContent />
    </>
  );
}
