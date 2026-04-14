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
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateShort, estimateReadTime } from "@/lib/utils";

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

const sdgProjects = [
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
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-[#1F4788]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #1F4788 0%, #0d2d5e 50%, #1a3d6e 100%)",
          }}
        />
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 text-[#4CAF50] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            🇳🇬 Registered Nigerian NGO · SDG 4 · SDG 1 · SDG 13
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Empowering Africa&apos;s{" "}
            <span className="text-[#4CAF50]">Next Generation</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            ASCEND360 is a Nigerian NGO committed to education access, poverty
            reduction, and environmental action — turning potential into
            achievement for students across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects/xcel360" className="btn-primary text-base">
              Explore Xcel360
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-secondary text-base">
              Our Mission
            </Link>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-white">
            <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── MISSION SNAPSHOT ── */}
      <section className="py-16 px-4 max-w-5xl mx-auto text-center">
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
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="bg-[#F5F5F5] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-[#1F4788] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-white" />
                </div>
                <p className="text-4xl font-extrabold text-[#1F4788] mb-1">
                  {value}
                </p>
                <p className="text-sm text-[#666] font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT CARDS ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4788] mb-4">
              Our Programs
            </h2>
            <p className="text-[#666] max-w-xl mx-auto">
              Three initiatives. Three SDGs. One mission: unlocking human
              potential across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sdgProjects.map((project) => (
              <div
                key={project.slug}
                className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden group hover:-translate-y-1 transition-transform duration-200"
              >
                {/* SDG Badge */}
                <div
                  className="h-2"
                  style={{ backgroundColor: project.color }}
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      <project.icon
                        size={22}
                        style={{ color: project.color }}
                      />
                    </div>
                    <div className="text-right">
                      <span
                        className="text-xs font-bold"
                        style={{ color: project.color }}
                      >
                        {project.sdg}
                      </span>
                      <p className="text-xs text-[#999]">{project.sdgLabel}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#1F4788] mb-2">
                    {project.name}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {project.status === "ACTIVE" ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-[#4CAF50] font-semibold text-sm hover:underline"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <span className="inline-block text-xs bg-orange-100 text-orange-600 font-semibold px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/projects" className="btn-outline">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── XCEL360 FEATURE SPOTLIGHT ── */}
      <section className="bg-[#1F4788] py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded mb-6 uppercase tracking-wider">
                Flagship Program
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Xcel360: Opening Doors to Global Opportunities
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
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 fill-white" viewBox="0 0 12 12">
                        <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                    <span className="text-blue-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/projects/xcel360" className="btn-primary">
                Join Xcel360 <ArrowRight size={18} />
              </Link>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Students Reached" },
                { value: "2.5hr", label: "Per Session" },
                { value: "10+", label: "Scholarships Won" },
                { value: "Annual", label: "Presentation Day" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur rounded p-6 text-center border border-white/20"
                >
                  <p className="text-3xl font-extrabold text-[#4CAF50] mb-1">
                    {value}
                  </p>
                  <p className="text-blue-200 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST BLOG POSTS ── */}
      {latestPosts.length > 0 && (
        <section className="py-20 px-4 bg-[#F5F5F5]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-[#1F4788]">
                  Latest From Our Blog
                </h2>
                <p className="text-[#666] mt-1">
                  Stories, insights, and opportunities
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex items-center gap-1 text-[#4CAF50] font-semibold hover:underline"
              >
                All Posts <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden hover:-translate-y-1 transition-transform duration-200"
                >
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {!post.featuredImage && (
                    <div className="h-48 bg-gradient-to-br from-[#1F4788] to-[#2d5aab] flex items-center justify-center">
                      <BookOpen size={40} className="text-white/30" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-0.5 rounded">
                        {post.category.name}
                      </span>
                      <span className="text-xs text-[#999]">
                        {estimateReadTime(post.content)} min read
                      </span>
                    </div>
                    <h3 className="font-bold text-[#1F4788] mb-2 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-[#666] text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#999]">
                        {post.publishedAt
                          ? formatDateShort(post.publishedAt)
                          : ""}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-semibold text-[#4CAF50] hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link href="/blog" className="btn-outline">
                All Posts <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER CTA ── */}
      <section className="py-20 px-4 bg-[#4CAF50]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-green-50 mb-8 leading-relaxed">
            Whether you&apos;re a student looking for opportunities, a volunteer
            ready to give back, or an organization wanting to partner — there&apos;s
            a place for you in the ASCEND360 community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded font-bold text-base hover:bg-green-50 transition-colors"
            >
              Get Involved Today <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded font-bold text-base hover:bg-white hover:text-[#4CAF50] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
