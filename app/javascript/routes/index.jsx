import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookstores from "../components/Bookstores";
import Home from "../components/Home";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookstores" element={<Bookstores />} />
    </Routes>
  </Router>
);