import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import AuthRoute from "./components/Others/AuthRoute";
import Dashboard from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { ErrorPage } from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "rsuite";

initializeApp(config.firebaseConfig);

function App() {
  return (
      <BrowserRouter>
      {window.location.pathname !== "/login" && <Navbar />}{" "}
      {/* Exclude Navbar from Login page */}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
