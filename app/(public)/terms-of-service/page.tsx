import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ASCEND360's terms of service for using our website and programmes.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10">
        <Link href="/" className="text-[#4CAF50] text-sm hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-extrabold text-[#1F4788] mt-4 mb-2">
          Terms of Service
        </h1>
        <p className="text-[#666] text-sm">Last updated: January 2025</p>
      </div>

      <div className="prose text-[#444]">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the ASCEND360 website (ascend360.org) or
          participating in our programmes, you agree to be bound by these Terms
          of Service. If you do not agree, please do not use our services.
        </p>

        <h2>2. Description of Services</h2>
        <p>
          ASCEND360 provides free educational content, virtual learning
          sessions, mentorship connections, and related programme information
          for Nigerian students. We do not charge participants for access to
          Xcel360 sessions or mentorship.
        </p>

        <h2>3. User Conduct</h2>
        <p>When using our services, you agree not to:</p>
        <ul>
          <li>Provide false or misleading information</li>
          <li>
            Use our platform for unlawful purposes or to harm others
          </li>
          <li>Disrupt or interfere with our services or infrastructure</li>
          <li>
            Copy, distribute, or misuse ASCEND360 content without permission
          </li>
          <li>
            Engage in harassment, discrimination, or abusive behaviour toward
            other participants or staff
          </li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content on this website — including text, graphics, logos, and
          programme materials — is owned by ASCEND360 or its content
          contributors and is protected by applicable copyright laws. You may
          share our content for non-commercial, educational purposes with
          attribution.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          Our services are provided &ldquo;as is&rdquo; without warranties of any kind,
          express or implied. We do not guarantee that any student will receive
          a scholarship or achieve a particular outcome as a result of
          participating in our programmes.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, ASCEND360 shall not be liable
          for any indirect, incidental, special, or consequential damages
          arising from your use of our services or participation in our
          programmes.
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites (scholarship
          portals, partner organisations, etc.). We are not responsible for the
          content, privacy practices, or accuracy of these external sites.
        </p>

        <h2>8. Programme Participation</h2>
        <p>
          Participation in Xcel360 sessions and mentorship programmes is
          voluntary. ASCEND360 reserves the right to remove participants who
          violate community standards or these Terms.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of our
          services after changes constitutes acceptance of the updated Terms.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the Federal Republic of
          Nigeria. Any disputes shall be subject to the jurisdiction of
          Nigerian courts.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these Terms? Contact us at{" "}
          <a href="mailto:info@ascend360.org">info@ascend360.org</a>.
        </p>
      </div>
    </div>
  );
}
