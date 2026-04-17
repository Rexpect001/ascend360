"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type Member = {
  id: string;
  name: string;
  title: string;
  roleType: string;
  bio: string | null;
  imageUrl: string | null;
  linkedinUrl: string | null;
  email: string | null;
};

const roleLabels: Record<string, string> = {
  TRUSTEE: "Board of Trustees",
  STAFF: "Staff",
  MENTOR: "Mentors",
};

const roleSubtitles: Record<string, string> = {
  TRUSTEE: "The founders who built ascend360 from the ground up.",
  STAFF: "The dedicated team driving our day-to-day operations.",
  MENTOR: "Industry professionals volunteering their expertise to guide our students.",
};

const defaultMembers: Member[] = [
  { id: "1", name: "Johnson Alabi", title: "President & Co-Founder", roleType: "TRUSTEE", bio: "Passionate about education access and social equity across Nigeria.", imageUrl: null, linkedinUrl: null, email: null },
  { id: "2", name: "Seun", title: "Co-Founder & Director of Programs", roleType: "TRUSTEE", bio: "Driving programme development and student engagement across all 36 states.", imageUrl: null, linkedinUrl: null, email: null },
  { id: "3", name: "Akindoyin", title: "Co-Founder & Director of Partnerships", roleType: "TRUSTEE", bio: "Building strategic relationships that amplify ascend360's reach and impact.", imageUrl: null, linkedinUrl: null, email: null },
];

/* ── MemberCard (hooks at top level) ─────────────────────────────────────── */
function MemberCard({ member, index }: { member: Member; index: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 text-center group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      {member.imageUrl ? (
        <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 ring-2 ring-[#1F4788]/10 group-hover:ring-[#4CAF50]/50 transition-all">
          <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#1F4788] to-[#2d5aab] flex items-center justify-center mx-auto mb-5 ring-2 ring-[#1F4788]/10 group-hover:ring-[#4CAF50]/50 transition-all">
          <span className="text-white font-extrabold text-3xl">
            {member.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <h3 className="font-bold text-[#1F4788] text-lg mb-1">{member.name}</h3>
      <p className="text-[#4CAF50] text-sm font-semibold mb-3">{member.title}</p>
      {member.bio && (
        <p className="text-[#666] text-sm leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
      )}

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

export default function TeamContent({ members }: { members: Member[] }) {
  const display = members.length > 0 ? members : defaultMembers;
  const order = ["TRUSTEE", "STAFF", "MENTOR"];

  const grouped = display.reduce<Record<string, Member[]>>((acc, m) => {
    if (!acc[m.roleType]) acc[m.roleType] = [];
    acc[m.roleType].push(m);
    return acc;
  }, {});

  return (
    <>
      {/* Team sections */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-20">
          {order.map((roleType) => {
            const group = grouped[roleType];
            if (!group || group.length === 0) return null;

            return (
              <section key={roleType}>
                <FadeUp className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#1F4788] mb-2">{roleLabels[roleType]}</h2>
                  <p className="text-[#666]">{roleSubtitles[roleType]}</p>
                </FadeUp>

                <div
                  className={`grid gap-8 ${
                    roleType === "TRUSTEE"
                      ? "grid-cols-1 md:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {group.map((member, i) => (
                    <MemberCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Join as mentor CTA */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <FadeUp className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-[#1F4788] mb-4">Become a Mentor</h2>
          <p className="text-[#555] mb-8 leading-relaxed">
            Share your expertise and open doors for the next generation of Nigerian leaders.
            Mentoring takes as little as 2 hours a month.
          </p>
          <Link href="/get-involved#mentors" className="btn-primary inline-flex items-center gap-2">
            Apply to Mentor <ArrowRight size={18} />
          </Link>
        </FadeUp>
      </section>
    </>
  );
}
