
import { useState } from "react";
import api from "./api";

function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    quantity: "",
    cost_price: "",
    selling_price: "",
    low_stock_threshold: 5,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("products/", {
        ...formData,
        quantity: Number(formData.quantity),
        cost_price: Number(formData.cost_price),
        selling_price: Number(formData.selling_price),
        low_stock_threshold: Number(formData.low_stock_threshold),
      });

      setMessage("Product added successfully!");

      setFormData({
        name: "",
        sku: "",
        description: "",
        quantity: "",
        cost_price: "",
        selling_price: "",
        low_stock_threshold: 5,
      });

      onProductAdded();
    } catch (error) {
      setMessage(
        JSON.stringify(error.response?.data) ||
        "Unable to add product."
      );
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name"
          value={formData.name} onChange={handleChange} required />

        <input name="sku" placeholder="SKU"
          value={formData.sku} onChange={handleChange} required />

        <input name="description" placeholder="Description"
          value={formData.description} onChange={handleChange} />

        <input name="quantity" type="number" min="0"
          placeholder="Quantity"
          value={formData.quantity} onChange={handleChange} required />

        <input name="cost_price" type="number" min="0" step="0.01"
          placeholder="Cost Price"
          value={formData.cost_price} onChange={handleChange} required />

        <input name="selling_price" type="number" min="0" step="0.01"
          placeholder="Selling Price"
          value={formData.selling_price} onChange={handleChange} required />

        <input name="low_stock_threshold" type="number" min="0"
          placeholder="Low Stock Threshold"
          value={formData.low_stock_threshold}
          onChange={handleChange} required />

        <button type="submit">Add Product</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default ProductForm;
