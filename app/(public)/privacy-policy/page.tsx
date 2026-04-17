import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ascend360's privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10">
        <Link href="/" className="text-[#4CAF50] text-sm hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-extrabold text-[#1F4788] mt-4 mb-2">
          Privacy Policy
        </h1>
        <p className="text-[#666] text-sm">Last updated: January 2025</p>
      </div>

      <div className="prose text-[#444]">
        <h2>1. Introduction</h2>
        <p>
          ascend360 (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website ascend360.org or interact with our programmes.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal identification information:</strong> Name, email
            address, and other contact details you provide via our contact form
            or programme registration.
          </li>
          <li>
            <strong>Usage data:</strong> Pages visited, time spent, referring
            URLs, and browser information collected automatically via analytics
            tools.
          </li>
          <li>
            <strong>Communications:</strong> Messages you send us through our
            contact form or email.
          </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your enquiries and contact form submissions</li>
          <li>Send programme updates and session announcements (with consent)</li>
          <li>Improve our website and programmes</li>
          <li>Comply with legal obligations</li>
          <li>
            Generate anonymised impact reports (no individual is identifiable)
          </li>
        </ul>

        <h2>4. Data Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share data with trusted service providers (email
          delivery, analytics) who assist in our operations, subject to
          confidentiality obligations.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain personal data only as long as necessary to fulfil the
          purposes for which it was collected, or as required by law. Contact
          form submissions are retained for up to 2 years. You may request
          deletion of your data at any time.
        </p>

        <h2>6. Your Rights</h2>
        <p>Under applicable data protection laws, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
          <li>Object to or restrict processing of your data</li>
          <li>Withdraw consent at any time (where processing is consent-based)</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:info@ascend360.org">info@ascend360.org</a>.
        </p>

        <h2>7. Cookies</h2>
        <p>
          Our website may use cookies for functionality and analytics purposes.
          You may configure your browser to refuse cookies, but this may affect
          website functionality.
        </p>

        <h2>8. Security</h2>
        <p>
          We implement appropriate technical and organisational measures to
          protect your personal data against unauthorised access, alteration,
          disclosure, or destruction. However, no internet transmission is
          entirely secure.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated &ldquo;last updated&rdquo; date.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:info@ascend360.org">info@ascend360.org</a> or use our{" "}
          <Link href="/contact">contact form</Link>.
        </p>
      </div>
    </div>
  );
}
