"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

/**
 * CTA button matching the design: chartreuse pill, calendar icon left, label, arrow right.
 * Used for "Prendre rendez-vous", "Book a meeting", etc. in Strapi content.
 */
export default function ContactCTAButton({
  label,
  href,
  className = "",
}: {
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-base hover:brightness-105 hover:shadow-lg hover:shadow-iter-chartreuse/20 transition-all duration-300 group mt-4 mb-6 ${className}`.trim()}
    >
      <Calendar size={18} className="shrink-0" aria-hidden />
      <span>{label}</span>
      <ArrowRight size={18} className="shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden />
    </Link>
  );
}
