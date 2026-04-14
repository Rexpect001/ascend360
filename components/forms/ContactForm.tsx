"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations";

const inquiryTypes = [
  { value: "STUDENT", label: "I'm a student" },
  { value: "VOLUNTEER", label: "I want to volunteer" },
  { value: "PARTNER", label: "Partnership inquiry" },
  { value: "MEDIA", label: "Media inquiry" },
  { value: "OTHER", label: "Other" },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error || "Submission failed. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setServerError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="w-14 h-14 bg-[#4CAF50]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-[#4CAF50]" />
        </div>
        <h3 className="text-xl font-bold text-[#1F4788] mb-2">
          Message Sent!
        </h3>
        <p className="text-[#555] text-sm leading-relaxed mb-6">
          Thank you for reaching out. We&apos;ll get back to you within 48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#4CAF50] font-semibold text-sm hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "error" && serverError && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <p>{serverError}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#333] mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Amina Johnson"
          {...register("name")}
          className="w-full px-4 py-2.5 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] focus:border-transparent"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#333] mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
          className="w-full px-4 py-2.5 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] focus:border-transparent"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Inquiry type */}
      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium text-[#333] mb-1.5">
          What best describes you? <span className="text-red-500">*</span>
        </label>
        <select
          id="inquiryType"
          {...register("inquiryType")}
          className="w-full px-4 py-2.5 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] bg-white"
          defaultValue=""
        >
          <option value="" disabled>
            Select an option...
          </option>
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.inquiryType && (
          <p className="text-red-500 text-xs mt-1">{errors.inquiryType.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#333] mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us how we can help or how you'd like to get involved..."
          {...register("message")}
          className="w-full px-4 py-2.5 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] focus:border-transparent resize-y"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          "Sending..."
        ) : (
          <>
            Send Message <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
