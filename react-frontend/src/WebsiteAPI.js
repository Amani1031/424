
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

    static async register(username, password, cell) {
      try {
        const response = await axios.post(`${HOME_URL}/api/register/`, {
            username: username,
            password: password,
            cell: cell
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
      const token = document.cookie.split(';')
                    .map(cookie => cookie.trim())
                    .find(cookie => cookie.startsWith('token='))
                    ?.split('=')[1];
      if (!token) {
        console.log("token null");
        return null; // Return null if token is null
      }
      try {
        const response = await axios.post(`${HOME_URL}/api/authenticate/`, {token: token});

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

    static async loadContacts(username) {
      try {
        const response = await axios.post(`${HOME_URL}/api/contacts/`, {
          username: username
        });
        console.log(response.data);
        return response.data;
      } catch (err) {
        console.log(err);
      }
      return null;
    }
}

export default WebsiteAPI;