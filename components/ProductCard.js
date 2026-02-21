export default function ProductCard({ product, addToCart }) {
  const outOfStock = product.stock !== undefined && product.stock === 0;

  return (
    <div className="card">
      <div className="image-placeholder"></div>
      <h3>{product.name}</h3>
      {product.description && <p className="description">{product.description}</p>}
      <p>{product.price} kr</p>
      <p className={`stock ${outOfStock ? "out-of-stock" : "in-stock"}`}>
        {outOfStock ? "Out of stock" : `In stock: ${product.stock}`}
      </p>
      <button onClick={() => addToCart(product)} disabled={outOfStock}>
        {outOfStock ? "Out of stock" : "Add to cart"}
      </button>
    </div>
  );
}
