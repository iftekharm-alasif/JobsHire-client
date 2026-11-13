
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Send } from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { getMyApplications } from "@/lib/actions/applications"

const ApplyButton = ({ jobId }: { jobId: string }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = async () => {
    setIsLoading(true)

    try {
      const { data: sessionData } = await authClient.getSession()

      if (!sessionData?.user) {
        toast.info("Please sign in to your account before applying for this job.")

        router.push(
          `/sign-in?redirect=${encodeURIComponent(`/apply-job/${jobId}`)}`
        )
        return
      }

      const user = sessionData.user
      const userRole = user.role

      if (userRole === "recruiter") {
        toast.error(
          "Recruiters cannot apply for jobs. Please use a job seeker account."
        )
        return
      }

      if (userRole === "admin") {
        toast.error(
          "Admin accounts cannot apply for jobs. Please use a job seeker account."
        )
        return
      }

      if (userRole !== "seeker") {
        toast.error(
          "Your account does not have permission to apply for this job."
        )
        return
      }

      const applications = await getMyApplications(user.email)

      if (applications.length >= 10) {
        toast.error(
          "Application Limit Reached! You have already submitted 10 applications."
        )
        return
      }

      const alreadyApplied = applications.some(
        (application: { jobId: string }) =>
          String(application.jobId) === String(jobId)
      )

      if (alreadyApplied) {
        toast.error("You have already applied for this job!")
        return
      }

      router.push(`/apply-job/${jobId}`)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "We couldn't verify your account. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleApply}
      disabled={isLoading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? "Please wait..." : "Apply Now"}
      {!isLoading && <Send size={17} />}
    </button>
  )
}

export default ApplyButton
