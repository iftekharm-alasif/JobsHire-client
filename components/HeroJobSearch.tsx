"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, BriefcaseBusiness } from "lucide-react";

const HeroJobSearch = () => {
const trendingJobs = [
"Product Designer",
"AI Engineering",
"Dev-ops Engineer",
];

return (
<section className="relative overflow-hidden bg-[#090a0f] py-24 lg:py-32 text-white">
{/* Background */}
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-[#090a0f] to-[#090a0f] pointer-events-none" />

  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-600/20 text-amber-500">
        <BriefcaseBusiness className="w-4 h-4" />
      </span>

      <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-300">
        <strong className="text-white">50,000+</strong> NEW JOBS THIS MONTH
      </span>
    </div>

    {/* Heading */}
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
        Find Your Dream Job Today
      </h1>

      <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
        HireLoop connects top talent with world-class companies. Browse
        thousands of curated opportunities and land your next role faster.
      </p>
    </div>

    {/* Search Form */}
    <div className="w-full max-w-3xl bg-slate-900/90 border border-slate-800 p-2 rounded-2xl sm:rounded-full shadow-2xl backdrop-blur-md">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row items-center gap-2"
      >
        {/* Job Input */}
        <div className="flex items-center w-full px-4">
          <Search className="w-5 h-5 text-slate-500 mr-3 shrink-0" />

          <Input
            type="text"
            placeholder="Job title, skill or company"
            className="border-0 bg-transparent text-white placeholder:text-slate-500 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="hidden sm:block h-8 w-px bg-slate-800" />

        {/* Location Input */}
        <div className="flex items-center w-full px-4">
          <MapPin className="w-5 h-5 text-slate-500 mr-3 shrink-0" />

          <Input
            type="text"
            placeholder="Location or Remote"
            className="border-0 bg-transparent text-white placeholder:text-slate-500 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          size="icon"
          className="w-full sm:w-12 h-12 rounded-xl sm:rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shrink-0"
        >
          <Search className="w-5 h-5" />
          <span className="sm:hidden">Search Jobs</span>
        </Button>
      </form>
    </div>

    {/* Trending Jobs */}
    <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-sm">
      <span className="text-slate-500 font-medium">
        Trending Positions
      </span>

      {trendingJobs.map((job) => (
        <Badge
          key={job}
          variant="outline"
          className="bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
        >
          {job}
        </Badge>
      ))}
    </div>

  </div>
</section>

);
};

export default HeroJobSearch;