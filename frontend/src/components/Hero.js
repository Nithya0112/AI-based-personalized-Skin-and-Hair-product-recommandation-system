
import React from "react";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (

    <section className="hero">

      {/* -------- Left Text -------- */}
      <div className="hero-text">

        <h1>AI Powered Skin & Hair Care Recommendations</h1>

        <p>
          Upload your skin or hair image and get personalized
          product recommendations using Artificial Intelligence.
        </p>

        <button 
          className="hero-btn" 
          onClick={() => navigate("/camera")}
        >
          Start AI Analysis
        </button>

      </div>

      {/* -------- Hero Image -------- */}
      <div className="hero-img">

        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
          alt="skincare"
        />

      </div>

    </section>

  );
}

export default Hero;