import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";

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

  const handleLogin = () => {
    if (username === "bj" && password === "pass424") {
      // Implement your login logic here
      console.log("Username:", username);
      console.log("Password:", password);
      value.onLogin();
      setError("");
    } else {
      // Handle incorrect username or password
      setError("Incorrect username or password");
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
