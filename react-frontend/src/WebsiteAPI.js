
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

    static async register(username, password) {
      try {
        const response = await axios.post('http://localhost:8000/api/register', {
            username: username,
            password: password
        });

        // Check the status code and handle the response accordingly
        if (response.status === 201) {
            console.log('User registered successfully');
            console.log('New user:', response.data.user);
            return true;
        } else {
            console.log('Registration failed:', response.data.error);
            return false;
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      return false;
    };
}

export default WebsiteAPI;