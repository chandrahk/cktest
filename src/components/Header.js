import React from "react";
import { NavLink } from "react-router-dom";
import About from "./About";
import { Routes, Route, Link } from "react-router-dom";
//<Route path="/" element={<Home />} />
function Header() {
  return (
    <div>
      <header>
        <h1>Welcome to Housy Game!</h1>
      </header>
      <Routes>
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
export default Header;
