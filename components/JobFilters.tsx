
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPin, SlidersHorizontal } from "lucide-react";

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

const JobFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const [requirements, setRequirements] = useState(
    searchParams.get("requirements") || ""
  );

  const currentParams = searchParams.toString();

  const updateFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(currentParams);

      if (location.trim()) {
        params.set("location", location.trim());
      } else {
        params.delete("location");
      }

      if (requirements.trim()) {
        params.set("requirements", requirements.trim());
      } else {
        params.delete("requirements");
      }

      const query = params.toString();

      if (query !== currentParams) {
        router.push(query ? `${pathname}?${query}` : pathname);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [location, requirements, currentParams, pathname, router]);

  return (
    <aside className="h-fit rounded-xl border border-[#344459] bg-[#172538] p-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <SlidersHorizontal size={19} />
          Filters
        </h2>

        <button
          type="button"
          onClick={() => {
            setLocation("");
            setRequirements("");
            router.push("/browse-jobs");
          }}
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-3 block text-sm font-medium">
            Job Category
          </label>

          <select
            value={searchParams.get("category") || ""}
            onChange={(e) => updateFilter("category", e.target.value)}
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

        <div>
          <label className="mb-3 block text-sm font-medium">
            Location
          </label>

          <div className="flex items-center rounded-lg border border-[#344459] bg-[#101B2B] px-3">
            <MapPin size={17} className="text-slate-500" />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium">
            Job Type
          </label>

          <select
            value={searchParams.get("type") || ""}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-3 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500"
          >
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium">
            Workplace
          </label>

          <select
            value={searchParams.get("workplace") || ""}
            onChange={(e) => updateFilter("workplace", e.target.value)}
            className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-3 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500"
          >
            <option value="">All Workplaces</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium">
            Skills / Requirements
          </label>

          <input
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. React, Node.js"
            className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-3 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-emerald-500"
          />
        </div>
      </div>
    </aside>
  );
};

export default JobFilters;
