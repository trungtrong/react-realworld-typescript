import axios from "axios";

import { SERVER_BASE_URL } from "../../utils/constant";
import { UserStorage } from "../interactions/user.storage";

const ArticleAPI = {
    addNew: async (newArticle: any) => {
      const token: string = UserStorage.getAccessToken();
      try {
        const { data, status } = await axios.post(
            `${SERVER_BASE_URL}/articles`,
            JSON.stringify({ article: newArticle }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${encodeURIComponent(token)}`,
            },
          }
        );
        return { data, status };
      }  catch (error: any) {
        return error.response;
      }
    },
    update: async (newArticle: any, pid: string) => {
      const token: string = UserStorage.getAccessToken();
      try {
        const { data, status } = await axios.put(
            `${SERVER_BASE_URL}/articles/${pid}`,
            JSON.stringify({ article: newArticle }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${encodeURIComponent(token)}`,
            },
          }
        );
        return { data, status };
      }  catch (error: any) {
        return error.response;
      }
    },
    delete: async (id: string) => {
      const token: string = UserStorage.getAccessToken();

      try {
        const { data, status } = await axios.delete(
          `${SERVER_BASE_URL}/articles/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${encodeURIComponent(token)}`,
            },
          }
        );
        return { data, status };
      }  catch (error: any) {
        return error.response;
      }
    },
}

export default ArticleAPI;
