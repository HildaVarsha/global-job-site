import axiosInstance from "./axiosInstance";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestOptions {
  method: Method;
  url: string;
  data?: any;
  params?: any;
  headers?: any;
}

export const apiRequest = async <T = any>({
  method,
  url,
  data,
  params,
  headers,
}: ApiRequestOptions): Promise<T> => {
  const response = await axiosInstance({
    method,
    url,
    data,
    params,
    headers,
  });

  return response.data;
};
