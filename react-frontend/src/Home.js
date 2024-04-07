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
      console.log("Username:", username);
      console.log("Password:", password);
      const loginResult = await WebsiteAPI.login(username, password);
      if (loginResult) {
        console.log("Username:", username);
        console.log("Password:", password);
        value.onLogin();
        setError("");
      } else {
        setError("Incorrect username or password");
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
