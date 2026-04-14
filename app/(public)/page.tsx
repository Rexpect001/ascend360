import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Handshake,
  TrendingUp,
  Globe,
  Leaf,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateShort, estimateReadTime } from "@/lib/utils";

type SdgProject = {
  slug: string;
  name: string;
  description: string;
  sdg: string;
  sdgLabel: string;
  status: string;
  icon: LucideIcon;
  color: string;
};

export const dynamic = "force-dynamic";

async function getHomepageData() {
  const [projects, latestPosts, impactStories] = await Promise.all([
    prisma.project.findMany({
      where: { status: { not: "INACTIVE" } },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.blogPost.findMany({
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
    }),
    prisma.impactStory.findMany({
      where: { isPublished: true },
      take: 1,
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  return { projects, latestPosts, impactStories };
}

const stats = [
  { value: "500+", label: "Students Reached", icon: Users },
  { value: "10+", label: "Scholarships Won", icon: Award },
  { value: "5+", label: "Partner Organizations", icon: Handshake },
  { value: "3", label: "SDGs Targeted", icon: Globe },
];

const sdgProjects: SdgProject[] = [
  {
    slug: "xcel360",
    name: "Xcel360",
    description:
      "Our flagship education initiative equipping students with knowledge about global opportunities — scholarships, AI, and career development — through virtual learning sessions.",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    status: "ACTIVE",
    icon: BookOpen,
    color: "#4CAF50",
  },
  {
    slug: "poverty-reduction",
    name: "Poverty Reduction Initiative",
    description:
      "Breaking poverty cycles through intentional skill-building, mentorship, and economic empowerment for underserved Nigerian communities.",
    sdg: "SDG 1",
    sdgLabel: "No Poverty",
    status: "COMING_SOON",
    icon: TrendingUp,
    color: "#FF9800",
  },
  {
    slug: "climate-action",
    name: "Climate & Environmental Action",
    description:
      "Building climate literacy and environmental stewardship in Nigerian communities — from schools to local governance.",
    sdg: "SDG 13",
    sdgLabel: "Climate Action",
    status: "COMING_SOON",
    icon: Leaf,
    color: "#00BCD4",
  },
];

export default async function HomePage() {
  const { latestPosts } = await getHomepageData();

  return (
    <>
      {/* ── HERO ── */}
      {/* Drop /public/images/hero-bg.jpg to enable photo background */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden hero-section">
        {/* Base gradient (shows if no bg image; acts as overlay when image exists) */}
        <div className="absolute inset-0 hero-overlay" style={{ background: "linear-gradient(145deg, rgba(13,45,94,0.92) 0%, rgba(31,71,136,0.85) 45%, rgba(22,58,110,0.92) 100%)" }} />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-dots-white" />

        {/* Floating orbs */}
        <div className="orb w-[420px] h-[420px] bg-[#4CAF50] top-[-100px] right-[-80px] opacity-[0.10] animate-float-a" />
        <div className="orb w-[320px] h-[320px] bg-[#2196F3] bottom-[-60px] left-[-60px] opacity-[0.12] animate-float-b" />
        <div className="orb w-[200px] h-[200px] bg-[#4CAF50] top-[30%] left-[10%] opacity-[0.08] animate-float-c" />
        <div className="orb w-[160px] h-[160px] bg-white bottom-[20%] right-[12%] opacity-[0.05] animate-float-a" style={{ animationDelay: "-4s" }} />

        {/* Spinning accent ring */}
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-spin-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#4CAF50]/10 animate-spin-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "20s" }} />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 shimmer ring-glow text-[#4CAF50] text-sm font-semibold px-5 py-2 rounded-full mb-8 border border-[#4CAF50]/30">
            <span>🇳🇬</span>
            <span>Registered Nigerian NGO · SDG 4 · SDG 1 · SDG 13</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Empowering Africa&apos;s{" "}
            <span className="text-[#4CAF50] relative">
              Next Generation
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" preserveAspectRatio="none">
                <path d="M0,6 Q75,0 150,5 Q225,10 300,4" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
              </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            ASCEND360 is a Nigerian NGO committed to education access, poverty
            reduction, and environmental action — turning potential into
            achievement for students across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects/xcel360" className="btn-primary text-base shadow-lg shadow-green-900/30">
              Explore Xcel360
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-secondary text-base">
              Our Mission
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-14 flex justify-center">
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-px h-8 bg-white" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,80 L0,40 Q180,0 360,35 Q540,70 720,30 Q900,0 1080,38 Q1260,72 1440,28 L1440,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── MISSION SNAPSHOT ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our Purpose</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F4788] mb-6">
            Why ASCEND360 Exists
          </h2>
          <p className="text-lg text-[#555] leading-relaxed max-w-3xl mx-auto mb-4">
            Millions of talented Nigerian students lack access to information about
            scholarships, global opportunities, and career pathways. ASCEND360 was
            founded to close that gap — equipping young people with the knowledge,
            networks, and confidence to excel on the world stage.
          </p>
          <p className="text-[#666] leading-relaxed max-w-2xl mx-auto">
            Through our programs, we don&apos;t just inform — we transform. Every
            session, every mentorship, every scholarship win is a step toward a
            more equitable Africa.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-8 text-[#4CAF50] font-semibold hover:underline"
          >
            Read our full story <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="relative py-20 overflow-hidden">
        {/* Dark gradient background with grid */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d2d5e 0%, #1F4788 100%)" }} />
        <div className="absolute inset-0 bg-grid-white" />

        {/* Decorative orbs */}
        <div className="orb w-64 h-64 bg-[#4CAF50] top-[-40px] right-[10%] opacity-[0.08] animate-float-b" />
        <div className="orb w-48 h-48 bg-white bottom-[-20px] left-[5%] opacity-[0.06] animate-float-c" />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-2">Impact So Far</p>
            <h2 className="text-3xl font-bold text-white">Numbers That Matter</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center bg-white/8 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/12 transition-colors">
                <div className="w-14 h-14 bg-[#4CAF50]/20 border border-[#4CAF50]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#4CAF50]" />
                </div>
                <p className="text-4xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-sm text-blue-200 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,60 L0,30 Q360,60 720,20 Q1080,0 1440,35 L1440,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── PROJECT CARDS ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-crosshatch" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4788] mb-4">
              Our Programs
            </h2>
            <p className="text-[#666] max-w-xl mx-auto">
              Three initiatives. Three SDGs. One mission: unlocking human
              potential across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sdgProjects.map((project: SdgProject) => (
              <div
                key={project.slug}
                className="card-3d bg-white rounded-xl shadow-[0_4px_20px_rgba(31,71,136,0.10)] overflow-hidden group"
              >
                {/* Gradient top bar */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}99)` }} />

                {/* Icon area with pattern */}
                <div className="relative h-24 flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)` }}>
                  <div className="absolute inset-0 bg-dots opacity-40" />
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: `${project.color}18`, border: `1px solid ${project.color}30` }}>
                    <project.icon size={28} style={{ color: project.color }} />
                  </div>
                  <div className="absolute top-3 right-4 text-right">
                    <span className="text-xs font-bold" style={{ color: project.color }}>{project.sdg}</span>
                    <p className="text-xs text-[#999]">{project.sdgLabel}</p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1F4788] mb-2">{project.name}</h3>
                  <p className="text-[#666] text-sm leading-relaxed mb-5">{project.description}</p>

                  {project.status === "ACTIVE" ? (
                    <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-[#4CAF50] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Learn More <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <span className="inline-block text-xs bg-orange-50 text-orange-500 font-semibold px-3 py-1 rounded-full border border-orange-100">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects" className="btn-outline">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── XCEL360 FEATURE SPOTLIGHT ── */}
      <section className="relative bg-[#1F4788] py-20 px-4 text-white overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid-white" />
        <div className="orb w-96 h-96 bg-[#4CAF50] top-[-80px] right-[-60px] opacity-[0.08] animate-float-a" />
        <div className="orb w-72 h-72 bg-[#2196F3] bottom-[-40px] left-[-40px] opacity-[0.10] animate-float-b" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#4CAF50] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider shadow-lg shadow-green-900/30">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-glow" />
                Flagship Program
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Xcel360: Opening Doors to<br className="hidden md:block" /> Global Opportunities
              </h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                Through virtual sessions on Twitter/X Spaces, Xcel360 has
                reached over 500 students across Nigeria with life-changing
                information about scholarships, AI skills, and career
                development.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Virtual learning sessions every 2-3 months",
                  "Annual Presentation Day showcasing student talent",
                  "1-on-1 mentorship with industry professionals",
                  "Direct scholarship and opportunity referrals",
                ].map((item: string) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-green-900/30">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-blue-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/projects/xcel360" className="btn-primary shadow-lg shadow-green-900/30">
                Join Xcel360 <ArrowRight size={18} />
              </Link>
            </div>

            {/* Stats grid with glass effect */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Students Reached", color: "#4CAF50" },
                { value: "2.5hr", label: "Per Session", color: "#64B5F6" },
                { value: "10+", label: "Scholarships Won", color: "#FFB74D" },
                { value: "Annual", label: "Presentation Day", color: "#CE93D8" },
              ].map(({ value, label, color }) => (
                <div
                  key={label}
                  className="relative bg-white/8 backdrop-blur-sm rounded-xl p-6 text-center border border-white/15 overflow-hidden group hover:bg-white/14 transition-colors"
                >
                  <div className="absolute inset-0 bg-dots-white opacity-50" />
                  <p className="relative text-3xl font-extrabold mb-1" style={{ color }}>{value}</p>
                  <p className="relative text-blue-200 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 70" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,70 L0,35 Q360,0 720,40 Q1080,70 1440,20 L1440,70 Z" fill="#F5F5F5" />
          </svg>
        </div>
      </section>

      {/* ── LATEST BLOG POSTS ── */}
      {latestPosts.length > 0 && (
        <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
          <div className="absolute inset-0 bg-circuit opacity-70" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-2">Fresh Content</p>
                <h2 className="text-3xl font-bold text-[#1F4788]">Latest From Our Blog</h2>
                <p className="text-[#666] mt-1">Stories, insights, and opportunities</p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-1.5 text-[#4CAF50] font-semibold hover:underline">
                All Posts <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post: typeof latestPosts[number]) => (
                <article key={post.id} className="card-3d bg-white rounded-xl shadow-[0_4px_16px_rgba(31,71,136,0.08)] overflow-hidden">
                  {post.featuredImage ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="relative h-48 overflow-hidden" style={{ background: "linear-gradient(135deg, #1F4788 0%, #2d5aab 60%, #1a4d7a 100%)" }}>
                      <div className="absolute inset-0 bg-grid-white" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen size={40} className="text-white/20" />
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-0.5 rounded-full">
                        {post.category.name}
                      </span>
                      <span className="text-xs text-[#999]">{estimateReadTime(post.content)} min read</span>
                    </div>
                    <h3 className="font-bold text-[#1F4788] mb-2 line-clamp-2 leading-snug">{post.title}</h3>
                    <p className="text-[#666] text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#999]">{post.publishedAt ? formatDateShort(post.publishedAt) : ""}</span>
                      <Link href={`/blog/${post.slug}`} className="text-xs font-semibold text-[#4CAF50] hover:underline inline-flex items-center gap-1">
                        Read More <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link href="/blog" className="btn-outline">All Posts <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER CTA ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Green gradient with pattern */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #388E3C 0%, #4CAF50 50%, #43A047 100%)" }} />
        <div className="absolute inset-0 bg-dots-white" />

        {/* Orbs */}
        <div className="orb w-80 h-80 bg-white top-[-60px] right-[-40px] opacity-[0.06] animate-float-a" />
        <div className="orb w-56 h-56 bg-white bottom-[-30px] left-[-20px] opacity-[0.08] animate-float-b" />

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Join the Movement
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-green-50 mb-10 leading-relaxed">
            Whether you&apos;re a student looking for opportunities, a volunteer
            ready to give back, or an organization wanting to partner — there&apos;s
            a place for you in the ASCEND360 community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded-lg font-bold text-base hover:bg-green-50 transition-colors shadow-lg shadow-green-900/20"
            >
              Get Involved Today <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
