
"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function SaveJobButton({ jobId }: { jobId: string }) {
  const { data: session } = authClient.useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;

    const checkSavedJob = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/saved-jobs?email=${encodeURIComponent(email)}`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const data = await res.json();

        const alreadySaved = data.some(
          (job: { _id?: string; jobId?: string }) =>
            job.jobId === jobId || job._id === jobId
        );

        setSaved(alreadySaved);
      } catch (error) {
        console.error(error);
      }
    };

    checkSavedJob();
  }, [email, jobId]);

  const handleSave = async () => {
    if (!email) {
      toast.error("Please sign in to save jobs");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/saved-jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, jobId }),
      });

      if (res.status === 409) {
        setSaved(true);
        toast.info("Job already saved");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to save job");
      }

      setSaved(true);
      toast.success("Job saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      title={saved ? "Saved" : "Save Job"}
      className={`flex size-10 items-center justify-center rounded-lg border transition ${
        saved
          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
          : "border-[#344459] text-slate-400 hover:border-emerald-500 hover:text-emerald-400"
      }`}
    >
      <Bookmark size={19} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
