import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import IsAuth from "./components/IsAuth";
import { callAPI } from "./utils/callAPI";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        await callAPI.getMe();
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <div className="absolute top-0 left-0 w-full h-full">Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <IsAuth isLoggedIn={loggedIn}>
              <Dashboard />
            </IsAuth>
          }
        />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" replace /> : <Login onLoginSuccess={() => setLoggedIn(true)} />}
        />
        <Route
          path="*"
          element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
