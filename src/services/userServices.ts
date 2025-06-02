import { apiRequest } from "./apiHelper";

export const getAllUsers = () => {
  return apiRequest({
    method: "GET",
    url: `/users`,
  });
};
