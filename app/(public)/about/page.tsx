import type { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  Target,
  Heart,
  CheckCircle,
  ArrowRight,
  Users,
  Globe,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

type MvvItem = { icon: LucideIcon; title: string; content: string };
type Objective = { number: string; title: string; desc: string };
type Founder = { name: string; title: string; bio: string; initials: string };

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ASCEND360's mission, vision, founding story, and the 9 strategic objectives driving our work across Nigeria.",
};

const mvv: MvvItem[] = [
  {
    icon: Target,
    title: "Mission",
    content:
      "To empower underserved Nigerian communities through accessible education, economic opportunity, and environmental stewardship — equipping individuals with the knowledge, skills, and networks to thrive on a global stage.",
  },
  {
    icon: Eye,
    title: "Vision",
    content:
      "A Nigeria where every young person — regardless of geography, gender, or background — has equal access to the information and mentorship needed to achieve their fullest potential.",
  },
  {
    icon: Heart,
    title: "Values",
    content:
      "Integrity · Equity · Excellence · Community · Innovation. We believe lasting change is built on trust, driven by data, and sustained by people who care deeply about the next generation.",
  },
];

const objectives: Objective[] = [
  {
    number: "01",
    title: "Education Access",
    desc: "Equip students across Nigeria with information about global scholarships, AI tools, and career pathways.",
  },
  {
    number: "02",
    title: "Mentorship Networks",
    desc: "Connect students with experienced professionals for 1-on-1 mentorship and career guidance.",
  },
  {
    number: "03",
    title: "Scholarship Facilitation",
    desc: "Directly assist students in identifying, applying for, and winning international scholarships.",
  },
  {
    number: "04",
    title: "Skills Development",
    desc: "Deliver practical workshops on digital literacy, AI, entrepreneurship, and professional skills.",
  },
  {
    number: "05",
    title: "Poverty Reduction",
    desc: "Design programs that address root causes of poverty through education and sustainable employment readiness.",
  },
  {
    number: "06",
    title: "Environmental Stewardship",
    desc: "Build climate awareness and grassroots environmental action in schools and communities.",
  },
  {
    number: "07",
    title: "Community Partnerships",
    desc: "Forge meaningful partnerships with schools, corporations, and international organizations to amplify impact.",
  },
  {
    number: "08",
    title: "Research & Advocacy",
    desc: "Publish data-driven reports on educational equity in Nigeria to inform policy and corporate action.",
  },
  {
    number: "09",
    title: "Sustainable Operations",
    desc: "Build a financially sustainable NGO model through diversified funding, ethical fundraising, and strong governance.",
  },
];

