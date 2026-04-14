import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Heart, Building2, ChevronDown, type LucideIcon } from "lucide-react";

type Pathway = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  benefits: string[];
  cta: string;
  ctaHref: string;
  external: boolean;
};

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join ASCEND360 as a student, volunteer, mentor, or partner — and help expand education access across Nigeria.",
};

const pathways: Pathway[] = [
  {
    id: "students",
    icon: GraduationCap,
    title: "I'm a Student",
    subtitle: "Access free sessions, mentorship & opportunities",
    color: "#4CAF50",
    description:
      "Register to attend the next Xcel360 session and gain access to scholarship information, AI skills training, and mentorship from industry professionals — all completely free.",
    benefits: [
      "Free virtual sessions on scholarships & career development",
      "Direct scholarship referrals and application support",
      "1-on-1 mentorship with industry professionals",
      "Access to Xcel360's Annual Presentation Day",
      "Community of ambitious Nigerian students",
    ],
    cta: "Register for Next Session",
    ctaHref: "https://forms.gle/placeholder",
    external: true,
  },
  {
    id: "volunteers",
    icon: Heart,
    title: "I Want to Volunteer",
    subtitle: "Give your time and skills to the mission",
    color: "#FF9800",
    description:
      "We're looking for passionate individuals to help with programme facilitation, social media, content creation, event organisation, and student support.",
    benefits: [
      "Facilitation support for Xcel360 sessions",
      "Social media and content creation",
      "Event planning and coordination",
      "Student outreach and community building",
      "Research and grant writing support",
    ],
    cta: "Apply to Volunteer",
    ctaHref: "/contact",
    external: false,
  },
  {
    id: "mentors",
    icon: Heart,
    title: "I Want to Mentor",
    subtitle: "Share your expertise, change a life",
    color: "#1F4788",
    description:
      "As a professional in any field, you have knowledge that could unlock a student's potential. Our mentorship programme requires as little as 2 hours per month.",
    benefits: [
      "Flexible commitment — as little as 2 hours/month",
      "Match with students in your field of expertise",
      "Virtual sessions — mentor from anywhere in the world",
      "Structured programme with clear expectations",
      "Join a growing community of impact-driven professionals",
    ],
    cta: "Apply to Mentor",
    ctaHref: "/contact",
    external: false,
  },
  {
    id: "partners",
    icon: Building2,
    title: "We're an Organization",
    subtitle: "Partner with us to scale our impact",
    color: "#9C27B0",
    description:
      "Corporate sponsors, academic institutions, NGOs, and international organizations can partner with ASCEND360 to amplify our reach and fund our programmes.",
    benefits: [
      "Sponsorship of Xcel360 sessions and events",
      "Employee volunteer programme integration",
      "Co-branded scholarship and opportunity promotion",
      "Access to ASCEND360's student network",
      "Detailed impact reports and SDG alignment data",
    ],
    cta: "Explore Partnership",
    ctaHref: "/contact",
    external: false,
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "How often do Xcel360 sessions happen?",
    a: "Sessions run every 2–3 months on Twitter/X Spaces. We announce upcoming sessions on our social media and email list. Register to be notified.",
  },
  {
    q: "Do students need to pay anything?",
    a: "All Xcel360 sessions are completely free. The only requirements are a Twitter/X account and the time to attend.",
  },
  {
    q: "Who can attend Xcel360?",
    a: "Any Nigerian student — secondary school, undergraduate, or postgraduate — with an interest in scholarships, AI, or career development is welcome.",
  },
  {
    q: "How does the mentorship matching work?",
    a: "After attending sessions, top-engaged students are matched with mentors based on their field of interest and career goals. Mentors commit to at least one 60-minute session per month.",
  },
  {
    q: "Can international Nigerians participate?",
    a: "Absolutely. Our sessions are virtual, so any Nigerian student anywhere in the world can join.",
  },
  {
    q: "How can my company partner with ASCEND360?",
    a: "Contact us via our Contact page or email info@ascend360.org. Partnership options include session sponsorship, scholarship funding, employee volunteering, and more.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1F4788] py-24 px-4 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-72 h-72 bg-[#4CAF50] top-[-60px] right-[-40px] opacity-[0.09] animate-float-a" />
        <div className="orb w-56 h-56 bg-[#2196F3] bottom-[-30px] left-[-30px] opacity-[0.10] animate-float-b" />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">
            Take Action
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get Involved
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Whether you&apos;re a student hungry for opportunities, a professional
            ready to give back, or an organisation with resources to share —
            there&apos;s a place for you here.
          </p>
        </div>
      </section>

      {/* Pathway cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pathways.map((p: Pathway) => (
              <div
                key={p.id}
                id={p.id}
                className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden hover:-translate-y-1 transition-transform duration-200"
              >
                {/* Top accent */}
                <div className="h-2" style={{ backgroundColor: p.color }} />
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${p.color}15` }}
                    >
                      <p.icon size={22} style={{ color: p.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1F4788]">
                        {p.title}
                      </h3>
                      <p className="text-[#666] text-sm">{p.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-[#555] text-sm leading-relaxed mb-5">
                    {p.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {p.benefits.map((b: string) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#555]">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${p.color}20` }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {p.external ? (
                    <a
                      href={p.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      {p.cta} <ArrowRight size={16} />
                    </a>
                  ) : (
                    <Link href={p.ctaHref} className="btn-primary text-sm">
                      {p.cta} <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F4788] mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-[#666]">
              Everything you need to know about getting involved.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq: { q: string; a: string }, i: number) => (
              <details
                key={i}
                className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] group"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-[#1F4788]">
                  {faq.q}
                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 text-[#999] group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-[#555] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#4CAF50] py-16 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-green-50 mb-8">
            We&apos;d love to hear from you. Reach out and our team will get back
            to you within 48 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded font-bold hover:bg-green-50 transition-colors"
          >
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
