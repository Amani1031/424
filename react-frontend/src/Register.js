import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import WebsiteAPI from "./WebsiteAPI";

export const Register = () => {
  const { value } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cell, setCell] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCellChange = (event) => {
    setCell(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match. Try again.");
      return;
    }

    try {
      const response = await WebsiteAPI.register(username, password, cell);
      if (response.status === 201) {
        // Registration successful
        const { token, username } = response.data;
        value.onLogin(username);
        document.cookie = `token=${token}`
        setError("");
      } else {
        // Registration failed
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      // Handle API call error
      setError("An error occurred with API. Please try again.");
      console.error(err);
    }
  };

  if (value.token) {
    return (
      <>
        <h2>You are already logged in.</h2>
        {error && <div>{error}</div>}
      </>
    );
  }

  return (
    <>
      <h2>Register Here! (Public)</h2>
      <h2>Password must contain at least one special character.</h2>
      {error && <div>{error}</div>}
      {!value.token && (
        <form onSubmit={handleSubmit}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <input
            type="text"
            placeholder="Cell Phone Number"
            value={cell}
            onChange={handleCellChange}
          />
          <button type="submit">Register</button>
        </form>
      )}
    </>
  );
};
