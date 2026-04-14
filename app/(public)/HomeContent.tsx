"use client";

import { useRef, useEffect, useState } from "react";
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
  Quote,
  type LucideIcon,
} from "lucide-react";
import CountUpStat from "@/components/ui/CountUpStat";
import { formatDateShort, estimateReadTime } from "@/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────────── */
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

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: Date | null;
  content: string;
  author: { name: string | null } | null;
  category: { name: string; slug: string };
};

/* ── Static data ────────────────────────────────────────────────────────── */
const stats = [
  { end: 500, suffix: "+", label: "Students Reached",      sub: "Across all 36 states via virtual sessions",  icon: Users },
  { end: 10,  suffix: "+", label: "Scholarships Won",      sub: "Including Mastercard Foundation awards",      icon: Award },
  { end: 5,   suffix: "+", label: "Partner Organizations", sub: "NGOs, universities & corporates",             icon: Handshake },
  { end: 3,   suffix: "",  label: "SDGs Targeted",         sub: "Education, poverty & climate action",         icon: Globe },
];

const sdgProjects: SdgProject[] = [
  {
    slug: "xcel360",
    name: "Xcel360",
    description:
      "Our flagship education initiative equipping students with knowledge about global opportunities — scholarships, AI, and career development — through virtual learning sessions.",
    sdg: "SDG 4", sdgLabel: "Quality Education", status: "ACTIVE",
    icon: BookOpen, color: "#4CAF50",
  },
  {
    slug: "poverty-reduction",
    name: "Poverty Reduction Initiative",
    description:
      "Breaking poverty cycles through intentional skill-building, mentorship, and economic empowerment for underserved Nigerian communities.",
    sdg: "SDG 1", sdgLabel: "No Poverty", status: "COMING_SOON",
    icon: TrendingUp, color: "#FF9800",
  },
  {
    slug: "climate-action",
    name: "Climate & Environmental Action",
    description:
      "Building climate literacy and environmental stewardship in Nigerian communities — from schools to local governance.",
    sdg: "SDG 13", sdgLabel: "Climate Action", status: "COMING_SOON",
    icon: Leaf, color: "#00BCD4",
  },
];

/* ── IntersectionObserver hook ──────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── FadeUp wrapper ─────────────────────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Staggered stat card (hooks at top level) ───────────────────────────── */
function StatCard({
  item,
  index,
}: {
  item: (typeof stats)[number];
  index: number;
}) {
  const { ref, inView } = useInView(0.1);
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className="text-center group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      <div className="w-14 h-14 bg-[#1F4788]/8 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1F4788]/14 transition-colors">
        <Icon size={26} className="text-[#1F4788]" />
      </div>
      <p className="text-5xl md:text-6xl font-extrabold text-[#4CAF50] mb-1 font-display leading-none">
        <CountUpStat end={item.end} suffix={item.suffix} duration={2000} />
      </p>
      <div className="w-8 h-0.5 bg-[#4CAF50]/30 mx-auto my-2" />
      <p className="font-bold text-[#1F4788] text-base mb-1">{item.label}</p>
      <p className="text-[#888] text-xs leading-snug">{item.sub}</p>
    </div>
  );
}

