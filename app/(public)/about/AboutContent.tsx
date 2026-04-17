"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Eye, Target, Heart, ArrowRight, Users, Globe,
  BookOpen, TrendingUp, Leaf, Building2, BarChart3,
  Shield, FlaskConical, type LucideIcon,
} from "lucide-react";
import CountUpStat from "@/components/ui/CountUpStat";

// ── IntersectionObserver hook ─────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Reusable fade-up wrapper (hook at top level ✓)
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ── Static data ───────────────────────────────────────────────────────────────
type MvvItem = { icon: LucideIcon; title: string; content: string; color: string; from: string };
const mvv: MvvItem[] = [
  {
    icon: Target, title: "Mission", color: "#4CAF50", from: "-translate-x-12",
    content: "To empower underserved Nigerian communities through accessible education, economic opportunity, and environmental stewardship — equipping individuals with the knowledge, skills, and networks to thrive on a global stage.",
  },
  {
    icon: Eye, title: "Vision", color: "#1F4788", from: "translate-y-12",
    content: "A Nigeria where every young person — regardless of geography, gender, or background — has equal access to the information and mentorship needed to achieve their fullest potential.",
  },
  {
    icon: Heart, title: "Values", color: "#FF9800", from: "translate-x-12",
    content: "Integrity · Equity · Excellence · Community · Innovation. Lasting change is built on trust, driven by data, and sustained by people who care deeply about the next generation.",
  },
];

const problemStats = [
  { end: 200, suffix: "M+", label: "Population", sub: "Over 50% under age 25" },
  { end: 14, suffix: "%", label: "Tertiary Enrollment", sub: "One of the lowest globally" },
  { end: 10, suffix: "M+", label: "Out-of-School Children", sub: "Largest number in the world" },
  { end: 5, suffix: "%", label: "Scholarship Awareness", sub: "Of eligible students know about international opportunities" },
];

const timelineEvents = [
  { year: "2022", quarter: "Q1", title: "ascend360 Founded", desc: "Johnson Alabi, Seun, and Akindoyin come together around a shared conviction: information access is the missing link for Nigerian students.", color: "#4CAF50" },
  { year: "2022", quarter: "Q2", title: "First Xcel360 Session", desc: "Xcel360 launches on Twitter/X Spaces. Over 80 students attend the inaugural session — beyond all expectations.", color: "#2196F3" },
  { year: "2022", quarter: "Q4", title: "Scholarship Referrals Begin", desc: "First direct scholarship referrals made. Students begin applying to Mastercard Foundation, Chevening, and other programmes with ascend360 guidance.", color: "#FF9800" },
  { year: "2023", quarter: "Q2", title: "300+ Students Reached", desc: "First Mastercard Foundation scholars produced. Word spreads through social media — attendance doubles each session.", color: "#9C27B0" },
  { year: "2024", quarter: "Q1", title: "Formally Registered NGO", desc: "ascend360 receives official registration. Launches Annual Presentation Day — a flagship showcase of student talent and achievement.", color: "#E91E63" },
  { year: "2024", quarter: "Q3", title: "500+ Students · 10+ Scholarships", desc: "Half a thousand students reached across all 36 Nigerian states. Ten-plus scholarships won. The model is proven.", color: "#4CAF50" },
  { year: "2025", quarter: "Now", title: "Three SDG Programs", desc: "ascend360 expands its mandate: SDG 4 (Education), SDG 1 (Poverty Reduction), and SDG 13 (Climate Action) — all in active development.", color: "#1F4788" },
];

type Founder = { name: string; title: string; bio: string; initials: string; color: string };
const founders: Founder[] = [
  { name: "Johnson Alabi", title: "President & Co-Founder", initials: "JA", color: "#1F4788", bio: "The visionary force behind ascend360. After witnessing first-hand how information transforms lives, Johnson founded the organisation with one mission: ensure no Nigerian student is left behind for lack of a mentor. Under his leadership, Xcel360 has reached 500+ students across all 36 states." },
  { name: "Seun", title: "Co-Founder & Director of Programs", initials: "S", color: "#4CAF50", bio: "The architect of ascend360's programmes. Seun ensures every initiative is grounded in real student needs — designing experiences that are practical, accessible, and transformative. Deep expertise in community development and social programme management." },
  { name: "Akindoyin", title: "Co-Founder & Director of Partnerships", initials: "A", color: "#FF9800", bio: "The bridge-builder. Akindoyin manages ascend360's strategic partnerships with corporations, international organisations, and academic institutions — creating the scholarship pathways and funding relationships that sustain the mission." },
];

