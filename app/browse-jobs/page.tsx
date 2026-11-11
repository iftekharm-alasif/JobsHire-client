
import React from "react";
import SearchBar from "@/components/SearchBar";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  SlidersHorizontal,
} from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type Job = {
  _id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  type: string;
  workplace: string;
  salary: string;
  deadline: string;
};

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
];

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const search = await searchParams;

  const getValue = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value || "";

  const keyword = getValue(search.search);
  const category = getValue(search.category);
  const location = getValue(search.location);
  const type = getValue(search.type);
  const workplace = getValue(search.workplace);
  const requirements = getValue(search.requirements);

  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (location) params.set("location", location);
  if (type) params.set("type", type);
  if (workplace) params.set("workplace", workplace);
  if (requirements) params.set("requirements", requirements);

  const res = await fetch(`${BASE_URL}/jobs?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const allJobs: Job[] = await res.json();

const jobs = allJobs;

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
          <aside className="h-fit rounded-xl border border-[#344459] bg-[#172538] p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <SlidersHorizontal size={19} />
                Filters
              </h2>

              <a
                href="/browse-jobs"
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                Clear All
              </a>
            </div>

            <form action="/browse-jobs" method="GET" className="space-y-6">

              {/* Keep Search */}
              <input type="hidden" name="search" value={keyword} />

              {/* Category */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Job Category
                </label>

                <select
                  name="category"
                  defaultValue={category}
                  className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-3 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500"
                >
                  <option value="">All Categories</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Location
                </label>

                <div className="flex items-center rounded-lg border border-[#344459] bg-[#101B2B] px-3">
                  <MapPin size={17} className="text-slate-500" />

                  <input
                    name="location"
                    defaultValue={location}
                    placeholder="Enter location"
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Job Type
                </label>

                <select
                  name="type"
                  defaultValue={type}
                  className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-3 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500"
                >
                  <option value="">All Types</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Workplace */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Workplace
                </label>

                <select
                  name="workplace"
                  defaultValue={workplace}
                  className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-3 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500"
                >
                  <option value="">All Workplaces</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Skills / Requirements
                </label>

                <input
                  name="requirements"
                  defaultValue={requirements}
                  placeholder="e.g. React, Node.js"
                  className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-3 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 py-3 font-semibold transition hover:bg-emerald-700"
              >
                Apply Filters
              </button>
            </form>
          </aside>

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

                      <span className="h-fit w-fit rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                        {job.type}
                      </span>
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

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#344459] pt-4">
                      <div>
                        <p className="text-xs text-slate-500">Salary</p>
                        <p className="mt-1 font-semibold text-emerald-400">
                          {job.salary || "Not specified"}
                        </p>
                      </div>

                      <span className="rounded-md bg-[#101B2B] px-3 py-2 text-xs text-slate-300">
                        {job.category}
                      </span>
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
