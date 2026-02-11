export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <p>Total: {total} kr</p>
      <button>Checkout</button>
    </div>
  );
}
