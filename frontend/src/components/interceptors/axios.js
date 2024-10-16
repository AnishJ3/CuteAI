import axios from "axios";

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      // console.log(localStorage.getItem("refresh_token"));

      try {
        const response = await axios.post(
          `${BACKEND_URL}/token/refresh/`,
          { refresh: localStorage.getItem("refresh_token") },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data["access"]}`;
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          return axios(error.config);
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
        // Optionally handle the refresh failure (e.g., logout the user)
      }
    }

    refresh = false;
    return Promise.reject(error); // Return the rejected promise for better error handling
  }
);
