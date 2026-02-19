import React from 'react';

const AnalyticsPage = () => {
  const views = 1250;  // Sample data
  const clicks = 300;  // Sample data
  const conversionRate = (clicks / views) * 100;
  const topProducts = [
    { name: 'Product A', sales: 150 },
    { name: 'Product B', sales: 120 },
    { name: 'Product C', sales: 100 },
  ];

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <h2>Metrics</h2>
      <p>Views: {views}</p>
      <p>Clicks: {clicks}</p>
      <p>Conversion Rate: {conversionRate.toFixed(2)}%</p>
      <h2>Top Performing Products</h2>
      <ul>
        {topProducts.map((product, index) => (
          <li key={index}>{product.name} - Sales: {product.sales}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsPage;