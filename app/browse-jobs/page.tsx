import React from "react"
import SearchBar from "@/components/SearchBar"
import JobFilters from "@/components/JobFilters"
import SaveJobButton from "@/components/SaveJobButton"

import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

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
}

const categories = [
  "Software Development",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Web Development",
  "UI/UX Design",
  "Mobile App Development",
  "Data Science",
  "DevOps & Cloud Engineering",
]

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) => {
  const search = await searchParams

  const getValue = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value || ""

  const keyword = getValue(search.search)
  const category = getValue(search.category)
  const location = getValue(search.location)
  const type = getValue(search.type)
  const workplace = getValue(search.workplace)
  const requirements = getValue(search.requirements)

  const page = Math.max(1, Number(getValue(search.page)) || 1)

  const params = new URLSearchParams()

  if (keyword) params.set("search", keyword)
  if (category) params.set("category", category)
  if (location) params.set("location", location)
  if (type) params.set("type", type)
  if (workplace) params.set("workplace", workplace)
  if (requirements) params.set("requirements", requirements)

  params.set("page", String(page))

  const res = await fetch(`${BASE_URL}/jobs?${params.toString()}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch jobs")
  }

  const data = await res.json()

  const jobs: Job[] = data.jobs
  const totalJobs: number = data.totalJobs
  const totalPages: number = data.totalPages
  const currentPage: number = data.currentPage

  return (
    <div className="min-h-screen bg-[#101B2B] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-emerald-400">
            FIND YOUR NEXT OPPORTUNITY
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Find Your Dream Job
          </h1>

          <p className="mt-3 text-slate-400">
            Explore opportunities and find the perfect job for your career.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar defaultValue={keyword} />

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
          {/* Sidebar */}
          <JobFilters />

          {/* Job Listings */}
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Available Jobs</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {jobs.length} jobs found
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="rounded-xl border border-[#344459] bg-[#172538] p-5 transition hover:border-emerald-500/60 md:p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div>
                        <h3 className="text-lg font-semibold transition hover:text-emerald-400">
                          {job.title}
                        </h3>

                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                          <Building2 size={16} />
                          {job.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="h-fit w-fit rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                          {job.type}
                        </span>

                        <SaveJobButton jobId={job._id} />
                      </div>
                    </div>

                    <div className="my-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-2">
                        <BriefcaseBusiness size={16} />
                        {job.workplace}
                      </span>

                      <span className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        Deadline: {job.deadline}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#344459] pt-5">
                      <div>
                        <p className="text-xs text-slate-500">
                          Interested in this role?
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-300">
                          Explore job details
                        </p>
                      </div>

                      <Link
                        href={`/browse-jobs/${job._id}`}
                        className="group inline-flex items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
                      >
                        View Details
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-[#344459] bg-[#172538] px-5 py-16 text-center">
                  <Search className="mx-auto mb-4 text-slate-500" size={35} />

                  <h3 className="text-lg font-semibold">No Jobs Found</h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Try changing your search or filters.
                  </p>

                  <a
                    href="/browse-jobs"
                    className="mt-5 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium hover:bg-emerald-700"
                  >
                    Clear Filters
                  </a>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#344459] pt-6 sm:flex-row">
                <p className="text-sm text-slate-400">
                  Showing {(currentPage - 1) * 20 + 1} -{" "}
                  {Math.min(currentPage * 20, totalJobs)} of {totalJobs} jobs
                </p>

                <div className="flex items-center gap-2">
                  <a
                    href={`/browse-jobs?${new URLSearchParams({
                      ...Object.fromEntries(params.entries()),
                      page: String(currentPage - 1),
                    }).toString()}`}
                    aria-disabled={currentPage === 1}
                    className={`flex items-center gap-1 rounded-lg border border-[#344459] px-3 py-2 text-sm transition ${
                      currentPage === 1
                        ? "pointer-events-none opacity-40"
                        : "hover:border-emerald-500 hover:bg-emerald-500/10"
                    }`}
                  >
                    <ChevronLeft size={17} />
                    Previous
                  </a>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <a
                      key={pageNumber}
                      href={`/browse-jobs?${new URLSearchParams({
                        ...Object.fromEntries(params.entries()),
                        page: String(pageNumber),
                      }).toString()}`}
                      className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                        currentPage === pageNumber
                          ? "bg-emerald-600 text-white"
                          : "border border-[#344459] text-slate-300 hover:border-emerald-500 hover:text-emerald-400"
                      }`}
                    >
                      {pageNumber}
                    </a>
                  ))}

                  <a
                    href={`/browse-jobs?${new URLSearchParams({
                      ...Object.fromEntries(params.entries()),
                      page: String(currentPage + 1),
                    }).toString()}`}
                    aria-disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 rounded-lg border border-[#344459] px-3 py-2 text-sm transition ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-40"
                        : "hover:border-emerald-500 hover:bg-emerald-500/10"
                    }`}
                  >
                    Next
                    <ChevronRight size={17} />
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default BrowseJobs
