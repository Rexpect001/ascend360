import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the trustees, staff, and mentors behind ASCEND360 — passionate Nigerians committed to education access and community development.",
};

async function getTeam() {
  return prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: [{ roleType: "asc" }, { displayOrder: "asc" }],
  });
}

const roleLabels: Record<string, string> = {
  TRUSTEE: "Board of Trustees",
  STAFF: "Staff",
  MENTOR: "Mentors",
};

export default async function TeamPage() {
  const members = await getTeam();

  const grouped = members.reduce<Record<string, typeof members>>(
    (acc: Record<string, typeof members>, m: typeof members[number]) => {
      if (!acc[m.roleType]) acc[m.roleType] = [];
      acc[m.roleType].push(m);
      return acc;
    },
    {}
  );

  const order = ["TRUSTEE", "STAFF", "MENTOR"];

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
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our People</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Meet the Team</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Passionate Nigerians united by a belief that every student deserves
            access to life-changing information and mentorship.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,50 L0,20 Q360,50 720,10 Q1080,0 1440,32 L1440,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Team sections */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {order.map((roleType: string) => {
            const group = grouped[roleType];
            if (!group || group.length === 0) return null;

            return (
              <section key={roleType}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#1F4788] mb-2">
                    {roleLabels[roleType]}
                  </h2>
                  {roleType === "TRUSTEE" && (
                    <p className="text-[#666]">
                      The founders who built ASCEND360 from the ground up.
                    </p>
                  )}
                  {roleType === "MENTOR" && (
                    <p className="text-[#666]">
                      Industry professionals volunteering their expertise to
                      guide our students.
                    </p>
                  )}
                </div>

                <div
                  className={`grid gap-8 ${
                    roleType === "TRUSTEE"
                      ? "grid-cols-1 md:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {group.map((member: typeof members[number]) => (
                    <div
                      key={member.id}
                      className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 text-center hover:-translate-y-1 transition-transform duration-200"
                    >
                      {/* Photo */}
                      {member.imageUrl ? (
                        <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-5">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-28 h-28 rounded-full bg-[#1F4788] flex items-center justify-center mx-auto mb-5">
                          <span className="text-white font-extrabold text-3xl">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold text-[#1F4788] text-lg mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#4CAF50] text-sm font-semibold mb-3">
                        {member.title}
                      </p>
                      {member.bio && (
                        <p className="text-[#666] text-sm leading-relaxed mb-4 line-clamp-3">
                          {member.bio}
                        </p>
                      )}

                      {/* Links */}
                      <div className="flex items-center justify-center gap-3">
                        {member.linkedinUrl && (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="w-8 h-8 rounded-full border border-[#ddd] flex items-center justify-center text-[#666] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            className="w-8 h-8 rounded-full border border-[#ddd] flex items-center justify-center text-[#666] hover:bg-[#4CAF50] hover:text-white hover:border-[#4CAF50] transition-all"
                          >
                            <Mail size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Empty state if no DB */}
          {Object.keys(grouped).length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Johnson Alabi", title: "President & Co-Founder", initials: "JA" },
                { name: "Seun", title: "Co-Founder & Director of Programs", initials: "S" },
                { name: "Akindoyin", title: "Co-Founder & Director of Partnerships", initials: "A" },
              ].map((f: { name: string; title: string; initials: string }) => (
                <div
                  key={f.name}
                  className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 text-center"
                >
                  <div className="w-28 h-28 rounded-full bg-[#1F4788] flex items-center justify-center mx-auto mb-5">
                    <span className="text-white font-extrabold text-3xl">{f.initials}</span>
                  </div>
                  <h3 className="font-bold text-[#1F4788] text-lg mb-1">{f.name}</h3>
                  <p className="text-[#4CAF50] text-sm font-semibold">{f.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Join as mentor CTA */}
      <section className="bg-[#1F4788] py-16 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Become a Mentor</h2>
          <p className="text-blue-100 mb-8">
            Share your expertise and open doors for the next generation of
            Nigerian leaders. Mentoring takes as little as 2 hours a month.
          </p>
          <Link
            href="/get-involved#mentors"
            className="inline-flex items-center gap-2 bg-[#4CAF50] text-white px-8 py-4 rounded font-bold hover:bg-[#388E3C] transition-colors"
          >
            Apply to Mentor <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
