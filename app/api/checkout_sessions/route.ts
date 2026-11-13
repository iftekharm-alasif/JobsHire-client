
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"

export async function POST() {
  try {
    // Check logged-in user
    const headersList = await headers()

    const sessionData = await auth.api.getSession({
      headers: headersList,
    })

    if (!sessionData?.user) {
      return NextResponse.json(
        { error: "Please sign in first." },
        { status: 401 }
      )
    }

    const priceId = process.env.STRIPE_PRICE_ID
    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    if (!priceId || !appUrl) {
      throw new Error("Stripe environment variables are missing.")
    }

    // Find existing Stripe customers
    const customers = await stripe.customers.list({
      email: sessionData.user.email,
      limit: 100,
    })

    // Check existing active subscriptions
    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "all",
        limit: 100,
      })

      const hasActiveSubscription = subscriptions.data.some(
        (subscription) =>
          subscription.status === "active" ||
          subscription.status === "trialing"
      )

      if (hasActiveSubscription) {
        return NextResponse.json(
          {
            error: "You already have an active Premium subscription.",
          },
          { status: 409 }
        )
      }
    }

    // Create Stripe Checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      customer_email: sessionData.user.email,
      client_reference_id: sessionData.user.id,

      metadata: {
        userId: sessionData.user.id,
        email: sessionData.user.email,
      },

      subscription_data: {
        metadata: {
          userId: sessionData.user.id,
          email: sessionData.user.email,
        },
      },

      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/seeker/billing`,
    })

    if (!checkoutSession.url) {
      throw new Error("Could not create Stripe checkout URL.")
    }

    return NextResponse.json({
      url: checkoutSession.url,
    })

  } catch (err) {
    console.error("Stripe checkout error:", err)

    const error =
      err instanceof Error ? err.message : "Something went wrong."

    return NextResponse.json(
      { error },
      { status: 500 }
    )
  }
}
