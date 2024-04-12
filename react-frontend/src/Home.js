import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";

import WebsiteAPI from "./WebsiteAPI";

export const Home = () => {
  const { value } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const loginResult = await WebsiteAPI.login(username, password);
      if (loginResult && typeof loginResult === "object" && loginResult.token &&loginResult.username) {
        const { token, username } = loginResult;
        console.log("Username:", username);
        value.onLogin(username);
        console.log("Token", token);
        document.cookie = `token=${token}`
        setError("");
      } else if (loginResult === false) {
        setError("Incorrect username or password");
      } else {
        // Handle unexpected response
        console.log(loginResult);
        setError("Unexpected response from server");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2>Home (Public)</h2>
      {error && <div>{error}</div>}
      {!value.token && (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {!value.token && (
            <button type="button" onClick={handleLogin}>
              Sign In
            </button>
          )}
        </>
      )}
    </>
  );
};
