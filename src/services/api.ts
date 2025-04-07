import axios from "axios";
import axiosRetry from "axios-retry";

export const createAxiosInstance = (token: string | null) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  axiosRetry(instance, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => {
      return (
        axios.isAxiosError(error) &&
        (!error.response || error.response.status >= 500)
      );
    },
  });

  return instance;
};

export const submitContact = async (formData: {
  name: string;
  email: string;
  message: string;
}): Promise<{ message: string }> => {
  const axiosInstance = createAxiosInstance(null);
  try {
    const response = await axiosInstance.post("/api/contact", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to submit contact form"
      );
    }
    throw new Error("Failed to submit contact form");
  }
};
