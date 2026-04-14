"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Award, Handshake, Globe, Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import CountUpStat from "@/components/ui/CountUpStat";

type Story = {
  id: string;
  studentName: string;
  storyTitle: string;
  storyContent: string;
  imageUrl: string | null;
  outcome: string | null;
};

type Stat = { end: number; suffix: string; label: string; desc: string; icon: typeof Users };

const stats: Stat[] = [
  { end: 500, suffix: "+", label: "Students Reached",      desc: "Across all 36 states of Nigeria via virtual sessions",           icon: Users },
  { end: 10,  suffix: "+", label: "Scholarships Won",      desc: "Including Mastercard Foundation and other prestigious awards",   icon: Award },
  { end: 5,   suffix: "+", label: "Partner Organizations", desc: "NGOs, universities, and corporates aligned to our mission",      icon: Handshake },
  { end: 3,   suffix: "",  label: "SDGs Targeted",         desc: "Education, poverty reduction, and climate action",               icon: Globe },
];

const defaultStories = [
  { name: "Fatima A.", title: "From Xcel360 to Mastercard Scholar", outcome: "Mastercard Foundation Scholarship", content: "Before joining Xcel360, I had no idea that scholarships like the Mastercard Foundation existed. After attending my first session, everything changed. Today I am studying Computer Science at ALU." },
  { name: "Emeka O.", title: "AI Skills That Opened Global Doors", outcome: "International Internship Secured", content: "The Xcel360 session on AI tools completely transformed how I approach problem-solving. The skills I learned helped me land an internship at a global tech company." },
  { name: "Aisha B.", title: "First in My Family to Study Abroad", outcome: "Chevening Scholarship", content: "No one in my family had ever studied abroad. I didn't know where to start. Xcel360 gave me the roadmap and the confidence to apply — and I got the Chevening Scholarship." },
];

const sdgData = [
  { sdg: "SDG 4", label: "Quality Education",  color: "#C5192D", progress: 65, note: "Xcel360 active · 500+ students reached" },
  { sdg: "SDG 1", label: "No Poverty",         color: "#E5243B", progress: 10, note: "Programme launching 2025" },
  { sdg: "SDG 13", label: "Climate Action",     color: "#3F7E44", progress: 5,  note: "Programme launching 2025" },
];

/* ── sub-components (hooks at top level) ─────────────────────────────────── */

function StatCard({ item, index }: { item: Stat; index: number }) {
  const { ref, inView } = useInView(0.1);
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      <div className="w-14 h-14 bg-[#1F4788]/10 rounded-full flex items-center justify-center mx-auto mb-5">
        <Icon size={26} className="text-[#1F4788]" />
      </div>
      <p className="text-4xl font-extrabold text-[#4CAF50] mb-2 font-display">
        <CountUpStat end={item.end} suffix={item.suffix} duration={2000} />
      </p>
      <p className="font-bold text-[#1F4788] mb-1">{item.label}</p>
      <p className="text-[#666] text-xs leading-relaxed">{item.desc}</p>
    </div>
  );
}

function StoryCard({ story, index }: { story: { id?: string; name?: string; studentName?: string; title?: string; storyTitle?: string; outcome?: string | null; content?: string; storyContent?: string; imageUrl?: string | null }; index: number }) {
  const { ref, inView } = useInView(0.1);
  const name = story.name ?? story.studentName ?? "";
  const title = story.title ?? story.storyTitle ?? "";
  const content = story.content ?? story.storyContent ?? "";
  return (
    <div
      ref={ref}
      className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 150}ms, transform 0.65s ease ${index * 150}ms`,
      }}
    >
      {story.imageUrl ? (
        <div className="relative h-48">
          <Image src={story.imageUrl} alt={name} fill className="object-cover" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-[#1F4788] to-[#4CAF50] flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-extrabold text-3xl">{name.charAt(0)}</span>
          </div>
        </div>
      )}
      <div className="p-6">
        {story.outcome && (
          <span className="inline-block text-xs font-bold bg-[#4CAF50]/10 text-[#4CAF50] px-3 py-1 rounded-full mb-3">
            🏆 {story.outcome}
          </span>
        )}
        <h3 className="font-bold text-[#1F4788] mb-2">{title}</h3>
        <p className="text-[#666] text-sm leading-relaxed line-clamp-4 mb-4">{content}</p>
        <p className="text-xs font-semibold text-[#999]">— {name}</p>
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

function SdgCard({ item, index }: { item: typeof sdgData[number]; index: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${index * 130}ms, transform 0.6s ease ${index * 130}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded text-white text-xs font-bold flex items-center justify-center" style={{ backgroundColor: item.color }}>
          {item.sdg.split(" ")[1]}
        </div>
        <div>
          <p className="font-bold text-[#333] text-sm">{item.sdg}</p>
          <p className="text-[#666] text-xs">{item.label}</p>
        </div>
      </div>
      <div className="w-full bg-[#eee] rounded-full h-2 mb-2">
        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: inView ? `${item.progress}%` : "0%", backgroundColor: item.color }} />
      </div>
      <p className="text-xs text-[#999] mt-2">{item.note}</p>
    </div>
  );
}

export default function ImpactContent({ stories }: { stories: Story[] }) {
  const displayStories = stories.length > 0 ? stories : defaultStories;

  return (
    <>
      {/* Stats */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">By the numbers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4788]">Our Impact at a Glance</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, i) => <StatCard key={item.label} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Testimonials</p>
            <h2 className="text-3xl font-bold text-[#1F4788] mb-2">Student Success Stories</h2>
            <p className="text-[#666]">Real students. Real outcomes. Real change.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayStories.map((s, i) => <StoryCard key={"id" in s ? s.id : s.name} story={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Partner testimonial */}
      <section className="py-20 px-4 bg-white">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <FadeUp className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-12 h-12 bg-[#1F4788]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Quote size={20} className="text-[#1F4788] opacity-60" />
          </div>
          <blockquote className="text-xl md:text-2xl font-semibold text-[#1F4788] italic leading-relaxed mb-6">
            &ldquo;ASCEND360&apos;s Xcel360 programme is filling a critical gap in the Nigerian education ecosystem. The transformation we see in students&apos; confidence and ambition is remarkable.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#4CAF50]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
            <div className="h-px w-16 bg-[#4CAF50]/40" />
          </div>
          <p className="font-bold text-[#1F4788]">Partner Representative</p>
          <p className="text-[#666] text-sm">Education Partner, Nigeria</p>
        </FadeUp>
      </section>

      {/* SDG progress */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1F4788]">Our SDG Progress</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sdgData.map((item, i) => <SdgCard key={item.sdg} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <FadeUp className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1F4788] mb-4">Help Us Grow This Impact</h2>
          <p className="text-[#555] mb-8 leading-relaxed">
            Partner with us, mentor a student, or help fund the next Xcel360 session.
          </p>
          <Link href="/get-involved" className="btn-primary inline-flex items-center gap-2">
            Get Involved <ArrowRight size={18} />
          </Link>
        </FadeUp>
      </section>
    </>
  );
}
