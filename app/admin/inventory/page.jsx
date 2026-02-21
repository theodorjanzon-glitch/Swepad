"use client";

import React, { useState, useEffect } from "react";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchInventory = async () => {
    const res = await fetch("/api/admin/inventory");
    const data = await res.json();
    setInventory(data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddStock = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: parseInt(productId), quantity: parseInt(quantity) }),
    });
    setProductId("");
    setQuantity("");
    fetchInventory();
  };

  const handleSetStock = async (id, newStock) => {
    await fetch(`/api/admin/inventory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: parseInt(newStock) }),
    });
    fetchInventory();
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <form onSubmit={handleAddStock}>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity to add"
          required
        />
        <button type="submit">Add Stock</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Set Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>
                <input
                  type="number"
                  defaultValue={item.stock}
                  min="0"
                  onBlur={(e) => handleSetStock(item.id, e.target.value)}
                  style={{ width: "70px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
