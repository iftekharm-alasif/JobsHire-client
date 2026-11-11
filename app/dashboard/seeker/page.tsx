
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { getMyApplications } from "@/lib/actions/applications"
import {
  BriefcaseBusiness,
  FileText,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  Search,
  UserRound,
  ChevronRight,
  ExternalLink,
  Send,
} from "lucide-react"

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

export default function SeekerDashboard() {
  const router = useRouter()

  const [user, setUser] = useState({
    name: "",
    email: "",
  })

  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await authClient.getSession()

        if (!data?.user) return

        setUser({
          name: data.user.name || "Job Seeker",
          email: data.user.email || "",
        })

        if (data.user.email) {
          const result = await getMyApplications(data.user.email)
          setApplications(result)
        }
      } catch (error) {
        console.error("Dashboard error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const pending = applications.filter(
    (app) => !app.status || app.status.toLowerCase() === "pending"
  ).length

  const reviewed = applications.filter(
    (app) => app.status?.toLowerCase() === "reviewed"
  ).length

  const accepted = applications.filter(
    (app) => app.status?.toLowerCase() === "accepted"
  ).length

  const getStatusStyle = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      case "rejected":
        return "border-red-500/20 bg-red-500/10 text-red-400"
      case "reviewed":
        return "border-blue-500/20 bg-blue-500/10 text-blue-400"
      default:
        return "border-amber-500/20 bg-amber-500/10 text-amber-400"
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101B2B] text-slate-400">
        Loading your dashboard...
      </div>
    )
  }

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      description: "All submitted applications",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Pending",
      value: pending,
      description: "Waiting for review",
      icon: Clock3,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "Reviewed",
      value: reviewed,
      description: "Reviewed by recruiters",
      icon: BriefcaseBusiness,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Accepted",
      value: accepted,
      description: "Successful applications",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ]

  return (
    <main className="min-h-screen bg-[#101B2B] px-4 py-7 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Welcome Section */}
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-[#344459] bg-gradient-to-br from-[#1B3048] via-[#172538] to-[#142235] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Seeker Dashboard
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back, {user.name.split(" ")[0]}!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Your next opportunity could be just around the corner.
                Explore jobs, manage your applications and move your career forward.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <UserRound size={16} />
                  {user.name}
                </span>
                <span className="hidden text-slate-600 sm:inline">•</span>
                <span>{user.email}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/browse-jobs")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-500"
            >
              <Search size={17} />
              Explore Jobs
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-9">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Application Overview</h2>
            <p className="mt-1 text-sm text-slate-400">
              Track the progress of your job applications.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-[#344459] bg-[#172538] p-5 transition hover:border-slate-500/70"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">{stat.title}</p>
                    <div className={`rounded-xl p-2.5 ${stat.bg} ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="mt-4 text-3xl font-bold tabular-nums">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    {stat.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Main Content */}
        <section className="grid gap-6 xl:grid-cols-3">

          {/* Recent Applications */}
          <div className="xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent Applications</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Your latest submitted applications.
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard/seeker/applications")}
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
              >
                View All
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#344459] bg-[#172538]">
              {applications.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <BriefcaseBusiness size={25} />
                  </div>

                  <h3 className="font-semibold">No applications yet</h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
                    Start exploring opportunities and submit your first job application.
                  </p>

                  <button
                    onClick={() => router.push("/browse-jobs")}
                    className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-emerald-500"
                  >
                    Browse Jobs
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#344459]">
                  {applications.slice(0, 5).map((application) => (
                    <div
                      key={application._id}
                      className="flex flex-col gap-4 p-5 transition hover:bg-[#1C3046] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#101B2B] text-emerald-400">
                          <FileText size={20} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-white">
                            Job Application
                          </h3>
                          <p className="mt-1 truncate text-xs text-slate-400">
                            {application.applicantEmail}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyle(application.status)}`}
                        >
                          {application.status || "Pending"}
                        </span>

                        {application.resume && (
                          <a
                            href={application.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-[#344459] p-2 text-slate-400 transition hover:border-emerald-500/40 hover:text-emerald-400"
                            title="View Resume"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <p className="mt-1 text-sm text-slate-400">
                Manage your career activities.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push("/browse-jobs")}
                className="group flex w-full items-center gap-4 rounded-2xl border border-[#344459] bg-[#172538] p-5 text-left transition hover:border-emerald-500/40 hover:bg-[#1C3046]"
              >
                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                  <Search size={21} />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold">Find Jobs</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Discover new opportunities.
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-400"
                />
              </button>

              <button
                onClick={() => router.push("/dashboard/seeker/applications")}
                className="group flex w-full items-center gap-4 rounded-2xl border border-[#344459] bg-[#172538] p-5 text-left transition hover:border-emerald-500/40 hover:bg-[#1C3046]"
              >
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <FileText size={21} />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold">My Applications</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Review your submitted applications.
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-400"
                />
              </button>

              <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-[#172538] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Send size={19} />
                </div>

                <h3 className="font-semibold">Keep Moving Forward</h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Stay active, explore opportunities and take the next step in your career.
                </p>

                <button
                  onClick={() => router.push("/browse-jobs")}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Explore opportunities
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
