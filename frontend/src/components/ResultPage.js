
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";
import Products from "./Products";
import { productDataset } from "../data/recommendationData";

function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();

  let state = location.state;

  // fallback
  if (!state) {
    const stored = localStorage.getItem("skinData");
    if (stored) {
      state = JSON.parse(stored);
    }
  }

  if (!state) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>Please analyze your skin first</h2>
        <button onClick={() => navigate("/")}>
          Start Analysis
        </button>
      </div>
    );
  }

  const { image, skinType, score = 70, tone = "Normal" } = state;

  // ✅🔥 FIXED FILTER
  const filteredProducts = productDataset.filter(
    (p) =>
      p.skin_type?.toLowerCase().trim() ===
      skinType?.toLowerCase().trim()
  );

  return (
    <div className="result-container">

      <h1>Your personalized skin report</h1>
      <p>Generated using AI</p>

      <div className="result-card">

        <img src={image} alt="skin" />

        <div className="result-details">

          <h2>Overall Skin Score</h2>
          <h1>{score} / 100</h1>

          <p className="warning">Needs Attention</p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${score}%` }}
            ></div>
          </div>

          <div className="info-box">

            <div>
              <h3>Skin Type</h3>
              <p>{skinType}</p>
            </div>

            <div>
              <h3>Skin Tone</h3>
              <p>{tone}</p>
            </div>

          </div>

        </div>

      </div>

      {/* ✅ PRODUCTS */}
      <div style={{ marginTop: "40px" }}>
        <h2>Recommended Products</h2>

        {filteredProducts.length > 0 ? (
          <Products products={filteredProducts} />
        ) : (
          <p>No products found for your skin type</p>
        )}
      </div>

    </div>
  );
}

export default ResultPage;