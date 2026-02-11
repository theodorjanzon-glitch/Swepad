export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <div className="image-placeholder"></div>
      <h3>{product.name}</h3>
      <p>{product.price} kr</p>
      <button onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}
