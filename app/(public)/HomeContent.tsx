"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Quote,
} from "lucide-react";

/* ── Placeholder gallery images (replace with real event photos) ─────────── */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    alt: "Students in a learning session",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    alt: "Community workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
    alt: "Mentorship session",
  },
  {
    src: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80",
    alt: "Young people collaborating",
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    alt: "Education access",
  },
];

/* ── IntersectionObserver hook ──────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── FadeUp wrapper ─────────────────────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Gallery cell (hooks at top level) ──────────────────────────────────── */
function GalleryCell({
  src,
  alt,
  index,
  className = "",
}: {
  src: string;
  alt: string;
  index: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.96)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d5e]/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

/* ── Main exported component ────────────────────────────────────────────── */
export default function HomeContent() {
  return (
    <>
      {/* ── PHOTO GALLERY ── */}
      <section className="relative py-16 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-2">
              From the Field
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4788]">
              Real People. Real Impact.
            </h2>
          </FadeUp>

          {/* Mosaic grid — tall left cell + 2×2 right */}
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "260px 260px",
            }}
          >
            <GalleryCell
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              index={0}
              className="[grid-row:1/3]"
            />
            <GalleryCell src={galleryImages[1].src} alt={galleryImages[1].alt} index={1} />
            <GalleryCell src={galleryImages[2].src} alt={galleryImages[2].alt} index={2} />
            <GalleryCell src={galleryImages[3].src} alt={galleryImages[3].alt} index={3} />
            <GalleryCell src={galleryImages[4].src} alt={galleryImages[4].alt} index={4} />
          </div>
        </div>
      </section>

      {/* ── MISSION SNAPSHOT ── */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeUp>
            <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">Our Purpose</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F4788] mb-6">
              Why ascend360 Exists
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p className="text-lg md:text-xl text-[#444] leading-relaxed max-w-3xl mx-auto mb-4">
              Millions of talented Nigerian students lack access to information about
              scholarships, global opportunities, and career pathways. ascend360 was
              founded to close that gap — equipping young people with the knowledge,
              networks, and confidence to excel on the world stage.
            </p>
          </FadeUp>
          <FadeUp delay={220}>
            <p className="text-[#666] leading-relaxed max-w-2xl mx-auto">
              Through our programs, we don&apos;t just inform — we transform. Every
              session, every mentorship, every scholarship win is a step toward a
              more equitable Africa.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-[#4CAF50] font-semibold hover:underline"
            >
              Read our full story <ChevronRight size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── TESTIMONIAL / QUOTE ── */}
      <section className="relative py-20 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-dots opacity-60" />
        <div className="orb w-72 h-72 bg-[#1F4788] top-[-40px] left-[-40px] opacity-[0.04] animate-float-b" />
        <div className="orb w-56 h-56 bg-[#4CAF50] bottom-[-30px] right-[-30px] opacity-[0.05] animate-float-a" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="w-12 h-12 bg-[#1F4788]/8 rounded-full flex items-center justify-center mx-auto mb-6">
              <Quote size={22} className="text-[#1F4788] opacity-60" />
            </div>

            <p className="text-xl md:text-2xl font-semibold text-[#1F4788] italic leading-relaxed mb-6">
              &ldquo;Before Xcel360, I didn&apos;t know scholarships like the Mastercard Foundation existed.
              After one session, everything changed. Today I&apos;m studying Computer Science at ALU —
              fully funded.&rdquo;
            </p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-[#4CAF50]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
              <div className="h-px w-16 bg-[#4CAF50]/40" />
            </div>

            <p className="text-[#4CAF50] font-bold text-base">Fatima A.</p>
            <p className="text-[#666] text-sm">Mastercard Foundation Scholar &mdash; ALU</p>

            <Link
              href="/impact"
              className="inline-flex items-center gap-1.5 mt-6 text-[#1F4788] font-semibold text-sm hover:underline"
            >
              More impact stories <ArrowRight size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="orb w-80 h-80 bg-[#1F4788] top-[-60px] right-[-40px] opacity-[0.04] animate-float-a" />
        <div className="orb w-56 h-56 bg-[#4CAF50] bottom-[-30px] left-[-20px] opacity-[0.05] animate-float-b" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-[#1F4788]/8 border border-[#1F4788]/15 text-[#1F4788] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Join the Movement
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4788] mb-4 leading-tight">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-[#555] mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you&apos;re a student looking for opportunities, a volunteer
              ready to give back, or an organization wanting to partner — there&apos;s
              a place for you in the ascend360 community.
            </p>
          </FadeUp>
          <FadeUp delay={160}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved" className="btn-primary text-base shadow-lg shadow-green-700/20">
                Get Involved Today <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1F4788] text-[#1F4788] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#1F4788] hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