type Objective = { number: string; title: string; desc: string; icon: LucideIcon; color: string; bg: string };
const objectives: Objective[] = [
  { number: "01", title: "Education Access", desc: "Equip students with information about global scholarships, AI tools, and career pathways.", icon: BookOpen, color: "#4CAF50", bg: "#f0faf0" },
  { number: "02", title: "Mentorship Networks", desc: "Connect students with experienced professionals for 1-on-1 mentorship and career guidance.", icon: Users, color: "#4CAF50", bg: "#f0faf0" },
  { number: "03", title: "Scholarship Facilitation", desc: "Directly assist students in identifying, applying for, and winning international scholarships.", icon: Globe, color: "#4CAF50", bg: "#f0faf0" },
  { number: "04", title: "Skills Development", desc: "Deliver practical workshops on digital literacy, AI, entrepreneurship, and professional skills.", icon: FlaskConical, color: "#2196F3", bg: "#f0f6ff" },
  { number: "05", title: "Poverty Reduction", desc: "Design programmes addressing root causes of poverty through education and employment readiness.", icon: TrendingUp, color: "#FF9800", bg: "#fff8f0" },
  { number: "06", title: "Environmental Stewardship", desc: "Build climate awareness and grassroots environmental action in schools and communities.", icon: Leaf, color: "#00BCD4", bg: "#f0fbff" },
  { number: "07", title: "Community Partnerships", desc: "Forge partnerships with schools, corporations, and international organisations to amplify impact.", icon: Building2, color: "#9C27B0", bg: "#faf0ff" },
  { number: "08", title: "Research & Advocacy", desc: "Publish data-driven reports on educational equity in Nigeria to inform policy and corporate action.", icon: BarChart3, color: "#9C27B0", bg: "#faf0ff" },
  { number: "09", title: "Sustainable Operations", desc: "Build a financially sustainable NGO model through diversified funding, ethical fundraising, and governance.", icon: Shield, color: "#1F4788", bg: "#f0f4ff" },
];

const sdgs = [
  { sdg: "SDG 4", label: "Quality Education", color: "#C5192D", progress: 65, note: "Active — Xcel360 programme running" },
  { sdg: "SDG 1", label: "No Poverty", color: "#E5243B", progress: 15, note: "Launching 2025" },
  { sdg: "SDG 13", label: "Climate Action", color: "#3F7E44", progress: 10, note: "Launching 2025" },
];

// ── Sub-components (hooks at top level) ───────────────────────────────────────
function MVVCard({ item, index }: { item: MvvItem; index: number }) {
  const { ref, inView } = useInView(0.15);
  const { icon: Icon, title, content, color, from } = item;
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-[0_4px_24px_rgba(31,71,136,0.10)] p-8 border-t-4 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(31,71,136,0.16)] ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${from}`
      }`}
      style={{ borderColor: color, transitionDelay: `${index * 120}ms` }}
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}18` }}>
        <Icon size={30} style={{ color }} />
      </div>
      <h3 className="text-2xl font-bold text-[#1F4788] mb-4">{title}</h3>
      <p className="text-[#555] leading-relaxed">{content}</p>
    </div>
  );
}

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-[0_4px_24px_rgba(31,71,136,0.10)] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(31,71,136,0.18)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="h-2" style={{ background: `linear-gradient(90deg, ${founder.color}, ${founder.color}88)` }} />
      <div className="pt-8 pb-6 px-8 flex flex-col items-center text-center">
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: founder.color, animationDuration: "3s", animationDelay: `${index * 0.8}s` }} />
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${founder.color}, ${founder.color}cc)` }}>
            <span className="text-white font-extrabold text-2xl font-display">{founder.initials}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#1F4788] mb-1">{founder.name}</h3>
        <p className="text-sm font-semibold mb-4" style={{ color: founder.color }}>{founder.title}</p>
        <p className="text-[#666] text-sm leading-relaxed">{founder.bio}</p>
      </div>
    </div>
  );
}

