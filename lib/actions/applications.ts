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
  try {
    const res = await fetch(`${BASE_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 403) {
      throw new Error(
        "Application limit reached! You can apply for a maximum of 10 jobs."
      );
    }

    if (res.status === 409) {
      throw new Error("You have already applied for this job.");
    }

    if (!res.ok) {
      throw new Error(
        result.message || "Failed to submit application. Please try again."
      );
    }

    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Cannot connect to server. Please try again.");
    }

    throw error;
  }
};

export const getMyApplications = async (email: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/applications?email=${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch applications");
    }

    return await res.json();
  } catch (error) {
    console.error("Get applications error:", error);
    throw error;
  }
};