/* ── Project card (hooks at top level) ─────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: SdgProject;
  index: number;
}) {
  const { ref, inView } = useInView(0.1);
  const Icon = project.icon;
  return (
    <div
      ref={ref}
      className="card-3d bg-white rounded-xl shadow-[0_4px_20px_rgba(31,71,136,0.10)] overflow-hidden group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s ease ${index * 160}ms, transform 0.65s ease ${index * 160}ms`,
      }}
    >
      {/* colour bar */}
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}99)` }} />

      {/* icon area */}
      <div
        className="relative h-24 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)` }}
      >
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
          style={{ backgroundColor: `${project.color}18`, border: `1px solid ${project.color}30` }}
        >
          <Icon size={28} style={{ color: project.color }} />
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
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-[#4CAF50] font-semibold text-sm group-hover:gap-2.5 transition-all"
          >
            Learn More <ArrowRight size={14} />
          </Link>
        ) : (
          <span className="inline-block text-xs bg-orange-50 text-orange-500 font-semibold px-3 py-1 rounded-full border border-orange-100">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Blog post card (hooks at top level) ────────────────────────────────── */
function BlogCard({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <article
      ref={ref}
      className="card-3d bg-white rounded-xl shadow-[0_4px_16px_rgba(31,71,136,0.08)] overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 150}ms, transform 0.65s ease ${index * 150}ms`,
      }}
    >
      {post.featuredImage ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div
          className="relative h-48 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1F4788 0%, #2d5aab 60%, #1a4d7a 100%)" }}
        >
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
          <span className="text-xs text-[#999]">
            {post.publishedAt ? formatDateShort(post.publishedAt) : ""}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-semibold text-[#4CAF50] hover:underline inline-flex items-center gap-1"
          >
            Read More <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ── Main exported component ────────────────────────────────────────────── */
export default function HomeContent({ latestPosts }: { latestPosts: Post[] }) {
  return (
    <>
      {/* ── MISSION SNAPSHOT ── */}
      <section className="relative py-20 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeUp>
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our Purpose</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F4788] mb-6">
              Why ASCEND360 Exists
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p className="text-lg md:text-xl text-[#444] leading-relaxed max-w-3xl mx-auto mb-4">
              Millions of talented Nigerian students lack access to information about
              scholarships, global opportunities, and career pathways. ASCEND360 was
              founded to close that gap — equipping young people with the knowledge,
              networks, and confidence to excel on the world stage.
            </p>
          </FadeUp>
          <FadeUp delay={220}>
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
          </FadeUp>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="absolute inset-0 bg-dots opacity-60" />
        <div className="orb w-96 h-96 bg-[#4CAF50] top-[-80px] right-[-60px] opacity-[0.05] animate-float-a" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Impact So Far</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4788] mb-3">Numbers That Matter</h2>
            <p className="text-[#666] max-w-md mx-auto">
              Real outcomes, measured — because every number is a life changed.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {stats.map((item, i) => (
              <StatCard key={item.label} item={item} index={i} />
            ))}
          </div>

          <FadeUp delay={500} className="text-center mt-14">
            <Link href="/impact" className="inline-flex items-center gap-2 text-[#4CAF50] font-semibold hover:underline">
              See our full impact story <ChevronRight size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── PROJECT CARDS ── */}
      <section className="relative py-20 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-crosshatch" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">What We Do</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F4788] mb-4">Our Programs</h2>
            <p className="text-[#666] max-w-xl mx-auto">
              Three initiatives. Three SDGs. One mission: unlocking human potential across Nigeria.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sdgProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          <FadeUp delay={400} className="text-center mt-12">
            <Link href="/projects" className="btn-outline">
              View All Projects <ArrowRight size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── TESTIMONIAL / QUOTE — white bg, navy text ── */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="absolute inset-0 bg-dots opacity-60" />
        <div className="orb w-72 h-72 bg-[#1F4788] top-[-40px] left-[-40px] opacity-[0.04] animate-float-b" />
        <div className="orb w-56 h-56 bg-[#4CAF50] bottom-[-30px] right-[-30px] opacity-[0.05] animate-float-a" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeUp>
            {/* Large quote mark */}
            <div className="w-12 h-12 bg-[#1F4788]/8 rounded-full flex items-center justify-center mx-auto mb-6">
              <Quote size={22} className="text-[#1F4788] opacity-60" />
            </div>

            <p className="text-xl md:text-2xl font-semibold text-[#1F4788] italic leading-relaxed mb-6">
              &ldquo;Before Xcel360, I didn&apos;t know scholarships like the Mastercard Foundation existed.
              After one session, everything changed. Today I&apos;m studying Computer Science at ALU —
              fully funded.&rdquo;
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-[#4CAF50]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
              <div className="h-px w-16 bg-[#4CAF50]/40" />
            </div>

            <p className="text-[#4CAF50] font-bold text-base">Fatima A.</p>
            <p className="text-[#666] text-sm">Mastercard Foundation Scholar &mdash; ALU</p>

            <Link
              href="/impact"
              className="inline-flex items-center gap-1.5 mt-6 text-[#1F4788] font-semibold text-sm hover:underline"
            >
              More impact stories <ArrowRight size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── LATEST BLOG POSTS ── */}
      {latestPosts.length > 0 && (
        <section className="relative py-20 px-4 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-circuit opacity-70" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <FadeUp className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-2">Fresh Content</p>
                <h2 className="text-3xl font-bold text-[#1F4788]">Latest From Our Blog</h2>
                <p className="text-[#666] mt-1">Stories, insights, and opportunities</p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-1.5 text-[#4CAF50] font-semibold hover:underline">
                All Posts <ArrowRight size={16} />
              </Link>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link href="/blog" className="btn-outline">All Posts <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER CTA — white bg, navy heading, green button ── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-dots opacity-50" />

        {/* Accent orbs */}
        <div className="orb w-80 h-80 bg-[#1F4788] top-[-60px] right-[-40px] opacity-[0.04] animate-float-a" />
        <div className="orb w-56 h-56 bg-[#4CAF50] bottom-[-30px] left-[-20px] opacity-[0.05] animate-float-b" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-[#1F4788]/8 border border-[#1F4788]/15 text-[#1F4788] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Join the Movement
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4788] mb-4 leading-tight">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-[#555] mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you&apos;re a student looking for opportunities, a volunteer
              ready to give back, or an organization wanting to partner — there&apos;s
              a place for you in the ASCEND360 community.
            </p>
          </FadeUp>
          <FadeUp delay={160}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved" className="btn-primary text-base shadow-lg shadow-green-700/20">
                Get Involved Today <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1F4788] text-[#1F4788] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#1F4788] hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
