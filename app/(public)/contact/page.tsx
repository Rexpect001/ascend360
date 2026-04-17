import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ascend360 — for students, volunteers, partners, and media inquiries.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-white text-center overflow-hidden hero-section"
        style={{ backgroundImage: "url('/images/about-bg.svg')" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(10,28,68,0.80)" }} />
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-72 h-72 bg-[#4CAF50] top-[-60px] right-[-40px] opacity-[0.14] animate-float-a" />
        <div className="orb w-56 h-56 bg-[#2196F3] bottom-[-30px] left-[-30px] opacity-[0.16] animate-float-b" />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">
            Reach Out
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Contact Us
          </h1>
          <p className="text-blue-100 text-lg">
            We&apos;d love to hear from you. Fill in the form and we&apos;ll get back
            to you within 48 hours.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#1F4788] mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <h3 className="font-bold text-[#1F4788] mb-4 text-lg">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#1F4788]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={16} className="text-[#1F4788]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#333]">Email</p>
                    <a
                      href="mailto:info@ascend360.org"
                      className="text-sm text-[#4CAF50] hover:underline"
                    >
                      info@ascend360.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#1F4788]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} className="text-[#1F4788]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#333]">Location</p>
                    <p className="text-sm text-[#666]">Nigeria (virtual-first organisation)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#1F4788]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={16} className="text-[#1F4788]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#333]">Response Time</p>
                    <p className="text-sm text-[#666]">Within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#eee] pt-6">
              <h3 className="font-bold text-[#1F4788] mb-3 text-sm">
                For Specific Inquiries
              </h3>
              <ul className="space-y-2 text-sm text-[#555]">
                <li>
                  <strong>Students:</strong> Select &ldquo;I&apos;m a student&rdquo; in the form
                </li>
                <li>
                  <strong>Partners:</strong> Select &ldquo;Partnership inquiry&rdquo;
                </li>
                <li>
                  <strong>Media:</strong> Select &ldquo;Media inquiry&rdquo;
                </li>
                <li>
                  <strong>Volunteers:</strong> Select &ldquo;I want to volunteer&rdquo;
                </li>
              </ul>
            </div>

            <div className="bg-[#F5F5F5] rounded p-5">
              <h3 className="font-bold text-[#1F4788] mb-2 text-sm">
                Follow Our Work
              </h3>
              <p className="text-xs text-[#666] mb-3">
                Stay updated on Xcel360 sessions, scholarships, and impact stories.
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "Twitter/X", href: "#" },
                  { label: "LinkedIn", href: "#" },
                  { label: "Instagram", href: "#" },
                ].map((s: { label: string; href: string }) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-xs font-semibold text-[#1F4788] border border-[#1F4788] px-3 py-1.5 rounded hover:bg-[#1F4788] hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
