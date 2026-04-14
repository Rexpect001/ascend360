"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Heart, Building2, ChevronDown, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type Pathway = { id: string; icon: LucideIcon; title: string; subtitle: string; color: string; description: string; benefits: string[]; cta: string; ctaHref: string; external: boolean };

const pathways: Pathway[] = [
  { id: "students", icon: GraduationCap, title: "I'm a Student", subtitle: "Access free sessions, mentorship & opportunities", color: "#4CAF50", description: "Register to attend the next Xcel360 session and gain access to scholarship information, AI skills training, and mentorship from industry professionals — all completely free.", benefits: ["Free virtual sessions on scholarships & career development", "Direct scholarship referrals and application support", "1-on-1 mentorship with industry professionals", "Access to Xcel360's Annual Presentation Day", "Community of ambitious Nigerian students"], cta: "Register for Next Session", ctaHref: "https://forms.gle/placeholder", external: true },
  { id: "volunteers", icon: Heart, title: "I Want to Volunteer", subtitle: "Give your time and skills to the mission", color: "#FF9800", description: "We're looking for passionate individuals to help with programme facilitation, social media, content creation, event organisation, and student support.", benefits: ["Facilitation support for Xcel360 sessions", "Social media and content creation", "Event planning and coordination", "Student outreach and community building", "Research and grant writing support"], cta: "Apply to Volunteer", ctaHref: "/contact", external: false },
  { id: "mentors", icon: Heart, title: "I Want to Mentor", subtitle: "Share your expertise, change a life", color: "#1F4788", description: "As a professional in any field, you have knowledge that could unlock a student's potential. Our mentorship programme requires as little as 2 hours per month.", benefits: ["Flexible commitment — as little as 2 hours/month", "Match with students in your field of expertise", "Virtual sessions — mentor from anywhere in the world", "Structured programme with clear expectations", "Join a growing community of impact-driven professionals"], cta: "Apply to Mentor", ctaHref: "/contact", external: false },
  { id: "partners", icon: Building2, title: "We're an Organization", subtitle: "Partner with us to scale our impact", color: "#9C27B0", description: "Corporate sponsors, academic institutions, NGOs, and international organizations can partner with ASCEND360 to amplify our reach and fund our programmes.", benefits: ["Sponsorship of Xcel360 sessions and events", "Employee volunteer programme integration", "Co-branded scholarship and opportunity promotion", "Access to ASCEND360's student network", "Detailed impact reports and SDG alignment data"], cta: "Explore Partnership", ctaHref: "/contact", external: false },
];

const faqs = [
  { q: "How often do Xcel360 sessions happen?", a: "Sessions run every 2–3 months on Twitter/X Spaces. We announce upcoming sessions on our social media and email list." },
  { q: "Do students need to pay anything?", a: "All Xcel360 sessions are completely free. The only requirements are a Twitter/X account and the time to attend." },
  { q: "Who can attend Xcel360?", a: "Any Nigerian student — secondary school, undergraduate, or postgraduate — with an interest in scholarships, AI, or career development is welcome." },
  { q: "How does the mentorship matching work?", a: "After attending sessions, top-engaged students are matched with mentors based on their field of interest and career goals." },
  { q: "Can international Nigerians participate?", a: "Absolutely. Our sessions are virtual, so any Nigerian student anywhere in the world can join." },
  { q: "How can my company partner with ASCEND360?", a: "Contact us via our Contact page or email info@ascend360.org. Partnership options include session sponsorship, scholarship funding, and employee volunteering." },
];

function PathwayCard({ pathway, index }: { pathway: Pathway; index: number }) {
  const { ref, inView } = useInView(0.08);
  const Icon = pathway.icon;
  return (
    <div
      ref={ref}
      id={pathway.id}
      className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.65s ease ${index * 130}ms, transform 0.65s ease ${index * 130}ms` }}
    >
      <div className="h-2" style={{ backgroundColor: pathway.color }} />
      <div className="p-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${pathway.color}15` }}>
            <Icon size={22} style={{ color: pathway.color }} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1F4788]">{pathway.title}</h3>
            <p className="text-[#666] text-sm">{pathway.subtitle}</p>
          </div>
        </div>
        <p className="text-[#555] text-sm leading-relaxed mb-5">{pathway.description}</p>
        <ul className="space-y-2 mb-6">
          {pathway.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-[#555]">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${pathway.color}20` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pathway.color }} />
              </div>
              {b}
            </li>
          ))}
        </ul>
        {pathway.external ? (
          <a href={pathway.ctaHref} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">{pathway.cta} <ArrowRight size={16} /></a>
        ) : (
          <Link href={pathway.ctaHref} className="btn-primary text-sm">{pathway.cta} <ArrowRight size={16} /></Link>
        )}
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

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms` }}
    >
      <details className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] group">
        <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-[#1F4788]">
          {faq.q}
          <ChevronDown size={16} className="flex-shrink-0 text-[#999] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-5 pb-5">
          <p className="text-[#555] text-sm leading-relaxed">{faq.a}</p>
        </div>
      </details>
    </div>
  );
}

export default function GetInvolvedContent() {
  return (
    <>
      {/* Pathway cards */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Choose Your Path</p>
            <h2 className="text-3xl font-bold text-[#1F4788]">How Would You Like to Contribute?</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pathways.map((p, i) => <PathwayCard key={p.id} pathway={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F4788] mb-2">Frequently Asked Questions</h2>
            <p className="text-[#666]">Everything you need to know about getting involved.</p>
          </FadeUp>
          <div className="space-y-4">
            {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-white">
        <FadeUp className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1F4788] mb-4">Still Have Questions?</h2>
          <p className="text-[#555] mb-8 leading-relaxed">We&apos;d love to hear from you. Reach out and our team will get back to you within 48 hours.</p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">Contact Us <ArrowRight size={18} /></Link>
        </FadeUp>
      </section>
    </>
  );
}
