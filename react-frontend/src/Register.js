import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import WebsiteAPI from "./WebsiteAPI";

export const Register = () => {
  const { value } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match. Try again.");
      return;
    }

    try {
      // Call your API endpoint to register the user
      const response = await WebsiteAPI.register(username, password);
      // Handle the response
      if (response) {
        // Registration successful
        value.onLogin();
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
          <button type="submit">Register</button>
        </form>
      )}
    </>
  );
};
