
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { fakeAuth } from "./utils/FakeAuth";
import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { Register } from "./Register";
import { NavLink } from "react-router-dom";

import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import WebsiteAPI from "./WebsiteAPI";

export const AuthContext = React.createContext(null);

const App = () => {
  
  return (
    <>
    <AuthProvider>
        <Navigation />
      
        <h1>React Router</h1>

        <Routes>
          <Route index element={<Home />} />
          <Route path="landing" element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </AuthProvider>
    </>
  );
};

const Navigation = () => {
  const { value } = useAuth();
  
  useEffect(() => {
    WebsiteAPI.validateUser(value);
  }, []);

  return (
    <nav>
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/landing">Landing</NavLink>
    <NavLink to="/register">Register</NavLink>
    {value.token && (
      <button type="button" onClick={value.onLogout}>
        Sign Out
      </button>
    )}
  </nav>
)};

export default App;