const founders: Founder[] = [
  {
    name: "Johnson Alabi",
    title: "President & Co-Founder",
    bio: "Johnson is the visionary force behind ASCEND360. A passionate advocate for educational equity, he founded the organization after witnessing first-hand how access to information transforms lives. Under his leadership, Xcel360 has reached over 500 students across Nigeria.",
    initials: "JA",
  },
  {
    name: "Seun",
    title: "Co-Founder & Director of Programs",
    bio: "Seun leads program design and implementation at ASCEND360. With deep expertise in community development, Seun ensures every initiative is grounded in the real needs of students and communities across Nigeria.",
    initials: "S",
  },
  {
    name: "Akindoyin",
    title: "Co-Founder & Director of Partnerships",
    bio: "Akindoyin builds and manages ASCEND360's strategic partnerships with corporations, international organizations, and academic institutions. Their network has been pivotal in creating scholarship pathways for Xcel360 students.",
    initials: "A",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1F4788] py-24 px-4 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-80 h-80 bg-[#4CAF50] top-[-80px] right-[-40px] opacity-[0.09] animate-float-a" />
        <div className="orb w-64 h-64 bg-[#2196F3] bottom-[-40px] left-[-30px] opacity-[0.10] animate-float-b" />
        <div className="orb w-40 h-40 bg-white top-[40%] right-[15%] opacity-[0.04] animate-float-c" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About ASCEND360</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            A Nigerian NGO founded on the belief that access to information
            changes lives — and that no student should be left behind for lack of
            a mentor.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,50 L0,25 Q360,50 720,15 Q1080,0 1440,30 L1440,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F4788]">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mvv.map(({ icon: Icon, title, content }) => (
              <div
                key={title}
                className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 text-center hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="w-14 h-14 bg-[#1F4788]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-[#1F4788]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F4788] mb-3">
                  {title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1F4788] mb-2">
              How We Started
            </h2>
            <div className="w-16 h-1 bg-[#4CAF50] mx-auto" />
          </div>
          <div className="prose max-w-none text-[#444]">
            <p className="text-lg leading-relaxed mb-6">
              ASCEND360 was born from a simple, urgent observation: millions of
              talented Nigerian students have the intelligence, ambition, and
              drive to compete for global opportunities — but they lack access to
              the <em>information</em> and <em>networks</em> that make those
              opportunities possible.
            </p>
            <p className="leading-relaxed mb-6">
              Our founders — Johnson, Seun, and Akindoyin — experienced this
              gap personally and decided to do something about it. In 2022, they
              launched Xcel360, a virtual learning initiative delivered through
              Twitter/X Spaces, making high-quality mentorship and opportunity
              information accessible to any student with a smartphone.
            </p>
            <p className="leading-relaxed mb-6">
              What started as a single session quickly grew into a movement.
              Students who attended Xcel360 sessions went on to win Mastercard
              Scholarships, gain admission to leading universities, and land
              internships at global organizations. Word spread fast.
            </p>
            <p className="leading-relaxed">
              Today, ASCEND360 is a formally registered NGO pursuing three
              interconnected missions: education access (SDG 4), poverty
              reduction (SDG 1), and climate action (SDG 13). We believe that
              when you invest in the knowledge of a young person, you invest in
              the future of an entire community.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F4788] mb-2">
              Meet the Founders
            </h2>
            <p className="text-[#666]">
              Three passionate Nigerians united by a belief in the power of
              education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder: Founder) => (
              <div
                key={founder.name}
                className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 text-center hover:-translate-y-1 transition-transform duration-200"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-[#1F4788] flex items-center justify-center mx-auto mb-5">
                  <span className="text-white font-bold text-2xl">
                    {founder.initials}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1F4788]">
                  {founder.name}
                </h3>
                <p className="text-[#4CAF50] text-sm font-semibold mb-3">
                  {founder.title}
                </p>
                <p className="text-[#666] text-sm leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/team" className="btn-outline">
              Full Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9 Strategic Objectives */}
      <section className="bg-[#1F4788] py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Our 9 Strategic Objectives
            </h2>
            <p className="text-blue-200">
              The pillars that guide everything we do at ASCEND360.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {objectives.map((obj: Objective) => (
              <div
                key={obj.number}
                className="bg-white/10 backdrop-blur border border-white/20 rounded p-6 hover:bg-white/15 transition-colors"
              >
                <span className="text-[#4CAF50] font-extrabold text-3xl block mb-2">
                  {obj.number}
                </span>
                <h4 className="font-bold text-white mb-2">{obj.title}</h4>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG alignment */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1F4788] mb-6">
            Aligned with the UN Sustainable Development Goals
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { sdg: "SDG 4", label: "Quality Education", color: "#C5192D" },
              { sdg: "SDG 1", label: "No Poverty", color: "#E5243B" },
              { sdg: "SDG 13", label: "Climate Action", color: "#3F7E44" },
            ].map(({ sdg, label, color }) => (
              <div
                key={sdg}
                className="flex items-center gap-3 bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] px-6 py-4"
              >
                <div
                  className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: color }}
                >
                  {sdg}
                </div>
                <span className="font-medium text-[#333]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#4CAF50] py-16 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-green-50 mb-8">
            Every student reached is a future changed. Be part of it.
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
