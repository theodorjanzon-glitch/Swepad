"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

export default function Home() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "SwePad Black", price: 299 },
    { id: 2, name: "SwePad White", price: 299 }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <main className="container">
      <h1>SwePad</h1>
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
      <Cart cart={cart} />
    </main>
  );
}
