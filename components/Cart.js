export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="cart">
      <h3>Cart</h3>
      <p>{cart.length} items</p>
      <p className="total">Total: {total} kr</p>

      <button className="checkout" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}
