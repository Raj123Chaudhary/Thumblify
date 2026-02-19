import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4001",
  withCredentials: true,
  // timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional but STRONGLY recommended
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: error.response?.status || 500,
    };

    return Promise.reject(customError);
  },
);

export const apiConnector = async (
  method: string,
  url: string,
  bodyData: unknown = null,
  headers: Record<string, string> = {},
  params: Record<string, any> = {},
) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData ?? {},
      headers,
      params,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};
