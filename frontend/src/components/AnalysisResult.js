import React from "react";
import Products from "./Products";
import { productDataset } from "../data/recommendationData";

function AnalysisResult() {
  const products = productDataset
    .map(
      ({
        productId,
        name,
        category,
        price,
        image,
        rating,
        reviews,
        discount,
        productLink,
      }) => ({
        productId,
        name,
        category,
        price,
        image,
        rating,
        reviews,
        discount,
        productLink,
      })
    );

  return (
    <div style={{ padding: "20px" }}>
      <Products products={products} />
    </div>
  );
}

export default AnalysisResult;
