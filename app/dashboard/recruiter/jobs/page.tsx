"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  MapPin,
  CalendarDays,
  Users,
  Pencil,
  Trash2,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const jobs = [
  {
    id: 4,
    title: "Full Stack Developer",
    company: "DevStudio",
    category: "Full Stack Development",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "$900 - $1400",
    applications: 12,
    status: "Expired",
    deadline: "Oct 25, 2026",
  },
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    category: "Software Development",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "$800 - $1200",
    applications: 24,
    status: "Active",
    deadline: "Nov 25, 2026",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    category: "UI/UX Design",
    location: "Remote",
    type: "Remote",
    salary: "$600 - $900",
    applications: 18,
    status: "Active",
    deadline: "Nov 20, 2026",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "CodeWave",
    category: "Backend Development",
    location: "Chittagong",
    type: "Full Time",
    salary: "$1000 - $1500",
    applications: 0,
    status: "Draft",
    deadline: "Dec 05, 2026",
  },
]

const ManageJobsPage = () => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())

    const matchesFilter = filter === "All" || job.status === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-[#101B2B] p-4 text-white md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Manage Jobs</h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage, track and organize all your job postings.
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#344459] bg-[#172538] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Total Jobs</p>
              <BriefcaseBusiness className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="mt-3 text-3xl font-bold">12</h2>
            <p className="mt-1 text-xs text-slate-500">All posted jobs</p>
          </div>

          <div className="rounded-xl border border-[#344459] bg-[#172538] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Active Jobs</p>
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="mt-3 text-3xl font-bold">08</h2>
            <p className="mt-1 text-xs text-slate-500">Currently published</p>
          </div>

          <div className="rounded-xl border border-[#344459] bg-[#172538] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Draft Jobs</p>
              <FileText className="h-5 w-5 text-amber-400" />
            </div>
            <h2 className="mt-3 text-3xl font-bold">04</h2>
            <p className="mt-1 text-xs text-slate-500">Not published yet</p>
          </div>

          <div className="rounded-xl border border-[#344459] bg-[#172538] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Applications</p>
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="mt-3 text-3xl font-bold">156</h2>
            <p className="mt-1 text-xs text-slate-500">Total applicants</p>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="rounded-xl border border-[#344459] bg-[#172538]">
          <div className="flex flex-col justify-between gap-4 border-b border-[#344459] p-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold">Your Job Listings</h2>
              <p className="mt-1 text-sm text-slate-400">
                View and manage your published jobs.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-[#344459] bg-[#101B2B] pl-9 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="flex gap-2">
                {["All", "Active","Expired", "Draft"].map((item) => (
                  <Button
                    key={item}
                    size="sm"
                    variant="outline"
                    onClick={() => setFilter(item)}
                    className={
                      filter === item
                        ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
                        : "border-[#344459] bg-[#101B2B] text-slate-300 hover:bg-[#26364B]"
                    }
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4 p-5">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg border border-[#344459] bg-[#101B2B] p-5 transition hover:border-emerald-600/60"
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold">{job.title}</h3>

                        <Badge
                          className={
                            job.status === "Active"
                              ? "border-0 bg-emerald-500/15 text-emerald-400"
                              : "border-0 bg-amber-500/15 text-amber-400"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                        <span>{job.company}</span>
                        <span>{job.category}</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                        <span>{job.type}</span>
                        <span>{job.salary}</span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {job.applications} Applications
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />
                          {job.deadline}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/recruiter/jobs/${job.id}/edit`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#344459] bg-[#172538] text-slate-300 hover:bg-[#26364B]"
                        >
                          <Pencil className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <Clock className="mx-auto h-10 w-10 text-slate-500" />
                <h3 className="mt-3 font-semibold">No jobs found</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Try another search or filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageJobsPage
