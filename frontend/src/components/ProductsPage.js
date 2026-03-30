
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "./Products";
import { productDataset } from "../data/recommendationData";

function ProductsPage() {

  const location = useLocation();
  const detectedSkinType = location.state?.skinType;

  // ✅ FILTER STATES
  const [skinType, setSkinType] = useState(detectedSkinType || "");
  const [productType, setProductType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // ✅ PRICE CONVERTER (£ → number)
  const getPriceValue = (price) => {
    return Number(price.replace(/[^\d.]/g, ""));
  };

  // ✅ FILTER LOGIC
  const filteredProducts = productDataset.filter((p) => {

    const price = getPriceValue(p.price);

    return (
      // Skin Type Filter
      (!skinType ||
        p.skin_type?.toLowerCase().includes(skinType.toLowerCase())) &&

      // Product Type Filter
      (!productType ||
        p.product_type?.toLowerCase().includes(productType.toLowerCase())) &&

      // Price Filter
      (!priceRange ||
        (priceRange === "low" && price < 10) ||
        (priceRange === "medium" && price >= 10 && price <= 25) ||
        (priceRange === "high" && price > 25))
    );
  });

  return (
    <div style={{ padding: "100px 40px" }}>
      <h1>Recommended Products</h1>

      {/* 🔥 FILTER SECTION */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap"
      }}>

        {/* Skin Type */}
        <select value={skinType} onChange={(e) => setSkinType(e.target.value)}>
          <option value="">All Skin Types</option>
          <option value="dry">Dry</option>
          <option value="oily">Oily</option>
          <option value="normal">Normal</option>
          <option value="sensitive">Sensitive</option>
        </select>

        {/* Product Type */}
        <select value={productType} onChange={(e) => setProductType(e.target.value)}>
          <option value="">All Types</option>
          <option value="moisturiser">Moisturiser</option>
          <option value="cleanser">Cleanser</option>
          <option value="serum">Serum</option>
        </select>

        {/* Price */}
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">All Prices</option>
          <option value="low">Below £10</option>
          <option value="medium">£10 - £25</option>
          <option value="high">Above £25</option>
        </select>

        {/* Reset Button */}
        <button
          onClick={() => {
            setSkinType("");
            setProductType("");
            setPriceRange("");
          }}
          style={{
            padding: "8px 16px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Reset
        </button>

      </div>

      {/* SHOW DETECTED SKIN TYPE */}
      {detectedSkinType && (
        <p>
          Detected Skin Type: <strong>{detectedSkinType}</strong>
        </p>
      )}

      {/* PRODUCTS */}
      {filteredProducts.length > 0 ? (
        <Products products={filteredProducts} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductsPage;