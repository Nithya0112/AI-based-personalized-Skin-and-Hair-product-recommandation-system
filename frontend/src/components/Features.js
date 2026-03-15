

// import React, { useRef } from "react";
// import "../styles/Features.css";
// import { FaRobot, FaCamera, FaLeaf } from "react-icons/fa";

// function Features() {

//   const fileInputRef = useRef(null);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = async (event) => {

//     const file = event.target.files[0];

//     if (!file) return;

//     const formData = new FormData();

//     formData.append("email", "user@gmail.com");
//     formData.append("file", file);

//     try {

//       const response = await fetch(
//         "http://localhost:8080/skin/upload",
//         {
//           method: "POST",
//           body: formData
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Server error");
//       }

//       const data = await response.json();

//       console.log("Response:", data);

//       alert("Detected Skin Type: " + data.predictedSkinType);

//       event.target.value = "";

//     } catch (error) {

//       console.error("Error:", error);
//       alert("Upload failed");

//     }
//   };

//   return (

//     <section className="features">

//       <h2>Why Use Our AI System?</h2>

//       <div className="feature-grid">

//         <div className="feature" onClick={handleClick} style={{ cursor: "pointer" }}>
//           <FaCamera size={40} />
//           <h3>Skin Detection</h3>
//           <p>Upload your face image to detect acne, dryness, oiliness and more.</p>
//         </div>

//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           onChange={handleFileChange}
//         />

//         <div className="feature">
//           <FaRobot size={40} />
//           <h3>AI Recommendation</h3>
//           <p>Machine learning models suggest the best products for your skin.</p>
//         </div>

//         <div className="feature">
//           <FaLeaf size={40} />
//           <h3>Ingredient Analysis</h3>
//           <p>Find products with ingredients suitable for your skin type.</p>
//         </div>

//       </div>

//     </section>

//   );
// }

// export default Features;

import React, { useRef } from "react";
import "../styles/Features.css";
import { FaRobot, FaCamera, FaLeaf } from "react-icons/fa";

function Features() {

  const fileInputRef = useRef(null);

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

        const response = await fetch(
          "http://localhost:8080/api/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              image: base64Image
            })
          }
        );

        if (!response.ok) {
          throw new Error("Server error");
        }

        const text = await response.text();

        console.log("Skin Type:", text);

        alert("Detected Skin Type: " + text);

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

        <div className="feature">
          <FaLeaf size={40} />
          <h3>Ingredient Analysis</h3>
          <p>Find products with ingredients suitable for your skin type.</p>
        </div>

      </div>

    </section>

  );
}

export default Features;