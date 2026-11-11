
import { useEffect, useState } from "react";
import api from "./api";

function ProductList({ refresh, onProductUpdated }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("products/");
      setProducts(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`products/${id}/`);
      fetchProducts();
    } catch (err) {
      setError("Unable to delete product.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`products/${editingProduct.id}/`, {
        ...editingProduct,
        quantity: Number(editingProduct.quantity),
        cost_price: Number(editingProduct.cost_price),
        selling_price: Number(editingProduct.selling_price),
        low_stock_threshold: Number(editingProduct.low_stock_threshold),
      });

      setEditingProduct(null);
      fetchProducts();
      onProductUpdated();
    } catch (err) {
      setError(JSON.stringify(err.response?.data) || "Unable to update product.");
    }
  };

  return (
    <div>
      <h2>All Products</h2>

      {error && <p>{error}</p>}

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.quantity}</td>
                <td>{product.cost_price}</td>
                <td>{product.selling_price}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                    >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingProduct && (
        <div>
          <h3>Edit Product</h3>

          <form onSubmit={handleUpdate}>
            <input
              name="name"
              value={editingProduct.name}
              onChange={handleChange}
              required
            />

            <input
              name="sku"
              value={editingProduct.sku}
              onChange={handleChange}
              required
            />

            <input
              name="quantity"
              type="number"
              min="0"
              value={editingProduct.quantity}
              onChange={handleChange}
              required
            />

            <input
              name="cost_price"
              type="number"
              min="0"
              step="0.01"
              value={editingProduct.cost_price}
              onChange={handleChange}
              required
            />

            <input
              name="selling_price"
              type="number"
              min="0"
              step="0.01"
              value={editingProduct.selling_price}
              onChange={handleChange}
              required
            />

            <input
              name="low_stock_threshold"
              type="number"
              min="0"
              value={editingProduct.low_stock_threshold}
              onChange={handleChange}
              required
            />

            <button type="submit">Save Changes</button>

            <button
              type="button"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductList;
