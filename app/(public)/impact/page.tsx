import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Award, Handshake, Globe, Quote } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See the measurable impact of ASCEND360's programs — 500+ students reached, scholarships won, and communities transformed across Nigeria.",
};

async function getImpactData() {
  return prisma.impactStory.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });
}

const stats = [
  {
    value: "500+",
    label: "Students Reached",
    desc: "Across all 36 states of Nigeria via virtual sessions",
    icon: Users,
  },
  {
    value: "10+",
    label: "Scholarships Won",
    desc: "Including Mastercard Foundation and other prestigious awards",
    icon: Award,
  },
  {
    value: "5+",
    label: "Partner Organizations",
    desc: "NGOs, universities, and corporates aligned to our mission",
    icon: Handshake,
  },
  {
    value: "3",
    label: "SDGs Targeted",
    desc: "Education, poverty reduction, and climate action",
    icon: Globe,
  },
];

const partnerTestimonials = [
  {
    quote:
      "ASCEND360's Xcel360 programme is filling a critical gap in the Nigerian education ecosystem. The quality of students they produce is remarkable.",
    name: "Partner Representative",
    org: "Educational Partner",
  },
];

export default async function ImpactPage() {
  const stories = await getImpactData();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1F4788] py-20 px-4 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">
            Our Impact
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Real Change. Measured Impact.
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Every session, every mentorship, every scholarship win is a data
            point in our story of transformation.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, desc, icon: Icon }) => (
              <div
                key={label}
                className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 text-center hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="w-14 h-14 bg-[#1F4788]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon size={26} className="text-[#1F4788]" />
                </div>
                <p className="text-4xl font-extrabold text-[#4CAF50] mb-2">
                  {value}
                </p>
                <p className="font-bold text-[#1F4788] mb-1">{label}</p>
                <p className="text-[#666] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F4788] mb-2">
              Student Success Stories
            </h2>
            <p className="text-[#666]">
              Real students. Real outcomes. Real change.
            </p>
          </div>

          {stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story: typeof stories[number]) => (
                <div
                  key={story.id}
                  className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden hover:-translate-y-1 transition-transform duration-200"
                >
                  {story.imageUrl ? (
                    <div className="relative h-48">
                      <Image
                        src={story.imageUrl}
                        alt={story.studentName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#1F4788] to-[#4CAF50] flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-white font-extrabold text-3xl">
                          {story.studentName.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    {story.outcome && (
                      <span className="inline-block text-xs font-bold bg-[#4CAF50]/10 text-[#4CAF50] px-3 py-1 rounded-full mb-3">
                        🏆 {story.outcome}
                      </span>
                    )}
                    <h3 className="font-bold text-[#1F4788] mb-2">
                      {story.storyTitle}
                    </h3>
                    <p className="text-[#666] text-sm leading-relaxed line-clamp-4 mb-4">
                      {story.storyContent}
                    </p>
                    <p className="text-xs font-semibold text-[#999]">
                      — {story.studentName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Default story when DB is empty */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Fatima A.",
                  title: "From Xcel360 to Mastercard Scholar",
                  outcome: "Mastercard Foundation Scholarship",
                  content:
                    "Before joining Xcel360, I had no idea that scholarships like the Mastercard Foundation existed. After attending my first session, everything changed. Today I am studying Computer Science at ALU.",
                },
                {
                  name: "Emeka O.",
                  title: "AI Skills That Opened Global Doors",
                  outcome: "International Internship Secured",
                  content:
                    "The Xcel360 session on AI tools completely transformed how I approach problem-solving. The skills I learned helped me land an internship at a global tech company.",
                },
                {
                  name: "Aisha B.",
                  title: "First in My Family to Study Abroad",
                  outcome: "Chevening Scholarship",
                  content:
                    "No one in my family had ever studied abroad. I didn't know where to start. Xcel360 gave me the roadmap and the confidence to apply — and I got the Chevening Scholarship.",
                },
              ].map((story: { name: string; title: string; outcome: string; content: string }) => (
                <div
                  key={story.name}
                  className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-[#1F4788] to-[#4CAF50] flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-extrabold text-3xl">
                        {story.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs font-bold bg-[#4CAF50]/10 text-[#4CAF50] px-3 py-1 rounded-full mb-3">
                      🏆 {story.outcome}
                    </span>
                    <h3 className="font-bold text-[#1F4788] mb-2">
                      {story.title}
                    </h3>
                    <p className="text-[#666] text-sm leading-relaxed mb-4">
                      {story.content}
                    </p>
                    <p className="text-xs font-semibold text-[#999]">
                      — {story.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partner testimonial */}
      <section className="py-20 px-4 bg-[#1F4788] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 bg-[#4CAF50]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Quote size={20} className="text-[#4CAF50]" />
          </div>
          <blockquote className="text-xl text-blue-100 italic leading-relaxed mb-6">
            "ASCEND360&apos;s Xcel360 programme is filling a critical gap in the
            Nigerian education ecosystem. The quality of students they produce
            — and the transformation we see in their confidence and ambition —
            is remarkable."
          </blockquote>
          <cite className="not-italic">
            <p className="font-bold text-white">Partner Representative</p>
            <p className="text-blue-300 text-sm">Education Partner, Nigeria</p>
          </cite>
        </div>
      </section>

      {/* SDG progress */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1F4788] text-center mb-10">
            Our SDG Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                sdg: "SDG 4",
                label: "Quality Education",
                color: "#C5192D",
                progress: 65,
                note: "Xcel360 active · 500+ students reached",
              },
              {
                sdg: "SDG 1",
                label: "No Poverty",
                color: "#E5243B",
                progress: 10,
                note: "Programme launching 2025",
              },
              {
                sdg: "SDG 13",
                label: "Climate Action",
                color: "#3F7E44",
                progress: 5,
                note: "Programme launching 2025",
              },
            ].map(({ sdg, label, color, progress, note }) => (
              <div
                key={sdg}
                className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded text-white text-xs font-bold flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    {sdg.split(" ")[1]}
                  </div>
                  <div>
                    <p className="font-bold text-[#333] text-sm">{sdg}</p>
                    <p className="text-[#666] text-xs">{label}</p>
                  </div>
                </div>
                <div className="w-full bg-[#eee] rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%`, backgroundColor: color }}
                  />
                </div>
                <p className="text-xs text-[#999] mt-2">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#4CAF50] py-16 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Help Us Grow This Impact</h2>
          <p className="text-green-50 mb-8">
            Partner with us, mentor a student, or help fund the next Xcel360
            session.
          </p>
          <Link
            href="/get-involved"
            className="inline-flex items-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded font-bold hover:bg-green-50 transition-colors"
          >
            Get Involved <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
