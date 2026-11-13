
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type Job = {
  _id: string;
  title: string;
  company: string;
};

const SearchBar = ({ defaultValue = "" }: { defaultValue?: string }) => {
  const router = useRouter();

  const [search, setSearch] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Job[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setSearching(true);

        const res = await fetch(
          `${BASE_URL}/jobs?search=${encodeURIComponent(search)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await res.json();

        const jobs: Job[] = Array.isArray(data)
          ? data
          : data.jobs || [];

        setSuggestions(jobs.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Suggestion error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSearching(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  const handleSearch = (value: string) => {
    setShowSuggestions(false);

    if (!value.trim()) {
      router.push("/browse-jobs");
      return;
    }

    router.push(`/browse-jobs?search=${encodeURIComponent(value.trim())}`);
  };

  return (
    <div className="relative mb-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
        className="flex flex-col gap-3 rounded-xl border border-[#344459] bg-[#172538] p-3 md:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 px-3">
          <Search className="text-slate-400" size={21} />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              if (search.trim()) setShowSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 150);
            }}
            placeholder="Job title or company name..."
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-8 py-3 font-semibold transition hover:bg-emerald-700"
        >
          Search Jobs
        </button>
      </form>

      {showSuggestions && search.trim() && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#344459] bg-[#172538] shadow-xl">
          {searching ? (
            <p className="px-5 py-4 text-sm text-slate-400">
              Searching...
            </p>
          ) : suggestions.length > 0 ? (
            suggestions.map((job) => (
              <button
                key={job._id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setSearch(job.title);
                  handleSearch(job.title);
                }}
                className="block w-full border-b border-[#344459] px-5 py-3 text-left transition last:border-0 hover:bg-[#24364D]"
              >
                <p className="font-medium text-white">{job.title}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {job.company}
                </p>
              </button>
            ))
          ) : (
            <p className="px-5 py-4 text-sm text-slate-400">
              No matching jobs found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
