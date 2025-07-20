import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { callAPI } from "./utils/callAPI";

//Views
import DashboardView from "./views/DashboardView/DashboardView";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // <-- new loading state

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const check = async () => {
    try {
      const result = await callAPI.getMe();
      if (result) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error: unknown) {
      console.log(error);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, []); // <-- empty dependency array so it runs only on mount

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            <Dashboard onLogout={handleLogout}>
              <DashboardView />
            </Dashboard>
          }
        />
        <Route
          path="/inventory"
          element={
            <Dashboard onLogout={handleLogout}>
              <h1>Inventory View</h1>
            </Dashboard>
          }
        />
        <Route
          path="/reports"
          element={
            <Dashboard onLogout={handleLogout}>
              <h1>Reports View</h1>
            </Dashboard>
          }
        />
        <Route
          path="*"
          element={loggedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/login"} replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
