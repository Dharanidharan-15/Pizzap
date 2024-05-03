import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/landingPage";
import LoginSignUp from "../pages/LoginSignUp/LoginSignUp";
import HomePage from "../pages/home/HomePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<LoginSignUp />} />
      <Route path="home" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;
