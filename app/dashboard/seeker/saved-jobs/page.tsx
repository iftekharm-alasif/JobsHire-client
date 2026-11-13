"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Bookmark,
  MapPin,
  BriefcaseBusiness,
  Building2,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

type Job = {
  _id: string
  savedId: string
  title: string
  company: string
  category: string
  location: string
  type: string
  workplace: string
  salary: string
  deadline: string
}

export default function SavedJobsPage() {
  const { data: session, isPending } = authClient.useSession()

  const [savedJobs, setSavedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const email = session?.user?.email

  useEffect(() => {
    if (isPending) return

    if (!email) {
      setLoading(false)
      return
    }

    const fetchSavedJobs = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/saved-jobs?email=${encodeURIComponent(email)}`,
          { cache: "no-store" }
        )

        if (!res.ok) {
          throw new Error("Failed to fetch saved jobs")
        }

        const data = await res.json()
        setSavedJobs(data)
      } catch (error) {
        console.error(error)
        toast.error("Failed to load saved jobs")
      } finally {
        setLoading(false)
      }
    }

    fetchSavedJobs()
  }, [email, isPending])

  const handleRemove = async (savedId: string) => {
    try {
      setRemovingId(savedId)

      const res = await fetch(`${BASE_URL}/saved-jobs/${savedId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to remove saved job")
      }

      setSavedJobs((previousJobs) =>
        previousJobs.filter((job) => job.savedId !== savedId)
      )

      toast.success("Job removed from saved jobs")
    } catch (error) {
      console.error(error)
      toast.error("Failed to remove job")
    } finally {
      setRemovingId(null)
    }
  }

  if (isPending || loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#101B2B] text-slate-300">
        Loading saved jobs...
      </div>
    )
  }

  if (!email) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#101B2B] px-4 text-center text-slate-300">
        Please sign in to view your saved jobs.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#101B2B] px-4 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-emerald-400">
            <Bookmark size={20} />
            <span className="text-sm font-semibold tracking-wide">
              YOUR COLLECTION
            </span>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">Saved Jobs</h1>

          <p className="mt-3 text-slate-400">
            Keep track of the opportunities you are interested in.
          </p>
        </div>

        {/* Job Count */}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-[#344459] bg-[#172538] p-5">
          <div>
            <p className="text-sm text-slate-400">Total Saved Jobs</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {savedJobs.length}
            </p>
          </div>

          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Bookmark size={23} />
          </div>
        </div>

        {/* Saved Jobs List */}
        {savedJobs.length > 0 ? (
          <div className="space-y-5">
            {savedJobs.map((job) => (
              <div
                key={job.savedId}
                className="rounded-xl border border-[#344459] bg-[#172538] p-5 transition hover:border-emerald-500/50 md:p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {job.title}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <Building2 size={16} />
                      {job.company}
                    </p>
                  </div>

                  <span className="h-fit w-fit rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                    {job.type}
                  </span>
                </div>

                <div className="my-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <BriefcaseBusiness size={16} />
                    {job.workplace}
                  </span>

                  {job.salary && <span>{job.salary}</span>}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#344459] pt-5">
                  <p className="text-xs text-slate-500">
                    Deadline: {job.deadline || "Not specified"}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleRemove(job.savedId)}
                      disabled={removingId === job.savedId}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                      {removingId === job.savedId ? "Removing..." : "Remove"}
                    </button>

                    <Link
                      href={`/browse-jobs/${job._id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      View Details
                      <ExternalLink size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#344459] bg-[#172538] px-5 py-16 text-center">
            <Bookmark className="mx-auto mb-4 text-slate-500" size={42} />

            <h2 className="text-xl font-semibold">No Saved Jobs Yet</h2>

            <p className="mt-2 text-sm text-slate-400">
              You haven't saved any jobs. Explore opportunities and bookmark the
              jobs you like.
            </p>

            <Link
              href="/browse-jobs"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Browse Jobs
              <ExternalLink size={15} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
