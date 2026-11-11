import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Wallet,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

type Job = {
  _id: string
  title: string
  company: string
  category: string
  location: string
  type: string
  workplace: string
  salary: string
  deadline: string
  description: string
  requirements: string
  applications?: number
}

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101B2B] px-4 text-center text-white">
        <div>
          <h1 className="text-2xl font-bold">Job Not Found</h1>
          <p className="mt-2 text-slate-400">
            This job may have been removed or is unavailable.
          </p>
          <Link
            href="/browse-jobs"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-700"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    )
  }

  const job: Job = await res.json()

  return (
    <div className="min-h-screen bg-[#101B2B] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/browse-jobs"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={18} />
          Back to Browse Jobs
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Job Information */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-2xl border border-[#344459] bg-[#172538] p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                  {job.category}
                </span>

                <span className="rounded-full border border-[#344459] px-4 py-2 text-sm text-slate-300">
                  {job.type}
                </span>
              </div>

              <h1 className="mt-6 text-3xl leading-tight font-bold md:text-4xl">
                {job.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-slate-400">
                <Building2 size={19} className="text-emerald-400" />
                {job.company}
              </p>

              <div className="mt-8 grid gap-6 border-t border-[#344459] pt-7 sm:grid-cols-2">
                <div>
                  <MapPin className="mb-3 text-emerald-400" size={22} />
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="mt-1 font-medium">{job.location}</p>
                </div>

                <div>
                  <BriefcaseBusiness
                    className="mb-3 text-emerald-400"
                    size={22}
                  />
                  <p className="text-sm text-slate-500">Workplace</p>
                  <p className="mt-1 font-medium">{job.workplace}</p>
                </div>

                <div>
                  <Wallet className="mb-3 text-emerald-400" size={22} />
                  <p className="text-sm text-slate-500">Salary</p>
                  <p className="mt-1 font-medium">
                    {job.salary || "Not specified"}
                  </p>
                </div>

                <div>
                  <CalendarDays className="mb-3 text-emerald-400" size={22} />
                  <p className="text-sm text-slate-500">Application Deadline</p>
                  <p className="mt-1 font-medium">
                    {job.deadline || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="rounded-2xl border border-[#344459] bg-[#172538] p-6 md:p-8">
              <h2 className="mb-5 text-xl font-bold">Job Description</h2>
              <p className="leading-8 whitespace-pre-line text-slate-400">
                {job.description || "No description available."}
              </p>
            </div>

            {/* Requirements */}
            <div className="rounded-2xl border border-[#344459] bg-[#172538] p-6 md:p-8">
              <h2 className="mb-5 text-xl font-bold">Skills & Requirements</h2>

              <div className="leading-8 whitespace-pre-line text-slate-400">
                {job.requirements || "No requirements specified."}
              </div>
            </div>
            <Link
              href="/browse-jobs"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold transition hover:bg-emerald-700"
            >
              Browse More Jobs
            </Link>
          </div>

          {/* Apply Card */}
          <aside className="h-fit rounded-2xl border border-[#344459] bg-[#172538] p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">Interested in this role?</h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Take the next step in your career. Submit your application for
              this opportunity.
            </p>

            <div className="my-6 space-y-4 border-y border-[#344459] py-6">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Clock size={18} className="text-emerald-400" />
                Deadline: {job.deadline || "Not specified"}
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Building2 size={18} className="text-emerald-400" />
                {job.company}
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400" />
                {job.workplace}
              </div>
            </div>

            <Link
              href={`/sign-in?redirect=${encodeURIComponent(`/apply-job/${job._id}`)}`}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Apply Now
              <Send size={17} />
            </Link>
            <p className="mt-4 text-center text-xs text-slate-500">
              Make sure your profile and application details are up to date.
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
