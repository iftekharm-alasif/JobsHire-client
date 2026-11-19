
import { auth } from "../auth";
import { headers } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name",
      sortDirection: "desc",
    },
    headers: await headers(),
  });

  return users;
};

export const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/premium`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user premium information");
  }

  return response.json();
};
