'use client';

import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    // Fetch products from API or state management
  }, []);

  const addProduct = () => {
    // Logic to add the product
  };

  const editProduct = (id) => {
    // Logic to edit the product
  };

  const deleteProduct = (id) => {
    // Logic to delete the product
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={addProduct}>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Product Name"
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Product Price"
        />
        <button type="submit">Add Product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>
                <button onClick={() => editProduct(prod.id)}>Edit</button>
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