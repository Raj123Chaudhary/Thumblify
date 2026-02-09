import axios from "axios";
import dotenv from "dotenv";
dotenv.config()

export const stabilityClient = axios.create({
  baseURL: "https://api.stability.ai",
  headers: {
    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
