
import React from "react";
import "../styles/Navbar.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="logo">AI SkinCare</div>

      <nav className="nav-links">

        <a onClick={() => navigate("/")}>Home</a>

        <a onClick={() => navigate("/camera")}>
          AI Analysis
        </a>

        <a onClick={() => navigate("/products")}>
         Products
         </a>

        <a onClick={() => navigate("/")}>Haircare</a>
        <a onClick={() => navigate("/skincare-tips")}>Skin Tips</a>
        <a onClick={() => navigate("/")}>About</a>

      </nav>

      <div className="search">
        <input placeholder="Search products..." />
        <FaSearch />
      </div>
    </header>
  );
}

export default Navbar;