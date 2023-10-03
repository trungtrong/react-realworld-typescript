import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";
import { UserStorage } from "../store/user.storage";

const TagsAPI = {
  getTagList: async () => {
    const token: string = UserStorage.getAccessToken();
    //
    try {
        const response = await axios.get(
          `${SERVER_BASE_URL}/tags`, 
          {
            headers: {
                Authorization: `Token ${encodeURIComponent(token)}`
            }
          });
        return response;
    }  catch (error: any) {
      return error.response;
    } 
  },
}

export default TagsAPI;
