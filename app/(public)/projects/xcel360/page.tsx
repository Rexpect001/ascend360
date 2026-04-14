import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Mic,
  Calendar,
  CheckCircle,
  Quote,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateShort, estimateReadTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Xcel360 — Education Initiative",
  description:
    "Xcel360 equips Nigerian students with information about global scholarships, AI skills, and career opportunities through virtual learning sessions on Twitter/X Spaces.",
};

async function getRelatedPosts() {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      content: true,
      category: { select: { name: true, slug: true } },
      author: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
}

const howItWorks = [
  {
    step: "01",
    icon: Mic,
    title: "Virtual Learning Sessions",
    desc: "Live sessions on Twitter/X Spaces, every 2–3 months. Topics cover global scholarships, AI tools, career development, and professional skills — all accessible with just a smartphone.",
  },
  {
    step: "02",
    icon: Calendar,
    title: "Annual Presentation Day",
    desc: "Students showcase projects, ideas, and achievements to a panel of mentors and partners. Winners receive direct scholarship referrals and mentorship opportunities.",
  },
  {
    step: "03",
    icon: Users,
    title: "1-on-1 Mentorship",
    desc: "Top-performing students are matched with industry professionals for ongoing mentorship — covering applications, career planning, and skill development.",
  },
];

const stats = [
  { value: "500+", label: "Students Reached", icon: Users },
  { value: "2.5hrs", label: "Per Session", icon: Mic },
  { value: "10+", label: "Scholarships Won", icon: Award },
  { value: "Annual", label: "Presentation Day", icon: Calendar },
];

const topics = [
  "International Scholarship Discovery & Application",
  "AI Tools for Students (ChatGPT, Perplexity, Gemini)",
  "Writing Winning Personal Statements",
  "LinkedIn & Professional Networking",
  "University Application Strategy",
  "Career Pathways in Tech, Medicine & Law",
  "Mastercard, Chevening & Commonwealth Scholarships",
  "Study Abroad Financing & Visa Guidance",
];

export default async function Xcel360Page() {
  const relatedPosts = await getRelatedPosts();

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-white overflow-hidden hero-section"
        style={{ backgroundImage: "url('/images/programs-bg.svg')" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(8,22,55,0.82)" }} />
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-80 h-80 bg-[#4CAF50] top-[-60px] right-[-40px] opacity-[0.12] animate-float-a" />
        <div className="orb w-60 h-60 bg-[#2196F3] bottom-[-30px] left-[-30px] opacity-[0.14] animate-float-b" />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Flagship Program
              </span>
              <span className="bg-white/10 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
                SDG 4 · Quality Education
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Xcel360
            </h1>
            <p className="text-xl text-blue-100 mb-4 font-medium">
              Connecting Nigerian Students to Global Opportunities
            </p>
            <p className="text-blue-200 leading-relaxed mb-8">
              Through virtual sessions on Twitter/X Spaces, Xcel360 delivers
              life-changing information about scholarships, AI, and career
              development to any student with a smartphone — completely free.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-involved#students" className="btn-primary">
                Join Next Session <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Partner With Us
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-center"
              >
                <Icon size={24} className="text-[#4CAF50] mx-auto mb-3" />
                <p className="text-3xl font-extrabold text-white mb-1">
                  {value}
                </p>
                <p className="text-blue-200 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F4788] mb-6">
            The Problem We&apos;re Solving
          </h2>
          <p className="text-lg text-[#444] leading-relaxed mb-4">
            Millions of talented Nigerian students qualify for world-class
            scholarships and global opportunities — but most have no idea they
            exist. The gap isn&apos;t talent. It&apos;s <strong>information and access</strong>.
          </p>
          <p className="text-[#666] leading-relaxed">
            Traditional mentorship is confined to students at elite schools in
            Lagos and Abuja. Xcel360 breaks that barrier by going digital and
            reaching students in every state — Lagos, Kano, Enugu, Kaduna, and
            beyond.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1F4788] mb-2">
              How Xcel360 Works
            </h2>
            <p className="text-[#666]">
              Three stages, one transformational journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="relative bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 text-center hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {step}
                </div>
                <div className="w-14 h-14 bg-[#1F4788]/10 rounded-full flex items-center justify-center mx-auto mb-5 mt-2">
                  <Icon size={26} className="text-[#1F4788]" />
                </div>
                <h3 className="font-bold text-[#1F4788] mb-3">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics covered */}
      <section className="bg-[#1F4788] py-20 px-4 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What We Cover</h2>
            <p className="text-blue-200">
              Every session is packed with actionable, specific knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((topic: string) => (
              <div
                key={topic}
                className="flex items-start gap-3 bg-white/10 rounded-lg p-4"
              >
                <CheckCircle
                  size={18}
                  className="text-[#4CAF50] flex-shrink-0 mt-0.5"
                />
                <span className="text-blue-100 text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-[#F5F5F5]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 bg-[#4CAF50]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Quote size={20} className="text-[#4CAF50]" />
          </div>
          <blockquote className="text-xl md:text-2xl text-[#333] font-medium leading-relaxed mb-6 italic">
            "Before joining Xcel360, I had no idea that scholarships like the
            Mastercard Foundation existed. After attending my first session, I
            spent three months preparing my application. Today, I am a Mastercard
            Foundation Scholar studying Computer Science at ALU."
          </blockquote>
          <cite className="not-italic">
            <p className="font-bold text-[#1F4788]">Fatima A.</p>
            <p className="text-[#666] text-sm">Mastercard Foundation Scholar · Xcel360 Alumna</p>
          </cite>
        </div>
      </section>

      {/* Related blog posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-[#1F4788]">
                Latest from the Blog
              </h2>
              <Link
                href="/blog"
                className="text-[#4CAF50] font-semibold text-sm hover:underline flex items-center gap-1"
              >
                All Posts <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post: typeof relatedPosts[number]) => (
                <article
                  key={post.id}
                  className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden hover:-translate-y-1 transition-transform duration-200"
                >
                  {post.featuredImage ? (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-[#1F4788] to-[#2d5aab] flex items-center justify-center">
                      <BookOpen size={36} className="text-white/30" />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs font-semibold text-[#4CAF50]">
                      {post.category.name}
                    </span>
                    <h3 className="font-bold text-[#1F4788] mt-1 mb-2 line-clamp-2 text-sm leading-snug">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-[#999]">
                        {estimateReadTime(post.content)} min read
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-semibold text-[#4CAF50] hover:underline"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#4CAF50] py-20 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Next Session?
          </h2>
          <p className="text-green-50 text-lg mb-8">
            Sessions are free and open to all Nigerian students. All you need
            is a Twitter/X account and 2.5 hours of your time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved#students"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded font-bold hover:bg-green-50 transition-colors"
            >
              Register as a Student <ArrowRight size={18} />
            </Link>
            <Link
              href="/get-involved#mentors"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded font-bold hover:bg-white hover:text-[#4CAF50] transition-colors"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
