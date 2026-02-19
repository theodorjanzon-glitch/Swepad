import React from 'react';

const AdminDashboard = () => {
    // Sample data for stats overview
    const totalProducts = 150;
    const totalOrders = 350;
    const totalViews = 1200;
    const revenue = '$5,000';

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats-overview">
                <div className="stat-item">
                    <h2>Total Products</h2>
                    <p>{totalProducts}</p>
                </div>
                <div className="stat-item">
                    <h2>Total Orders</h2>
                    <p>{totalOrders}</p>
                </div>
                <div className="stat-item">
                    <h2>Total Views</h2>
                    <p>{totalViews}</p>
                </div>
                <div className="stat-item">
                    <h2>Revenue</h2>
                    <p>{revenue}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;