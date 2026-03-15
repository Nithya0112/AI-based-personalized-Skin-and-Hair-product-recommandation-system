import React from "react";
import "../styles/Navbar.css";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">AI SkinCare</div>

      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">AI Analysis</a>
        <a href="#">Products</a>
        <a href="#">Haircare</a>
        <a href="#">Skin Tips</a>
        <a href="#">About</a>
      </nav>

      <div className="search">
        <input placeholder="Search products..." />
        <FaSearch />
      </div>
    </header>
  );
}

export default Navbar;