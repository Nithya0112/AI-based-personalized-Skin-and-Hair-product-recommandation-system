
function Products({ products }) {
  if (!products?.length) return null;

  return (
    <div style={{ marginTop: "24px" }}>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "16px",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {product.product_name}
            </div>

            <div>{product.price}</div>

            <div>Type: {product.product_type}</div>

            <div>Skin: {product.skin_type}</div>

            <a
              href={product.product_url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                marginTop: "10px",
                padding: "8px",
                background: "#0f766e",
                color: "#fff",
                textAlign: "center",
                borderRadius: "8px",
                textDecoration: "none",
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