import React from "react";
import Products from "./Products";
import { productDataset } from "../data/recommendationData";

function ProductsPage() {

  return (
    <div style={{ padding: "100px 40px" }}>
      <h1>All Products</h1>

      <Products products={productDataset} />
    </div>
  );
}

export default ProductsPage;