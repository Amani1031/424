
import axios from "axios";
import config from "./config";

const {
    api: { host },
  } = config;

  const HOME_URL = host;

  class WebsiteAPI {
    static async login(username, password) {
      try {
        const response = await axios.post(`${HOME_URL}/api/login/`, {
          username: username,
          password: password,
        });
        return response.data;
      } catch (err) {
        console.log(err);
      }
      return false;
    }
}

export default WebsiteAPI;