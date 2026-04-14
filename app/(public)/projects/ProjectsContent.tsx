"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, TrendingUp, Leaf, Clock, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type Project = {
  slug: string; name: string; tagline: string; description: string; longDesc: string;
  sdg: string; sdgFull: string; sdgColor: string; status: string; stats: string[];
  icon: LucideIcon; accent: string; cta: string;
};

export const projects: Project[] = [
  { slug: "xcel360", name: "Xcel360", tagline: "Connecting Students to Global Opportunities", description: "Our flagship education initiative equipping Nigerian students with information about international scholarships, AI skills, and career development — delivered via virtual sessions accessible to anyone with a smartphone.", longDesc: "Since launch, Xcel360 has reached over 500 students and directly facilitated 10+ scholarship wins, including prestigious Mastercard Foundation awards. Sessions run every 2–3 months on Twitter/X Spaces, each lasting 2.5 hours.", sdg: "SDG 4", sdgFull: "Quality Education", sdgColor: "#C5192D", status: "ACTIVE", stats: ["500+ students", "10+ scholarships", "2.5hr sessions"], icon: BookOpen, accent: "#4CAF50", cta: "Learn About Xcel360" },
  { slug: "poverty-reduction", name: "Poverty Reduction Initiative", tagline: "Breaking Poverty Cycles Through Skill & Opportunity", description: "Addressing the root causes of poverty in Nigerian communities through practical skills training, financial literacy education, and sustainable employment pathways.", longDesc: "This initiative will combine community workshops, mentorship programmes, and partnerships with employers to create measurable economic uplift in underserved areas.", sdg: "SDG 1", sdgFull: "No Poverty", sdgColor: "#E5243B", status: "COMING_SOON", stats: [], icon: TrendingUp, accent: "#FF9800", cta: "Get Notified" },
  { slug: "climate-action", name: "Climate & Environmental Action", tagline: "Building Climate Stewards in Nigerian Communities", description: "Cultivating climate literacy and grassroots environmental action — from school curricula to community clean-up campaigns and local policy advocacy.", longDesc: "The programme will work with schools, local government, and community leaders to embed sustainable practices and climate awareness at every level of Nigerian society.", sdg: "SDG 13", sdgFull: "Climate Action", sdgColor: "#3F7E44", status: "COMING_SOON", stats: [], icon: Leaf, accent: "#00BCD4", cta: "Get Notified" },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView(0.08);
  const reversed = index % 2 === 1;
  const Icon = project.icon;
  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
    >
      {/* Visual panel */}
      <div
        className={`rounded-xl p-10 flex flex-col items-center justify-center text-white min-h-64 ${reversed ? "lg:order-2" : ""}`}
        style={{ background: `linear-gradient(135deg, #1F4788 0%, ${project.accent}88 100%)` }}
      >
        <Icon size={56} className="text-white/80 mb-4" />
        <div className="text-xs font-bold px-3 py-1 rounded-full mb-2" style={{ backgroundColor: project.accent }}>
          {project.sdg} · {project.sdgFull}
        </div>
        <p className="text-white/70 text-sm text-center">{project.tagline}</p>
        {project.stats.length > 0 && (
          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            {project.stats.map((s) => (
              <span key={s} className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={reversed ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F4788]">{project.name}</h2>
          {project.status === "COMING_SOON" ? (
            <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-600 font-semibold px-2.5 py-1 rounded-full"><Clock size={11} /> Coming Soon</span>
          ) : (
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Active</span>
          )}
        </div>
        <p className="text-[#444] leading-relaxed mb-4">{project.description}</p>
        <p className="text-[#666] text-sm leading-relaxed mb-6">{project.longDesc}</p>
        {project.status === "ACTIVE" ? (
          <Link href={`/projects/${project.slug}`} className="btn-primary text-sm">{project.cta} <ArrowRight size={16} /></Link>
        ) : (
          <Link href="/get-involved" className="btn-outline text-sm">{project.cta} <ArrowRight size={16} /></Link>
        )}
      </div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function ProjectsContent() {
  return (
    <>
      {/* SDG badges */}
      <section className="bg-[#F5F5F5] py-10 px-4 border-b border-[#e0e0e0]">
        <FadeUp className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          {projects.map((p) => (
            <div key={p.sdg} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: p.sdgColor }}>
                {p.sdg.split(" ")[1]}
              </div>
              <span className="text-[#555]"><strong className="text-[#333]">{p.sdg}</strong> · {p.sdgFull}</span>
            </div>
          ))}
        </FadeUp>
      </section>

      {/* Projects */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-20">
          {projects.map((project, i) => <ProjectRow key={project.slug} project={project} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <FadeUp className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1F4788] mb-4">Want to Support Our Work?</h2>
          <p className="text-[#555] mb-8 leading-relaxed">Partner with us, volunteer your time, or help spread the word. Every contribution multiplies impact.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved" className="btn-primary">Get Involved <ArrowRight size={18} /></Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-[#1F4788] text-[#1F4788] px-8 py-4 rounded font-bold hover:bg-[#1F4788] hover:text-white transition-colors">Contact Us</Link>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
