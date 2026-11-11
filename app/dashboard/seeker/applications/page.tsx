
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { getMyApplications } from "@/lib/actions/applications"
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Mail,
  Phone,
  Pencil,
  ExternalLink,
  Send,
} from "lucide-react"
import { toast } from "sonner"

type Application = {
  _id: string
  jobId: string
  applicantName: string
  applicantEmail: string
  phone: string
  resume: string
  coverLetter: string
  status?: string
  appliedAt?: string
}

export default function ApplicationsPage() {
  const router = useRouter()

  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await authClient.getSession()

        if (!data?.user?.email) return

        const result = await getMyApplications(data.user.email)
        setApplications(result)
      } catch (error) {
        console.error(error)
        toast.error("Failed to load applications")
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const getStatusStyle = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "reviewed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101B2B] text-slate-400">
        Loading your applications...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#101B2B] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-400">
              <BriefcaseBusiness size={16} />
              Career Dashboard
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Applications
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Keep track of your job applications and their progress.
            </p>
          </div>

          <button
            onClick={() => router.push("/browse-jobs")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-500"
          >
            <Send size={16} />
            Find More Jobs
          </button>
        </div>

        {/* Summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#344459] bg-[#172538] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Total Applications</p>
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                <FileText size={19} />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{applications.length}</h2>
            <p className="mt-1 text-xs text-slate-500">
              Applications submitted
            </p>
          </div>

          <div className="rounded-2xl border border-[#344459] bg-[#172538] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Pending</p>
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
                <CalendarDays size={19} />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">
              {applications.filter(
                (app) => !app.status || app.status.toLowerCase() === "pending"
              ).length}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Waiting for review
            </p>
          </div>

          <div className="rounded-2xl border border-[#344459] bg-[#172538] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Reviewed</p>
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                <BriefcaseBusiness size={19} />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">
              {applications.filter(
                (app) => app.status?.toLowerCase() === "reviewed"
              ).length}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Applications reviewed
            </p>
          </div>
        </div>

        {/* Applications List */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <p className="mt-1 text-sm text-slate-400">
              Your submitted job applications
            </p>
          </div>

          <span className="rounded-lg border border-[#344459] bg-[#172538] px-3 py-1.5 text-xs text-slate-300">
            {applications.length} Applications
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#344459] bg-[#172538]/60 px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <FileText size={30} />
            </div>

            <h3 className="text-lg font-semibold">
              No applications yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">
              You haven't applied for any jobs. Explore available opportunities
              and take the next step in your career.
            </p>

            <button
              onClick={() => router.push("/browse-jobs")}
              className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-emerald-500"
            >
              Explore Jobs
            </button>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {applications.map((application) => (
              <div
                key={application._id}
                className="group rounded-2xl border border-[#344459] bg-[#172538] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-black/10 sm:p-6"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <BriefcaseBusiness size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {application.applicantName}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Job Application
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(application.status)}`}
                  >
                    {application.status || "Pending"}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-[#344459]" />

                {/* Applicant Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Mail size={16} className="shrink-0 text-slate-500" />
                    <span className="truncate">{application.applicantEmail}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Phone size={16} className="shrink-0 text-slate-500" />
                    <span>{application.phone}</span>
                  </div>

                  <div className="rounded-xl bg-[#101B2B] p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Cover Letter
                    </p>
                    <p className="line-clamp-3 text-sm leading-6 text-slate-300">
                      {application.coverLetter}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#344459] pt-5">
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
                  >
                    <FileText size={16} />
                    View Resume
                    <ExternalLink size={13} />
                  </a>

                  <button
                    onClick={() =>
                      toast.info("Application editing will be available soon.")
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-[#344459] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    <Pencil size={15} />
                    Edit Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
