import React, { useState, useEffect } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock function to fetch orders
    const fetchOrders = async () => {
      setLoading(true);
      // Simulated order fetching logic
      const fetchedOrders = [
        { id: 1, status: 'Processed', tracking: 'TRK12345' },
        { id: 2, status: 'Shipped', tracking: 'TRK67890' }
      ];
      setOrders(fetchedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => (order.id === id ? { ...order, status: newStatus } : order)));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Orders Management</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Tracking Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.tracking}</td>
              <td>
                <button onClick={() => updateStatus(order.id, 'Completed')}>Mark as Completed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;