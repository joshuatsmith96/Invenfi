import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { callAPI } from "./utils/callAPI";

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
      await callAPI.getMe();
      setLoggedIn(true);
    } catch (error: unknown) {
      console.log(error);
      setLoggedIn(false);
    } finally {
      setLoading(false); // <-- only stop loading when check finishes
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
        <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
        <Route
          path="*"
          element={
            loggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
