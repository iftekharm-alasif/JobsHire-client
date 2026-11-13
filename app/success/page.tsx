
import Link from "next/link"
import { redirect } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { stripe } from "@/lib/stripe"

type Props = {
  searchParams: Promise<{
    session_id?: string
  }>
}

export default async function Success({ searchParams }: Props) {
  const { session_id } = await searchParams

  if (!session_id) {
    redirect("/dashboard/seeker/billing")
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(
    session_id
  )

  if (
    checkoutSession.status !== "complete" ||
    checkoutSession.payment_status !== "paid"
  ) {
    redirect("/dashboard/seeker/billing")
  }

  const customerName = checkoutSession.customer_details?.name
  const customerEmail =
    checkoutSession.customer_details?.email ||
    checkoutSession.customer_email

  const amount = (checkoutSession.amount_total ?? 0) / 100

  const paymentDate = new Date(
    checkoutSession.created * 1000
  ).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101B2B] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#344459] bg-[#172538] p-8 text-center">

        <CheckCircle2
          size={60}
          className="mx-auto mb-5 text-emerald-400"
        />

        <h1 className="text-2xl font-bold text-white">
          Payment Successful!
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Thank you for subscribing to HireLoop Premium.
          Your payment was successful.
        </p>

        <div className="mt-7 space-y-4 rounded-xl border border-[#344459] bg-[#101B2B] p-5 text-left">

          {customerName && (
            <div>
              <p className="text-xs text-slate-500">
                Customer Name
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {customerName}
              </p>
            </div>
          )}

          {customerEmail && (
            <div>
              <p className="text-xs text-slate-500">
                Confirmation Email
              </p>
              <p className="mt-1 break-all text-sm font-medium text-white">
                {customerEmail}
              </p>
            </div>
          )}

          <div>
            <p className="text-xs text-slate-500">
              Plan
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              HireLoop Premium
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Amount Paid
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: checkoutSession.currency || "usd",
              }).format(amount)}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Payment Date
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              {paymentDate}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Transaction ID
            </p>
            <p className="mt-1 break-all text-xs font-medium text-slate-300">
              {typeof checkoutSession.payment_intent === "string"
                ? checkoutSession.payment_intent
                : checkoutSession.payment_intent?.id || checkoutSession.id}
            </p>
          </div>

        </div>

        <Link
          href="/dashboard/seeker/billing"
          className="mt-7 block rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500"
        >
          Go to Billing
        </Link>

      </div>
    </div>
  )
}
