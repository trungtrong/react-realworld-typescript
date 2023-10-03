import axios from "axios";
import { SERVER_BASE_URL } from "../utils/constant";

const UserAPI = {
    login: async (email: any, password: any) => {
        try {
          const response = await axios.post(
            `${SERVER_BASE_URL}/users/login`,
            JSON.stringify({ user: { email, password } }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          return response;
        }  catch (error: any) {
            return error.response;
        }
    },
    register: async (username: any, email: any, password: any) => {
        try {
          const response = await axios.post(
            `${SERVER_BASE_URL}/users`,
            JSON.stringify({ user: { username, email, password } }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          return response;
        }  catch (error: any) {
            return error.response;
        }
    },
    updateUserInfo: async (user: any) => {
      try {
        const userString: any = window.localStorage.getItem("user");
        const user = JSON.parse(userString);
        const token = user?.token;

        const response = await axios.put(
          `${SERVER_BASE_URL}/user`,
          JSON.stringify({ user: user }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${encodeURIComponent(token)}`
            },
          }
        );
        return response;
      }  catch (error: any) {
          return error.response;
      }
    },
    current: async () => {
      const userString: any = window.localStorage.getItem("user");
      const user = JSON.parse(userString);
      const token = user?.token;
      //
      try {
          const response = await axios.get(`/user`, {
              headers: {
                  Authorization: `Token ${encodeURIComponent(token)}`
              }
          })
          return response;
      }  catch (error: any) {
        return error.response;
      } 
    },
    follow: async (username: string) => {
      const userString: any = window.localStorage.getItem("user");
      const user = JSON.parse(userString);
      const token = user?.token;
      try {
        const response = await axios.post(
          `${SERVER_BASE_URL}/profiles/${username}/follow`,
          {},
          {
            headers: {
              Authorization: `Token ${encodeURIComponent(token)}`,
            },
          }
        );
        return response;
      }  catch (error: any) {
        return error.response;
      }
    },
    unFollow: async (username: string) => {
      const userString: any = window.localStorage.getItem("user");
      const user = JSON.parse(userString);
      const token = user?.token;
      try {
        const response = await axios.delete(
          `${SERVER_BASE_URL}/profiles/${username}/follow`,
          {
            headers: {
              Authorization: `Token ${encodeURIComponent(token)}`,
            },
          }
        );
        return response;
      }  catch (error: any) {
        return error.response;
      }
    },
}

export default UserAPI;
