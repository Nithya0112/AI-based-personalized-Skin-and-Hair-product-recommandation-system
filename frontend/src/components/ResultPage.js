// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import "../styles/ResultPage.css";

// // function ResultPage() {

// //   const { state } = useLocation();

// //   if (!state) return <h2>No Data</h2>;

// //   const { image, skinType, score, tone } = state;

// //   return (
// //     <div className="result-container">

// //       <h1>Your personalized skin report</h1>

// //       <div className="result-card">

// //         <img src={image} alt="skin" />

// //         <div className="result-details">

// //           <h2>Overall Skin Score</h2>
// //           <h1>{score} / 100</h1>

// //           <p className="warning">Needs Attention</p>

// //           <div className="info-box">
// //             <div>
// //               <h3>Skin Type</h3>
// //               <p>{skinType}</p>
// //             </div>

// //             <div>
// //               <h3>Skin Tone</h3>
// //               <p>{tone}</p>
// //             </div>
// //           </div>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// // export default ResultPage;

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/ResultPage.css";

// function ResultPage() {

//   const location = useLocation();
//   const navigate = useNavigate();

//   const state = location.state;

//   // ✅ Handle no data case (important)
//   if (!state) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center" }}>
//         <h2>No Data Found</h2>
//         <button onClick={() => navigate("/")}>Go Back</button>
//       </div>
//     );
//   }

//   const { image, skinType, score = 70, tone = "Normal" } = state;

//   return (
//     <div className="result-container">

//       <h1>Your personalized skin report</h1>
//       <p>Generated using AI</p>

//       <div className="result-card">

//         {/* IMAGE */}
//         <img src={image} alt="skin" />

//         {/* DETAILS */}
//         <div className="result-details">

//           <h2>Overall Skin Score</h2>
//           <h1>{score} / 100</h1>

//           <p className="warning">Needs Attention</p>

//           {/* ✅ PROGRESS BAR */}
//           <div className="progress-bar">
//             <div 
//               className="progress" 
//               style={{ width: `${score}%` }}
//             ></div>
//           </div>

//           {/* INFO */}
//           <div className="info-box">

//             <div>
//               <h3>Skin Type</h3>
//               <p>{skinType}</p>
//             </div>

//             <div>
//               <h3>Skin Tone</h3>
//               <p>{tone}</p>
//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ResultPage;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";
import Products from "./Products";
import { productDataset } from "../data/recommendationData";

function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();

  let state = location.state;

  // ✅ fallback from localStorage
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
        <button onClick={() => navigate("/camera")}>
          Start Analysis
        </button>
      </div>
    );
  }

  const { image, skinType, score = 70, tone = "Normal" } = state;

  // ✅ FILTER PRODUCTS
  const filteredProducts = productDataset.filter(
    (p) => p.skinType === skinType
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

      {/* 🔥 PRODUCTS SECTION */}
      <div style={{ marginTop: "40px" }}>
        <h2>Recommended Products</h2>
        <Products products={filteredProducts} />
      </div>

    </div>
  );
}

export default ResultPage;