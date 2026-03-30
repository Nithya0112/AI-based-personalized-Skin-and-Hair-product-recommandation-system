import React, { useState } from "react";
import { productDataset } from "../data/recommendationData";
import Products from "./Products";

function IngredientAnalysisPage() {

  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const handleSearch = () => {

    // 🔍 Find product by name
    const foundProduct = productDataset.find((p) =>
      p.product_name.toLowerCase().includes(search.toLowerCase())
    );

    if (!foundProduct) {
      alert("Product not found");
      return;
    }

    // ✅ Get skin type
    const skinType = foundProduct.skin_type;

    setResult(foundProduct);

    // ✅ Recommend similar products
    const filtered = productDataset.filter(
      (p) => p.skin_type === skinType
    );

    setRecommended(filtered);
  };

  return (
    <div style={{ padding: "100px 40px" }}>

      <h1>Ingredient Analysis</h1>

      {/* 🔍 SEARCH */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />

        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Analyze
        </button>
      </div>

      {/* ✅ RESULT */}
      {result && (
        <div style={{ marginBottom: "30px" }}>
          <h2>Product Found:</h2>
          <p><strong>{result.product_name}</strong></p>
          <p>Skin Type: <strong>{result.skin_type}</strong></p>
        </div>
      )}

      {/* ✅ RECOMMENDED PRODUCTS */}
      {recommended.length > 0 && (
        <>
          <h2>Recommended Products</h2>
          <Products products={recommended} />
        </>
      )}

    </div>
  );
}

export default IngredientAnalysisPage;