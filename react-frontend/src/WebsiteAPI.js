
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
        const response = await axios.post(`${HOME_URL}/api/register/`, {
            username: username,
            password: password
        });

        // Check the status code and handle the response accordingly
        if (response.status === 201) {
            console.log('User registered successfully');
            console.log('New user:', username);
            return response;
        } else {
            console.log('Registration failed:', response.data.error);
            return false;
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      return false;
    };

    static async validateUser(value) {
      try {
        const response = await axios.post(`${HOME_URL}/api/authenticate/`);

        // Check the status code and handle the response accordingly
        if (response.status === 201) {
            console.log('User found');
            const { username } = response.data;
            value.onLogin(username);
            return;
        } else if (response.status === 401) {
            console.log('Registration failed:', response.data.error);
            return;
        } else {
            console.log('Unexpected error', response.data.error);
            return;
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      return;
    };
}

export default WebsiteAPI;