
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.MONGO_DB_URL as string)

const db = client.db("hireloopdb")

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "seeker",
        input: true,
      },
      plan: {
        type: "string",
        required: true,
        defaultValue: "free",
        input: false,
      },
      subscriptionStatus: {
        type: "string",
        required: true,
        defaultValue: "inactive",
        input: false,
      },
      stripeCustomerId: {
        type: "string",
        required: false,
        input: false,
      },
      stripeSubscriptionId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
})
