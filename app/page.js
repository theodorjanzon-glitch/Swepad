"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

export default function Home() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "SwePad Black", price: 299 },
    { id: 2, name: "SwePad White", price: 299 },
    { id: 3, name: "SwePad Pro XL", price: 399 }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <main className="wrapper">
      <nav className="navbar">
        <h2 className="logo">SwePad</h2>
      </nav>

      <section className="hero">
        <h1>Premium Mousepads</h1>
        <p>Minimalist design. Maximum performance.</p>
      </section>

      <section className="products">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </section>

      <Cart cart={cart} />
    </main>
  );
}
