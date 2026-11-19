"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Users,
  Mail,
  CalendarDays,
  CheckCircle2,
  XCircle,
  FileText,
  Eye,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { getJobApplicants, reviewApplication } from "@/lib/actions/jobs"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Applicant = {
  _id: string
  applicantEmail?: string
  applicantName?: string
  name?: string
  status?: string
  appliedAt?: string
  [key: string]: any
}

const hiddenFields = [
  "_id",
  "jobId",
  "jobTitle",
  "company",
  "recruiterId",
  "recruiterEmail",
  "recruiterName",
  "status",
  "appliedAt",
  "applicantEmail",
  "applicantName",
  "name",
]

const ApplicantsPage = () => {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const { data: session, isPending } = authClient.useSession()

  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [totalApplicants, setTotalApplicants] = useState(0)
  const [jobTitle, setJobTitle] = useState("Job Applicants")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [reviewingId, setReviewingId] = useState("")

  const recruiterId = session?.user?.id

  useEffect(() => {
    if (isPending) return

    if (!recruiterId) {
      setLoading(false)
      setError("Please sign in to view applicants.")
      return
    }

    const fetchApplicants = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getJobApplicants(jobId, recruiterId)

        setApplicants(data.applicants || [])
        setTotalApplicants(data.totalApplicants || 0)

        if (data.applicants?.[0]?.jobTitle) {
          setJobTitle(data.applicants[0].jobTitle)
        }
      } catch (err) {
        console.error("Fetch Applicants Error:", err)
        setError(
          err instanceof Error ? err.message : "Failed to load applicants."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchApplicants()
  }, [jobId, recruiterId, isPending])

  const handleReview = async (
    applicationId: string,
    status: "Shortlisted" | "Rejected"
  ) => {
    if (!recruiterId) return

    try {
      setReviewingId(applicationId)

      await reviewApplication(applicationId, recruiterId, status)

      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === applicationId ? { ...applicant, status } : applicant
        )
      )
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to review application."
      )
    } finally {
      setReviewingId("")
    }
  }

  const formatLabel = (value: string) => {
    return value
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  }

  const renderValue = (key: string, value: any) => {
    if (value === null || value === undefined || value === "") {
      return null
    }

    const isLink =
      typeof value === "string" &&
      /^https?:\/\//i.test(value) &&
      /(resume|cv|portfolio|linkedin|website|document|file)/i.test(key)

    if (isLink) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-emerald-400 underline hover:text-emerald-300"
        >
          View {formatLabel(key)}
        </a>
      )
    }

    const displayValue =
      typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)

    return (
      <p className="text-sm break-words whitespace-pre-wrap text-slate-300">
        {displayValue}
      </p>
    )
  }

  return (
    <div className="min-h-screen space-y-6 bg-[#101B2B] p-4 text-white sm:p-6 lg:p-8">
      <div>
        <Link
          href="/dashboard/recruiter/jobs"
          className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Manage Jobs
        </Link>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Applicants</h1>
            <p className="mt-2 text-sm text-slate-400">
              Review applications for {jobTitle}.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#344459] bg-[#172538] px-4 py-3">
            <Users className="h-5 w-5 text-emerald-400" />
            <span className="font-semibold">{totalApplicants} Applicants</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-[#344459] bg-[#172538] py-16 text-center text-slate-400">
          Loading applicants...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-[#172538] py-12 text-center">
          <p className="text-red-400">{error}</p>
          <Button
            onClick={() => router.refresh()}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700"
          >
            Try Again
          </Button>
        </div>
      ) : applicants.length === 0 ? (
        <div className="rounded-xl border border-[#344459] bg-[#172538] py-16 text-center">
          <Users className="mx-auto h-12 w-12 text-slate-500" />
          <h2 className="mt-4 text-lg font-semibold">No applicants yet</h2>
          <p className="mt-2 text-sm text-slate-400">
            Applicants will appear here when someone applies for this job.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {applicants.map((applicant, index) => {
            const applicantName =
              applicant.applicantName || applicant.name || "Applicant"

            const applicantEmail =
              applicant.applicantEmail || "Email not provided"

            const status = applicant.status || "Pending"

            return (
              <div
                key={applicant._id}
                className="rounded-xl border border-[#344459] bg-[#172538] p-5"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold">
                        {index + 1}. {applicantName}
                      </h2>

                      <Badge
                        className={`border-0 ${
                          status === "Shortlisted"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : status === "Rejected"
                              ? "bg-red-500/15 text-red-400"
                              : "bg-amber-500/15 text-amber-400"
                        }`}
                      >
                        {status}
                      </Badge>
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <Mail className="h-4 w-4" />
                      {applicantEmail}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <CalendarDays className="h-4 w-4" />
                      Applied:{" "}
                      {applicant.appliedAt
                        ? new Date(applicant.appliedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "Date unavailable"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#344459] pt-5">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <FileText className="h-4 w-4 text-emerald-400" />
                    Application Details
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(applicant)
                      .filter(
                        ([key, value]) =>
                          !hiddenFields.includes(key) &&
                          value !== null &&
                          value !== undefined &&
                          value !== ""
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="rounded-lg border border-[#344459] bg-[#101B2B] p-4"
                        >
                          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                            {formatLabel(key)}
                          </p>

                          {renderValue(key, value)}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    disabled={
                      status === "Shortlisted" || reviewingId === applicant._id
                    }
                    onClick={() => handleReview(applicant._id, "Shortlisted")}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {reviewingId === applicant._id
                      ? "Updating..."
                      : "Shortlist for Interview"}
                  </Button>

                  <Button
                    disabled={
                      status === "Rejected" || reviewingId === applicant._id
                    }
                    onClick={() => handleReview(applicant._id, "Rejected")}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ApplicantsPage
