import { apiRequest } from "./apiHelper";

export const getAllContactDatas = () => {
  return apiRequest({
    method: "GET",
    url: `/contact`,
  });
};

export const createContactForm = (contactData: any) => {
  return apiRequest({
    method: "POST",
    url: "/contact/create",
    data: contactData,
  });
};
