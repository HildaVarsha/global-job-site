import { apiRequest } from "./apiHelper";

export const getAllJobs = (params = {}) => {
  const filteredParams: any = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v) // remove empty or undefined
  );

  const query = new URLSearchParams(filteredParams).toString();

  return apiRequest({
    method: "GET",
    url: `/jobs${query ? `?${query}` : ""}`,
  });
};

export const getJobById = (id: string) => {
  return apiRequest({
    method: "GET",
    url: `/jobs/${id}`,
  });
};

export const createJob = (jobData: any) => {
  return apiRequest({
    method: "POST",
    url: "/jobs/create",
    data: jobData,
  });
};
