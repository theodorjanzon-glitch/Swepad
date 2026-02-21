"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() =>
        setProducts([
          { id: 1, name: "SwePad Black", price: 299, description: "", stock: 0 },
          { id: 2, name: "SwePad White", price: 299, description: "", stock: 0 },
          { id: 3, name: "SwePad Pro XL", price: 399, description: "", stock: 0 },
        ])
      );
  }, []);

  const addToCart = (product) => {
    const inCart = cart.filter((i) => i.id === product.id).length;
    if (product.stock !== undefined && inCart >= product.stock) return;
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
