import axios from "axios";
import { ContactFormData } from "../types";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

export const verifyNews = async (text: string) => {
  const response = await api.post("/verify", { text });
  return response.data;
};

export const signup = async (email: string, password: string) => {
  const response = await api.post("/auth/signup", { email, password });
  return response.data;
};

export const submitContact = async (data: ContactFormData) => {
  const response = await api.post("/contact", data);
  return response.data;
};
