import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import IsAuth from "./components/IsAuth";
import { useState } from "react";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);  // Manage login state here

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <IsAuth isLoggedIn={loggedIn}>
              <Dashboard onLogout={handleLogout} />
            </IsAuth>
          }
        />
        <Route
          path="/login"
          element={loggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        />
        <Route
          path="*"
          element={
            loggedIn ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
