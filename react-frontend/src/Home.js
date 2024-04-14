import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";

import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png";

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
      console.log("STUCK");
      console.error(err);
    }
  };

  function navigate(url){
    window.location.href = url;
  }
  
  async function auth(){
    const response = await fetch('http://127.0.0.1:8000/request',{method:'post'});
    const data = await response.json();
    console.log(data);
    navigate(data.url);
  
  }

  return (
    <>
      <h2> Welcome! </h2>
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
          <button className="btn-auth"  type="button" onClick={()=> auth()}>
            <img className="btn-auth-img" src={googleButton} alt='google sign in'/>
            </button>
        </>
      )}
    </>
  );
};
