import { apiRequest } from "./apiHelper";

export const getAllJobApplications = () => {
  return apiRequest({
    method: "GET",
    url: `/apply`,
  });
};

export const applyJob = (contactData: any) => {
  return apiRequest({
    method: "POST",
    url: "/apply/create",
    data: contactData,
  });
};
