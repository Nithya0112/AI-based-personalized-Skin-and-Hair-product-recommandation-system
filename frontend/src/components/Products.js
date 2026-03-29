// import React from "react";

// function Products({ products }) {
//   if (!products?.length) {
//     return null;
//   }

//   return (
//     <div style={{ marginTop: "24px" }}>
//       <div style={{ marginBottom: "16px" }}>Products Section:</div>
//       <div>Product Cards:</div>

//       <div
//         style={{
//           display: "grid",
//           gap: "16px",
//           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//           marginTop: "16px",
//         }}
//       >
//         {products.map((product, index) => (
//           <div
//             key={product.productId}
//             style={{
//               border: "1px solid #e5e7eb",
//               borderRadius: "16px",
//               padding: "16px",
//               backgroundColor: "#ffffff",
//             }}
//           >
//             <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px" }}>
//               [Product Card {index + 1}]
//             </div>
//             <div style={{ fontWeight: 600, marginBottom: "10px" }}>
//               {product.name}
//             </div>
//             <div style={{ marginBottom: "8px" }}>
//               {"\u20B9"}
//               {product.price}
//               {product.discount ? `   ${product.discount}` : ""}
//             </div>
//             <div style={{ marginBottom: "8px" }}>
//               {"\u2B50"} {product.rating}   {product.reviews} Reviews
//             </div>
//             <div style={{ marginBottom: "8px" }}>
//               Category: {product.category}
//             </div>
//             <div style={{ marginBottom: "8px" }}>Image: {product.image}</div>
//             <a
//               href={product.productLink}
//               target="_blank"
//               rel="noreferrer"
//               style={{ color: "#0f766e", textDecoration: "none", fontWeight: 600 }}
//             >
//               Link: {product.productLink}
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;
import React from "react";

function Products({ products }) {
  if (!products?.length) {
    return null;
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <div style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
        Products Section:
      </div>

      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          marginTop: "16px",
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.productId || index}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "16px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px" }}>
              [Product Card {index + 1}]
            </div>

            {/* PRODUCT NAME */}
            <div style={{ fontWeight: 600, marginBottom: "10px" }}>
              {product.name}
            </div>

            {/* PRICE */}
            <div style={{ marginBottom: "8px" }}>
              ₹{product.price}
              {product.discount ? `   ${product.discount}` : ""}
            </div>

            {/* RATING */}
            <div style={{ marginBottom: "8px" }}>
              ⭐ {product.rating} &nbsp; {product.reviews} Reviews
            </div>

            {/* CATEGORY */}
            <div style={{ marginBottom: "8px" }}>
              Category: {product.category}
            </div>

            {/* IMAGE TEXT (optional) */}
            <div style={{ marginBottom: "8px", fontSize: "13px", color: "#555" }}>
              {product.image}
            </div>

            {/* 🔥 FIXED LINK BUTTON */}
            <a
              href={product.productLink}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: "10px",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#0f766e",
                color: "#ffffff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                display: "block"
              }}
            >
              View Product
            </a>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;