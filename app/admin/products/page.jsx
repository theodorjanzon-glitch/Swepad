"use client";

import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', stock: '' });
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setForm({ name: '', price: '', description: '', stock: '' });
    setEditingId(null);
  };

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/admin/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    resetForm();
    fetchProducts();
  };

  const editProduct = (prod) => {
    setEditingId(prod.id);
    setForm({ name: prod.name, price: prod.price, description: prod.description, stock: prod.stock });
  };

  const deleteProduct = async (id) => {
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price (kr)"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          placeholder="Stock quantity"
        />
        <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.price} kr</td>
              <td>{prod.description}</td>
              <td>{prod.stock}</td>
              <td>
                <button onClick={() => editProduct(prod)}>Edit</button>
                <button onClick={() => deleteProduct(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
