
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Send } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { applyToAJob } from "@/lib/actions/applications"

const ApplyJobPage = () => {
  const router = useRouter()
  const params = useParams()
  const jobId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    phone: "",
    resume: "",
    coverLetter: "",
  })

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: sessionData } = await authClient.getSession()

        if (!sessionData?.user) {
          router.push(
            `/sign-in?redirect=${encodeURIComponent(`/apply-job/${jobId}`)}`
          )
          return
        }

        if (sessionData.user.role !== "seeker") {
          toast.error("Only job seekers can submit job applications.")
          router.push("/browse-jobs")
          return
        }

        setFormData((prev) => ({
          ...prev,
          applicantName: sessionData.user.name || "",
          applicantEmail: sessionData.user.email || "",
        }))
      } catch {
        toast.error("Unable to verify your account. Please sign in again.")
        router.push("/sign-in")
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [jobId, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      await applyToAJob({
        jobId,
        ...formData,
      })

      toast.success("Your job application has been submitted successfully!")

      router.push("/browse-jobs")
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit your application. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101B2B] text-slate-300">
        Verifying your account...
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-[#101B2B] px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Submit Your Application
          </h1>

          <p className="mt-3 text-slate-400">
            Complete the form below to apply for this job opportunity.
          </p>
        </div>

        <div className="rounded-2xl border border-[#344459] bg-[#172538] p-6 shadow-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="applicantName" className="text-sm font-medium">
                Full Name
              </label>

              <input
                id="applicantName"
                name="applicantName"
                type="text"
                value={formData.applicantName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-4 py-3 outline-none focus:border-emerald-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="applicantEmail" className="text-sm font-medium">
                Email Address
              </label>

              <input
                id="applicantEmail"
                name="applicantEmail"
                type="email"
                value={formData.applicantEmail}
                readOnly
                className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-4 py-3 text-slate-400 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="resume" className="text-sm font-medium">
                Resume URL
              </label>

              <input
                id="resume"
                name="resume"
                type="url"
                value={formData.resume}
                onChange={handleChange}
                required
                placeholder="https://example.com/your-resume.pdf"
                className="w-full rounded-lg border border-[#344459] bg-[#101B2B] px-4 py-3 outline-none focus:border-emerald-500"
              />

              <p className="text-xs text-slate-400">
                Paste a publicly accessible link to your resume.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="coverLetter" className="text-sm font-medium">
                Cover Letter
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell the recruiter why you are a good fit for this position..."
                className="w-full resize-none rounded-lg border border-[#344459] bg-[#101B2B] px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}

              {!isSubmitting && <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ApplyJobPage
