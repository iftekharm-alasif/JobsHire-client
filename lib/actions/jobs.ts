
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getJobs = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/jobs?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();

  return {
    jobs: Array.isArray(data.jobs) ? data.jobs : [],
    totalJobs: Number(data.totalJobs) || 0,
    totalPages: Number(data.totalPages) || 1,
    currentPage: Number(data.currentPage) || page,
  };
};

export const createJob = async (data: any) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to publish job");
  }

  return res.json();
};

export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete job");
  }

  return res.json();
};

export const getRecruiterJobs = async (
  page: number,
  recruiterId: string
) => {
  const res = await fetch(
    `${BASE_URL}/recruiter/jobs?page=${page}&recruiterId=${encodeURIComponent(recruiterId)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recruiter jobs");
  }

  return res.json();
};

// Get applicants for a specific job
export const getJobApplicants = async (
  jobId: string,
  recruiterId: string
) => {
  const res = await fetch(
    `${BASE_URL}/jobs/${jobId}/applications?recruiterId=${encodeURIComponent(recruiterId)}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch applicants");
  }

  return data;
};

// Accept or reject an application
export const reviewApplication = async (
  applicationId: string,
  recruiterId: string,
  status: "Shortlisted" | "Rejected"
) => {
  const res = await fetch(
    `${BASE_URL}/applications/${applicationId}/review`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recruiterId,
        status,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to review application");
  }

  return data;
};
