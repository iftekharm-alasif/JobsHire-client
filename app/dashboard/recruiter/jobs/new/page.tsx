"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  CalendarDays,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { createJob } from "@/lib/actions/jobs"

const AddJobPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    company: "",
    category: "",
    jobType: "",
    workplace: "",
    location: "",
    salary: "",
    deadline: "",
    description: "",
    requirements: "",
  })

  const updateForm = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await createJob(form)

      toast.success("Job published successfully!")

      setTimeout(() => {
        router.push("/dashboard/recruiter/jobs")
      }, 1000)
    } catch (error) {
      toast.error("Failed to publish job!")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#101B2B] p-4 text-slate-100 md:p-8">
      <div className="mx-auto max-w-5xl space-y-7">
        {/* Header */}
        <div>
          <p className="mb-2 text-sm text-emerald-400">
            Recruiter Dashboard / Jobs
          </p>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Create a New Job
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Fill in the details below to publish a new job opportunity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="rounded-xl border border-[#344459] bg-[#172538] p-5 md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <BriefcaseBusiness className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="font-semibold">Basic Information</h2>
                <p className="text-xs text-slate-400">
                  Add the basic details of your job.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label>Job Title</Label>
                <Input
                  required
                  placeholder="e.g. Senior Frontend Developer"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  className="border-[#344459] bg-[#101B2B] text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label>Company Name</Label>
                <div className="relative">
                  <Building2 className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    required
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => updateForm("company", e.target.value)}
                    className="border-[#344459] bg-[#101B2B] pl-10 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => updateForm("category", value)}
                  required
                >
                  <SelectTrigger className="border-[#344459] bg-[#101B2B] text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Software Development",
                      "Frontend Development",
                      "Backend Development",
                      "Full Stack Development",
                      "Mobile App Development",
                      "Web Development",
                      "UI/UX Design",
                      "Software Testing & QA",
                      "DevOps & Cloud Engineering",
                      "Cybersecurity",
                      "Data Science",
                      "Artificial Intelligence & Machine Learning",
                      "Database Administration",
                      "Networking & IT Support",
                      "Embedded Systems & IoT",
                      "Game Development",
                      "Product Management",
                      "Technical Writing",
                      "Other",
                    ].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Job Type</Label>
                <Select
                  value={form.jobType}
                  onValueChange={(value) => updateForm("jobType", value)}
                  required
                >
                  <SelectTrigger className="border-[#344459] bg-[#101B2B] text-white">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Full-time",
                      "Part-time",
                      "Internship",
                      "Contract",
                      "Freelance",
                    ].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location & Compensation */}
          <div className="rounded-xl border border-[#344459] bg-[#172538] p-5 md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <MapPin className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="font-semibold">Location & Compensation</h2>
                <p className="text-xs text-slate-400">
                  Where and how will the candidate work?
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Workplace Type</Label>
                <Select
                  value={form.workplace}
                  onValueChange={(value) => updateForm("workplace", value)}
                  required
                >
                  <SelectTrigger className="border-[#344459] bg-[#101B2B] text-white">
                    <SelectValue placeholder="Select workplace" />
                  </SelectTrigger>
                  <SelectContent>
                    {["On-site", "Remote", "Hybrid"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  required
                  placeholder="e.g. Dhaka, Bangladesh"
                  value={form.location}
                  onChange={(e) => updateForm("location", e.target.value)}
                  className="border-[#344459] bg-[#101B2B] text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Salary Range</Label>
                <div className="relative">
                  <Wallet className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    placeholder="e.g. 40,000 - 60,000 BDT"
                    value={form.salary}
                    onChange={(e) => updateForm("salary", e.target.value)}
                    className="border-[#344459] bg-[#101B2B] pl-10 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline & Description */}
          <div className="rounded-xl border border-[#344459] bg-[#172538] p-5 md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <CalendarDays className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="font-semibold">Timeline & Description</h2>
                <p className="text-xs text-slate-400">
                  Set the deadline and explain the opportunity.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Application Deadline</Label>
                <Input
                  required
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.deadline}
                  onChange={(e) => updateForm("deadline", e.target.value)}
                  className="border-[#344459] bg-[#101B2B] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  required
                  rows={5}
                  placeholder="Describe the job role and responsibilities..."
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  className="resize-none border-[#344459] bg-[#101B2B] text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label>Requirements</Label>
                <Textarea
                  required
                  rows={4}
                  placeholder="List the skills and qualifications required..."
                  value={form.requirements}
                  onChange={(e) => updateForm("requirements", e.target.value)}
                  className="resize-none border-[#344459] bg-[#101B2B] text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              className="border-[#344459] bg-transparent text-slate-300 hover:bg-[#172538] hover:text-white"
              onClick={() =>
                setForm({
                  title: "",
                  company: "",
                  category: "",
                  jobType: "",
                  workplace: "",
                  location: "",
                  salary: "",
                  deadline: "",
                  description: "",
                  requirements: "",
                })
              }
            >
              Clear Form
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 px-8 text-white hover:bg-emerald-700"
            >
              {loading ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJobPage
