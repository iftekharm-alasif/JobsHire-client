"use client"

import Link from "next/link"
import {
BriefcaseBusiness,
ArrowUpRight,
Globe,
MessageCircle,
Send,
Code,
} from "lucide-react"

const Footer = () => {
return (
<footer className="border-t border-[#344459] bg-[#101B2B] text-slate-300">
<div className="mx-auto max-w-7xl px-6 pb-8 pt-14">
<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

      {/* Brand */}
      <div>
        <Link href="/" className="mb-4 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
            <BriefcaseBusiness size={22} className="text-white" />
          </div>

          <span className="text-2xl font-bold text-white">
            Hire<span className="text-emerald-400">Loop</span>
          </span>
        </Link>

        <p className="max-w-xs text-sm leading-7 text-slate-400">
          Connecting talented people with meaningful opportunities.
          Find your next career move with HireLoop.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-lg border border-[#344459] p-2 transition hover:border-emerald-400 hover:text-emerald-400">
            <Globe size={18} />
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-lg border border-[#344459] p-2 transition hover:border-emerald-400 hover:text-emerald-400">
            <MessageCircle size={18} />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="rounded-lg border border-[#344459] p-2 transition hover:border-emerald-400 hover:text-emerald-400">
            <Send size={18} />
          </a>

          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg border border-[#344459] p-2 transition hover:border-emerald-400 hover:text-emerald-400">
            <Code size={18} />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="mb-5 font-semibold text-white">Quick Links</h3>
        <ul className="space-y-3 text-sm">
          <li><Link href="/" className="transition hover:text-emerald-400">Home</Link></li>
          <li><Link href="/browse-jobs" className="transition hover:text-emerald-400">Browse Jobs</Link></li>
          <li><Link href="/about" className="transition hover:text-emerald-400">About Us</Link></li>
          <li><Link href="/contact" className="transition hover:text-emerald-400">Contact</Link></li>
        </ul>
      </div>

      {/* Job Seekers */}
      <div>
        <h3 className="mb-5 font-semibold text-white">For Job Seekers</h3>
        <ul className="space-y-3 text-sm">
          <li><Link href="/browse-jobs" className="transition hover:text-emerald-400">Find Jobs</Link></li>
          <li><Link href="/dashboard/seeker/applications" className="transition hover:text-emerald-400">My Applications</Link></li>
          <li><Link href="/dashboard/seeker/saved-jobs" className="transition hover:text-emerald-400">Saved Jobs</Link></li>
          <li><Link href="/dashboard/seeker/billing" className="transition hover:text-emerald-400">Premium Plan</Link></li>
        </ul>
      </div>

      {/* Employers */}
      <div>
        <h3 className="mb-5 font-semibold text-white">For Employers</h3>
        <ul className="space-y-3 text-sm">
          <li><Link href="/dashboard/employer/post-job" className="transition hover:text-emerald-400">Post a Job</Link></li>
          <li><Link href="/dashboard/employer/jobs" className="transition hover:text-emerald-400">Manage Jobs</Link></li>
          <li><Link href="/dashboard/employer/applications" className="transition hover:text-emerald-400">Applications</Link></li>
          <li><Link href="/contact" className="transition hover:text-emerald-400">Get Support</Link></li>
        </ul>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#344459] pt-7 text-center sm:flex-row sm:text-left">
      <p className="text-xs text-slate-500">
        © {new Date().getFullYear()} HireLoop. All rights reserved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500">
        <Link href="/privacy" className="transition hover:text-emerald-400">Privacy Policy</Link>
        <Link href="/terms" className="transition hover:text-emerald-400">Terms of Service</Link>
        <a href="#" className="flex items-center gap-1 transition hover:text-emerald-400">
          Back to top <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  </div>
</footer>

)
}

export default Footer