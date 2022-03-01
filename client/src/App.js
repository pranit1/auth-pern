import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.token) {
      axios
        .get("http://localhost:5000/auth/verify", {
          headers: { token: localStorage.token },
        })
        .then(({ data }) => {
          data ? setIsAuthenticated(true) : setIsAuthenticated(false);
        });
    }
  });
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/register"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
