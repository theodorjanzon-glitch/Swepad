export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <h2>{product.name}</h2>
      <p>{product.price} kr</p>
      <button onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}
