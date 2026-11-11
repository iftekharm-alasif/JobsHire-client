
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const applyToAJob = async (data: {
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  phone: string;
  resume: string;
  coverLetter: string;
}) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to submit application");
  }

  return result;
};

export const getMyApplications = async (email: string) => {
  const res = await fetch(
    `${BASE_URL}/applications?email=${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }

  return res.json();
};
