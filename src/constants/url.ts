const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.SCS_SERVER_LOCALHOST
    : process.env.SCS_SERVER_API_URL;

export { API_URL };
