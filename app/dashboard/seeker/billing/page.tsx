"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  CreditCard,
  Crown,
  Check,
  Zap,
  FileText,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Receipt,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { getMyApplications } from "@/lib/actions/applications"

const BillingPage = () => {
  const [applicationCount, setApplicationCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)


useEffect(() => {
  const fetchBillingData = async () => {
    try {
      const { data: sessionData } = await authClient.getSession()

      if (sessionData?.user?.email) {
        const applications = await getMyApplications(
          sessionData.user.email
        )

        setApplicationCount(applications.length)
      }
    } catch (error) {
      console.error("Billing data error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  fetchBillingData()
}, [])

  const applicationLimit = 10
  const usagePercentage = Math.min(
    (applicationCount / applicationLimit) * 100,
    100
  )

  const [isUpgrading, setIsUpgrading] = useState(false)

const handleUpgrade = async () => {
  try {
    setIsUpgrading(true)

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Unable to start checkout.")
    }

    if (!result.url) {
      throw new Error("Stripe Checkout URL was not received.")
    }

    window.location.assign(result.url)
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Something went wrong."
    )
    setIsUpgrading(false)
  }
}

  return (
    <div className="min-h-screen bg-[#101B2B] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <CreditCard size={16} />
            Account Billing
          </div>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Billing & Subscription
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your subscription, track usage, and explore available plans.
          </p>
        </div>

        {/* Current Plan */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#344459] bg-[#172538] p-6 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                  <Zap size={25} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Current Subscription</p>
                  <h2 className="text-xl font-bold">Free Plan</h2>
                </div>
              </div>

              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
                Active
              </span>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Application Usage</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Your monthly application allowance
                  </p>
                </div>

                <p className="text-sm font-semibold text-white">
                  {isLoading
                    ? "Loading..."
                    : `${applicationCount}/${applicationLimit}`}
                </p>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#101B2B]">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {isLoading
                    ? "Calculating usage..."
                    : `${applicationLimit - Math.min(applicationCount, applicationLimit)} applications remaining`}
                </span>

                <span>{usagePercentage}% used</span>
              </div>
            </div>

            <div className="mt-7 border-t border-[#344459] pt-5">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Check size={17} className="text-emerald-400" />
                Access to job listings
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                <Check size={17} className="text-emerald-400" />
                Maximum 10 job applications
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                <Check size={17} className="text-emerald-400" />
                Basic job seeker dashboard
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#344459] bg-[#172538] p-6">
            <div>
              <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <FileText size={25} />
              </div>

              <h3 className="text-lg font-bold">Application Summary</h3>

              <p className="mt-2 text-sm text-slate-400">
                Keep track of your job application activity.
              </p>

              <div className="mt-6">
                <p className="text-4xl font-bold">
                  {isLoading ? "..." : applicationCount}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Total applications submitted
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-[#101B2B] p-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <ShieldCheck size={17} className="text-emerald-400" />
                Your account is on the Free plan
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Choose Your Plan</h2>
            <p className="mt-2 text-sm text-slate-400">
              Explore plans designed to support your career journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-2xl border border-[#344459] bg-[#172538] p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-slate-500/10 p-3 text-slate-300">
                  <Zap size={24} />
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  Current Plan
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold">Free</h3>

              <p className="mt-2 text-sm text-slate-400">
                Everything you need to start your job search.
              </p>

              <div className="my-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-sm text-slate-400"> / forever</span>
              </div>

              <div className="space-y-4 border-t border-[#344459] pt-6">
                {[
                  "Browse all available jobs",
                  "Apply to 10 jobs",
                  "Save your favorite jobs",
                  "Track application status",
                  "Basic seeker dashboard",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <Check size={17} className="shrink-0 text-emerald-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                disabled
                className="mt-8 w-full cursor-not-allowed rounded-xl border border-[#344459] bg-[#101B2B] px-5 py-3 font-semibold text-slate-400"
              >
                Current Plan
              </button>
            </div>

            {/* Premium Plan */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-[#172538] p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                  <Crown size={24} />
                </div>
              </div>

              <h3 className="mt-5 text-xl font-bold">Premium</h3>

              <p className="mt-2 text-sm text-slate-400">
                More opportunities to accelerate your career.
              </p>

              <div className="my-6">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-sm text-slate-400"> / month</span>
              </div>

              <div className="space-y-4 border-t border-[#344459] pt-6">
                {[
                  "Unlimited job applications",
                  "Advanced application tracking",
                  "Priority job application features",
                  "Premium career tools",
                  "Enhanced job seeker experience",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <Check size={17} className="shrink-0 text-emerald-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpgrading ? "Redirecting..." : "Explore Premium"}
                {!isUpgrading && <ArrowUpRight size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Method and Billing History */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#344459] bg-[#172538] p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <CreditCard size={23} />
              </div>

              <div>
                <h3 className="font-bold">Payment Method</h3>
                <p className="text-sm text-slate-400">
                  Manage your payment information
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-[#344459] bg-[#101B2B] px-5 py-8 text-center">
              <CreditCard size={32} className="mx-auto text-slate-500" />

              <p className="mt-3 font-medium text-slate-300">
                No payment method added
              </p>

              <p className="mt-1 text-sm text-slate-500">
                You dont need a payment method for the Free plan.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#344459] bg-[#172538] p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                <Receipt size={23} />
              </div>

              <div>
                <h3 className="font-bold">Billing History</h3>
                <p className="text-sm text-slate-400">
                  View your previous transactions
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-[#344459] bg-[#101B2B] px-5 py-8 text-center">
              <Clock size={32} className="mx-auto text-slate-500" />

              <p className="mt-3 font-medium text-slate-300">
                No billing history yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your payment transactions will appear here.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex flex-col gap-3 rounded-xl border border-[#344459] bg-[#172538] p-5 sm:flex-row sm:items-center">
          <ShieldCheck size={22} className="shrink-0 text-emerald-400" />

          <p className="text-sm leading-relaxed text-slate-400">
            Your billing information is handled securely. Premium subscriptions
            and online payment processing will be enabled once payment
            integration is configured.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BillingPage
