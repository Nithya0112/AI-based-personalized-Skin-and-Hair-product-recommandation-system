
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Features.css";
import { FaRobot, FaCamera, FaLeaf } from "react-icons/fa";

function Features() {

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {

      const base64Image = reader.result;

      try {

        const response = await fetch("http://localhost:8080/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ image: base64Image })
        });

        if (!response.ok) throw new Error("Server error");

        let skinType = await response.text();

        // ✅ FIX: clean value
        skinType = skinType.trim().toLowerCase();

        navigate("/result", {
          state: {
            image: base64Image,
            skinType,
            score: 73,
            tone: "Deep"
          }
        });

        event.target.value = "";

      } catch (error) {
        console.error("Error:", error);
        alert("Upload failed");
      }

    };

    reader.readAsDataURL(file);
  };

  return (
    <section className="features">

      <h2>Why Use Our AI System?</h2>

      <div className="feature-grid">

        <div className="feature" onClick={handleClick} style={{ cursor: "pointer" }}>
          <FaCamera size={40} />
          <h3>Skin Detection</h3>
          <p>Upload your face image to detect acne, dryness, oiliness and more.</p>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div className="feature">
          <FaRobot size={40} />
          <h3>AI Recommendation</h3>
          <p>Machine learning models suggest the best products for your skin.</p>
        </div>

        <div 
  className="feature" 
  onClick={() => navigate("/ingredient-analysis")} 
  style={{ cursor: "pointer" }}
>
  <FaLeaf size={40} />
  <h3>Ingredient Analysis</h3>
  <p>Find products with ingredients suitable for your skin type.</p>
</div>

      </div>

    </section>
  );
}

export default Features;