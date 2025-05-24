import { apiRequest } from "./apiHelper";

export const getAllJobs = () => {
  return apiRequest({
    method: "GET",
    url: "/jobs",
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
    url: "/jobs",
    data: jobData,
  });
};
