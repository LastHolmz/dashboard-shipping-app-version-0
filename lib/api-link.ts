import { env } from "process";

const API_URL =
  env.NODE_ENV === "production"
    ? (env.API_URL as string)
    : "http://localhost:10000";

export default API_URL;
