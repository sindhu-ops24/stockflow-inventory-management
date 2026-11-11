import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import api from "./api";
import ProductForm from "./ProductForm";

function Dashboard() {
  const [refresh, setRefresh] = useState(0);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      const response = await api.get("dashboard/");
      setDashboard(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load dashboard.");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!dashboard) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>StockFlow Dashboard</h1>

    <div className="stats-container">
        <div className="stat-card">
            <h3>Total Products</h3>
            <h2>{dashboard.total_products}</h2>
        </div>

        <div className="stat-card">
            <h3>Total Stock Quantity</h3>
            <h2>{dashboard.total_stock_quantity}</h2>
        </div>

        <div className="stat-card">
            <h3>Low Stock Products</h3>
            <h2>{dashboard.low_stock_products}</h2>
        </div>
    </div>

      <ProductForm
        onProductAdded={() => {
         fetchDashboard();
         setRefresh((prev) => prev + 1);
        }}
     />

     <ProductList
         refresh={refresh}
        onProductUpdated={fetchDashboard}
    />

      <h3>Low Stock Items</h3>

      {dashboard.low_stock_items.length === 0 ? (
        <p>No low-stock products.</p>
      ) : (
        <ul>
          {dashboard.low_stock_items.map((product) => (
            <li key={product.id}>
              {product.name} - SKU: {product.sku} -
              Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