function ObjectiveCard({ obj, index }: { obj: Objective; index: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`relative rounded-2xl p-6 border border-transparent hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-700 hover:-translate-y-1 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        backgroundColor: obj.bg,
        transitionDelay: `${Math.floor(index / 3) * 100 + (index % 3) * 80}ms`,
      }}
    >
      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full" style={{ backgroundColor: obj.color }} />
      <div className="flex items-start gap-4 pl-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${obj.color}20` }}>
          <obj.icon size={20} style={{ color: obj.color }} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-extrabold font-display leading-none" style={{ color: `${obj.color}55` }}>{obj.number}</span>
            <h4 className="font-bold text-[#1F4788] text-base">{obj.title}</h4>
          </div>
          <p className="text-[#666] text-sm leading-relaxed">{obj.desc}</p>
        </div>
      </div>
    </div>
  );
}

function SDGBar({ sdg, label, color, progress, note }: typeof sdgs[number]) {
  const { ref, inView } = useInView(0.3);
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-xl text-white text-xs font-black flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: color }}>
          {sdg.split(" ")[1]}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5">
            <p className="font-bold text-[#1F4788]">{sdg} · {label}</p>
            <span className="text-sm font-semibold" style={{ color }}>{progress}%</span>
          </div>
          <div className="w-full bg-[#eee] rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-[1400ms] ease-out"
              style={{ width: inView ? `${progress}%` : "0%", backgroundColor: color, transitionDelay: "300ms" }}
            />
          </div>
          <p className="text-xs text-[#999] mt-1.5">{note}</p>
        </div>
      </div>
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────
function Timeline() {
  const { ref, inView } = useInView(0.05);
  return (
    <div ref={ref} className="relative max-w-3xl mx-auto">
      {/* Animated vertical line */}
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[#e8edf5]">
        <div
          className="w-full bg-gradient-to-b from-[#4CAF50] via-[#1F4788] to-[#4CAF50] transition-all duration-[2500ms] ease-in-out origin-top"
          style={{ height: inView ? "100%" : "0%" }}
        />
      </div>

      <div className="space-y-12 md:space-y-16">
        {timelineEvents.map((ev, i) => {
          const isRight = i % 2 === 0;
          return (
            <div key={ev.title} className={`relative flex gap-6 md:gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}>
              {/* Content */}
              <div
                className={`flex-1 transition-all duration-700 ease-out pl-10 md:pl-0 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${isRight ? "md:pr-12 text-left" : "md:pl-12 text-left md:text-right"}`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: ev.color }}>
                  {ev.quarter} {ev.year}
                </span>
                <h4 className="font-bold text-[#1F4788] text-lg mb-1">{ev.title}</h4>
                <p className="text-[#666] text-sm leading-relaxed">{ev.desc}</p>
              </div>

              {/* Centre dot */}
              <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 flex items-start pt-1.5">
                <div
                  className={`w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-500 ${inView ? "scale-100" : "scale-0"}`}
                  style={{ backgroundColor: ev.color, transitionDelay: `${400 + i * 150}ms` }}
                />
              </div>

              {/* Spacer */}
              <div className="hidden md:block flex-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export default function AboutContent() {
  return (
    <>
      {/* ── MISSION / VISION / VALUES ── */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">What Drives Us</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F4788]">Our Guiding Principles</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mvv.map((item, i) => <MVVCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHY NIGERIA NEEDS ascend360 ── */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #0d2d5e 0%, #1F4788 100%)" }}>
        <div className="absolute inset-0 bg-grid-white" />
        <div className="orb w-96 h-96 bg-[#4CAF50] top-[-80px] right-[-60px] opacity-[0.08] animate-float-a" />
        <div className="orb w-72 h-72 bg-white bottom-[-40px] left-[-40px] opacity-[0.05] animate-float-b" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">The Problem We Solve</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Nigeria Needs ascend360</h2>
            <p className="text-blue-200 max-w-2xl mx-auto text-lg">
              The talent exists. The opportunities exist. The gap is information and access — and that is exactly what we bridge.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {problemStats.map(({ end, suffix, label, sub }, i) => (
              <FadeUp key={label} delay={i * 120} className="text-center">
                <p className="text-5xl md:text-6xl font-extrabold text-[#4CAF50] mb-2 font-display leading-none">
                  <CountUpStat end={end} suffix={suffix} duration={2000} />
                </p>
                <p className="font-bold text-white text-sm mb-1">{label}</p>
                <p className="text-blue-300 text-xs leading-snug">{sub}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={200} className="bg-white/8 border border-white/15 rounded-2xl p-8 max-w-3xl mx-auto text-center backdrop-blur-sm">
            <p className="text-blue-100 text-lg leading-relaxed italic">
              &ldquo;When a student in Lagos wins a scholarship to study abroad, they don&apos;t just change their own life — they return with skills, networks, and ambition that transform their community. That is the ripple effect ascend360 is building.&rdquo;
            </p>
            <p className="text-[#4CAF50] font-bold mt-4">— Johnson Alabi, President &amp; Co-Founder</p>
          </FadeUp>
        </div>
      </section>

      {/* ── STORY TIMELINE ── */}
      <section className="py-24 px-4 bg-[#F8FAFF]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our Journey</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F4788] mb-3">How We Got Here</h2>
            <p className="text-[#666] max-w-xl mx-auto">From a single Twitter Space to a nationally registered NGO — the ascend360 story.</p>
          </FadeUp>
          <Timeline />
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">The People</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F4788] mb-3">Meet the Founders</h2>
            <p className="text-[#666] max-w-xl mx-auto">Three passionate Nigerians united by a belief in the power of education.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((f, i) => <FounderCard key={f.name} founder={f} index={i} />)}
          </div>
          <FadeUp delay={300} className="text-center mt-10">
            <Link href="/team" className="btn-outline">Meet the Full Team <ArrowRight size={16} /></Link>
          </FadeUp>
        </div>
      </section>

      {/* ── 9 STRATEGIC OBJECTIVES ── */}
      <section className="py-24 px-4 bg-[#F8FAFF]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our Blueprint</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F4788] mb-3">9 Strategic Objectives</h2>
            <p className="text-[#666] max-w-xl mx-auto">The pillars that guide everything we do — from programme design to governance.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {objectives.map((obj, i) => <ObjectiveCard key={obj.number} obj={obj} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SDG ALIGNMENT ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Global Framework</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F4788] mb-3">UN SDG Alignment</h2>
            <p className="text-[#666] max-w-xl mx-auto">
              Our work is mapped to three of the UN&apos;s 17 Sustainable Development Goals — giving every programme a global context and measurable benchmark.
            </p>
          </FadeUp>
          <div className="space-y-6 max-w-2xl mx-auto">
            {sdgs.map((s) => <SDGBar key={s.sdg} {...s} />)}
          </div>
          <FadeUp delay={400} className="mt-14 bg-[#F0F4FF] rounded-2xl p-8 text-center">
            <p className="text-[#555] leading-relaxed mb-3">
              Our SDG commitments aren&apos;t labels — they&apos;re built into every programme design, every impact metric, and every partnership we form.
            </p>
            <Link href="/impact" className="inline-flex items-center gap-2 text-[#1F4788] font-bold hover:underline">
              View our full impact data <ArrowRight size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)" }}>
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-80 h-80 bg-white top-[-60px] right-[-40px] opacity-[0.06] animate-float-a" />
        <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-green-50 text-lg mb-8">Every student reached is a future changed. Be part of it.</p>
            <Link href="/get-involved" className="inline-flex items-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded-xl font-bold text-base hover:bg-green-50 transition-colors shadow-lg shadow-green-900/20">
              Get Involved <ArrowRight size={18} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
