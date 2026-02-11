export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h3>Cart</h3>
      <p>{cart.length} items</p>
      <p className="total">Total: {total} kr</p>
      <button className="checkout">Checkout</button>
    </div>
  );
}
