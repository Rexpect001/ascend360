import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, TrendingUp, Leaf, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "ASCEND360's three initiatives: Xcel360 (education), Poverty Reduction, and Climate Action — each aligned to a UN Sustainable Development Goal.",
};

const projects = [
  {
    slug: "xcel360",
    name: "Xcel360",
    tagline: "Connecting Students to Global Opportunities",
    description:
      "Our flagship education initiative equipping Nigerian students with information about international scholarships, AI skills, and career development — delivered via virtual sessions accessible to anyone with a smartphone.",
    longDesc:
      "Since launch, Xcel360 has reached over 500 students and directly facilitated 10+ scholarship wins, including prestigious Mastercard Foundation awards. Sessions run every 2–3 months on Twitter/X Spaces, each lasting 2.5 hours.",
    sdg: "SDG 4",
    sdgFull: "Quality Education",
    sdgColor: "#C5192D",
    status: "ACTIVE",
    stats: ["500+ students", "10+ scholarships", "2.5hr sessions"],
    icon: BookOpen,
    accent: "#4CAF50",
    cta: "Learn About Xcel360",
  },
  {
    slug: "poverty-reduction",
    name: "Poverty Reduction Initiative",
    tagline: "Breaking Poverty Cycles Through Skill & Opportunity",
    description:
      "Addressing the root causes of poverty in Nigerian communities through practical skills training, financial literacy education, and sustainable employment pathways.",
    longDesc:
      "This initiative will combine community workshops, mentorship programmes, and partnerships with employers to create measurable economic uplift in underserved areas.",
    sdg: "SDG 1",
    sdgFull: "No Poverty",
    sdgColor: "#E5243B",
    status: "COMING_SOON",
    stats: [],
    icon: TrendingUp,
    accent: "#FF9800",
    cta: "Get Notified",
  },
  {
    slug: "climate-action",
    name: "Climate & Environmental Action",
    tagline: "Building Climate Stewards in Nigerian Communities",
    description:
      "Cultivating climate literacy and grassroots environmental action — from school curricula to community clean-up campaigns and local policy advocacy.",
    longDesc:
      "The programme will work with schools, local government, and community leaders to embed sustainable practices and climate awareness at every level of Nigerian society.",
    sdg: "SDG 13",
    sdgFull: "Climate Action",
    sdgColor: "#3F7E44",
    status: "COMING_SOON",
    stats: [],
    icon: Leaf,
    accent: "#00BCD4",
    cta: "Get Notified",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1F4788] py-20 px-4 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">
            What We Do
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our Projects
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Three focused initiatives. Three UN Sustainable Development Goals.
            One mission: unlocking human potential across Nigeria.
          </p>
        </div>
      </section>

      {/* SDG connection */}
      <section className="bg-[#F5F5F5] py-10 px-4 border-b border-[#e0e0e0]">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          {projects.map((p) => (
            <div key={p.sdg} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: p.sdgColor }}
              >
                {p.sdg.split(" ")[1]}
              </div>
              <span className="text-[#555]">
                <strong className="text-[#333]">{p.sdg}</strong> ·{" "}
                {p.sdgFull}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Visual panel */}
              <div
                className={`rounded-lg p-10 flex flex-col items-center justify-center text-white min-h-64 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, #1F4788 0%, ${project.accent}88 100%)`,
                }}
              >
                <project.icon size={56} className="text-white/80 mb-4" />
                <div
                  className="text-xs font-bold px-3 py-1 rounded-full mb-2"
                  style={{ backgroundColor: project.accent }}
                >
                  {project.sdg} · {project.sdgFull}
                </div>
                <p className="text-white/70 text-sm text-center">
                  {project.tagline}
                </p>
                {project.stats.length > 0 && (
                  <div className="flex gap-4 mt-6 flex-wrap justify-center">
                    {project.stats.map((s) => (
                      <span
                        key={s}
                        className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1F4788]">
                    {project.name}
                  </h2>
                  {project.status === "COMING_SOON" && (
                    <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-600 font-semibold px-2.5 py-1 rounded-full">
                      <Clock size={11} />
                      Coming Soon
                    </span>
                  )}
                  {project.status === "ACTIVE" && (
                    <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[#444] leading-relaxed mb-4">
                  {project.description}
                </p>
                <p className="text-[#666] text-sm leading-relaxed mb-6">
                  {project.longDesc}
                </p>

                {project.status === "ACTIVE" ? (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn-primary text-sm"
                  >
                    {project.cta} <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link
                    href="/get-involved"
                    className="btn-outline text-sm"
                  >
                    {project.cta} <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1F4788] py-16 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Want to Support Our Work?</h2>
          <p className="text-blue-100 mb-8">
            Partner with us, volunteer your time, or help spread the word.
            Every contribution multiplies impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 bg-[#4CAF50] text-white px-8 py-4 rounded font-bold hover:bg-[#388E3C] transition-colors"
            >
              Get Involved <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded font-bold hover:bg-white hover:text-[#1F4788] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
