"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  MapPin,
  CalendarDays,
  Users,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react"
import { toast } from "sonner"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getJobs, deleteJob } from "@/lib/actions/jobs"
import { DeleteJobDialog } from "@/components/DeleteJobDialog"
import { authClient } from "@/lib/auth-client"
import { getRecruiterJobs } from "@/lib/actions/jobs"

type Job = {
  _id: string
  title: string
  company: string
  category: string
  location: string
  type?: string
  jobType?: string
  workplace: string
  salary: string
  applications?: number
  status?: string
  deadline: string
}

type JobsResponse = {
  jobs: Job[]
  totalJobs: number
  totalPages: number
  currentPage: number
}

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)
  const { data: session, isPending } = authClient.useSession()
  useEffect(() => {
    const fetchJobs = async () => {
      if (isPending) return

      if (!session?.user?.id) {
        setJobs([])
        setTotalJobs(0)
        setTotalPages(1)
        return
      }

      try {
        setLoading(true)

        const data = await getRecruiterJobs(currentPage, session.user.id)

        setJobs(data.jobs || [])
        setTotalJobs(data.totalJobs || 0)
        setTotalPages(data.totalPages || 1)
      } catch (error) {
        console.error("Fetch Recruiter Jobs Error:", error)
        toast.error("Failed to load your jobs")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [currentPage, session?.user?.id, isPending])

  const handleJobDeleted = (id: string) => {
    setJobs((prev) => prev.filter((job) => job._id !== id))
    setTotalJobs((prev) => Math.max(0, prev - 1))

    // Move to previous page if the current page becomes empty
    if (jobs.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    } else {
      // Refresh the current page
      setCurrentPage((prev) => prev)
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === "All" || (job.status || "Active") === filter

    return matchesSearch && matchesFilter
  })

  const activeJobs = jobs.filter(
    (job) => (job.status || "Active") === "Active"
  ).length

  const draftJobs = jobs.filter((job) => job.status === "Draft").length

  const totalApplications = jobs.reduce(
    (total, job) => total + (Number(job.applications) || 0),
    0
  )

  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: BriefcaseBusiness,
      color: "text-blue-400",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: CheckCircle2,
      color: "text-emerald-400",
    },
    {
      title: "Draft Jobs",
      value: draftJobs,
      icon: FileText,
      color: "text-amber-400",
    },
    {
      title: "Applications",
      value: totalApplications,
      icon: Users,
      color: "text-purple-400",
    },
  ]

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen space-y-8 bg-[#101B2B] p-4 text-white sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Manage Jobs</h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage and track all your job postings in one place.
          </p>
        </div>

        <Link href="/dashboard/recruiter/jobs/new">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-[#344459] bg-[#172538] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{stat.title}</p>

              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>

            <h2 className="mt-3 text-3xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Job Listings */}
      <div className="rounded-xl border border-[#344459] bg-[#172538]">
        <div className="border-b border-[#344459] p-5">
          <h2 className="text-lg font-semibold">Your Job Postings</h2>

          <p className="mt-1 text-sm text-slate-400">
            View, search and manage your published jobs.
          </p>

          {/* Search */}
          <div className="relative mt-5">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              placeholder="Search by job title or company..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="border-[#344459] bg-[#101B2B] pl-10 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Filters */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["All", "Active", "Expired", "Draft"].map((item) => (
              <Button
                key={item}
                size="sm"
                onClick={() => handleFilterChange(item)}
                className={
                  filter === item
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "border border-[#344459] bg-transparent text-slate-400 hover:bg-[#26384D] hover:text-white"
                }
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Jobs */}
        <div className="space-y-4 p-5">
          {loading ? (
            <p className="py-12 text-center text-slate-400">Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="rounded-xl border border-[#344459] bg-[#101B2B] p-5 transition hover:border-emerald-600/50"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold">{job.title}</h3>

                      <Badge
                        className={`border-0 ${
                          (job.status || "Active") === "Active"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : job.status === "Draft"
                              ? "bg-amber-500/15 text-amber-400"
                              : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {job.status || "Active"}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-400">
                      {job.company} · {job.category}
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-4 w-4" />
                        {job.jobType || job.type || "Not specified"}
                      </span>

                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {job.workplace}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-5 text-sm">
                      <span className="text-emerald-400">{job.salary}</span>

                      <span className="flex items-center gap-2 text-slate-400">
                        <Users className="h-4 w-4" />
                        {job.applications || 0} Applications
                      </span>

                      <span className="flex items-center gap-2 text-slate-400">
                        <CalendarDays className="h-4 w-4" />
                        Deadline:{" "}
                        {job.deadline
                          ? new Date(
                              `${job.deadline}T00:00:00`
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Not set"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/dashboard/recruiter/jobs/${job._id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300 hover:bg-amber-100"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>

                    <Link
                      href={`/dashboard/recruiter/jobs/${job._id}/applications`}
                    >
                      <Button
                        size="sm"
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Applicants ({job.applications || 0})
                      </Button>
                    </Link>

                    <DeleteJobDialog job={job} onDeleted={handleJobDeleted} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <BriefcaseBusiness className="mx-auto h-10 w-10 text-slate-500" />

              <h3 className="mt-4 font-semibold">No jobs found</h3>

              <p className="mt-2 text-sm text-slate-400">
                Try another search or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="border-[#344459] bg-transparent text-white hover:bg-[#26384D]"
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                variant="outline"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
                    : "border-[#344459] bg-transparent text-white hover:bg-[#26384D]"
                }
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="border-[#344459] bg-transparent text-white hover:bg-[#26384D]"
          >
            Next
          </Button>
        </div>
      )}

      {/* Results Count */}
      <p className="text-center text-sm text-slate-500">
        Showing {filteredJobs.length} jobs on this page · {totalJobs} total jobs
      </p>
    </div>
  )
}

export default ManageJobsPage
