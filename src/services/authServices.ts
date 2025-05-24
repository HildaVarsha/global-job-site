import { apiRequest } from "./apiHelper";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const login = (data: LoginData) => {
  return apiRequest({
    method: "POST",
    url: "/auth/login",
    data,
  });
};

export const register = (data: RegisterData) => {
  return apiRequest({
    method: "POST",
    url: "/auth/register",
    data,
  });
};

export const logout = () => {
  return apiRequest({
    method: "POST",
    url: "/auth/logout",
  });
};

export const getCurrentUser = () => {
  return apiRequest({
    method: "GET",
    url: "/auth/me",
  });
};
