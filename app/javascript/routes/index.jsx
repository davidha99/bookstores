import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookstore from "../components/Bookstore";
import Bookstores from "../components/Bookstores";
import Home from "../components/Home";
import NewBook from "../components/NewBook";
import NewBookstore from "../components/NewBookstore";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookstores" element={<Bookstores />} />
      <Route path="/bookstore/:id" element={<Bookstore />} />
      <Route path="/bookstore" element={<NewBookstore />} />
      <Route path="/bookstore/:id/book" element={<NewBook />} />
    </Routes>
  </Router>
);