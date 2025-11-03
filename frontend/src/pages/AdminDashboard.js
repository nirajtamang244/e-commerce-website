import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // For handling image upload (Base64 conversion)
const [imageData, setImageData] = useState("");

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setImageData(reader.result); // Base64 string
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};



  useEffect(() => {
    // Replace this token with your real admin token from Postman
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDgwN2MyYTVkYThhZWI0NTBiMTUxMCIsImlhdCI6MTc2MjEzNTU4NywiZXhwIjoxNzYyNzQwMzg3fQ.MUMySctJ8iOJCbuIHRy8p2SqkayM1S4TYzT3P-bT8vY";
    const fetchData = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([
          axios.get("https://e-commerce-website-backend-wy5z.onrender.com/api/products"),
          axios.get("https://e-commerce-website-backend-wy5z.onrender.com/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProducts(productRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin data.");
      }
    };

    fetchData();
  }, []);

  // ✅ Function to add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: e.target.name.value,
      description: e.target.description.value,
      price: parseFloat(e.target.price.value),
      image: imageData,
      category: e.target.category.value,
      countInStock: parseInt(e.target.countInStock.value),
    };

    try {
      const res = await axios.post("https://e-commerce-website-backend-wy5z.onrender.com/api/products", newProduct);
      setProducts([...products, res.data]);
      e.target.reset();
      alert("✅ Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      {error && <p className="text-danger">{error}</p>}

      {/* ================== ADD PRODUCT FORM ================== */}
      <section className="mt-4">
        <h4>Add New Product</h4>
        <form onSubmit={handleAddProduct}>
          <div className="row">
            <div className="col-md-6">
              <input name="name" placeholder="Name" className="form-control mb-2" required />
              <input
                name="description"
                placeholder="Description"
                className="form-control mb-2"
                required
              />
              <input
                name="price"
                placeholder="Price"
                type="number"
                step="0.01"
                className="form-control mb-2"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="file"
                accept="image/*"
                className="form-control mb-2"
                onChange={(e) => handleImageUpload(e)}
                required
              />

              <input
                name="category"
                placeholder="Category"
                className="form-control mb-2"
                required
              />
              <input
                name="countInStock"
                placeholder="Stock Count"
                type="number"
                className="form-control mb-2"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            ➕ Add Product
          </button>
        </form>
      </section>

      {/* ================== PRODUCTS SECTION ================== */}
      <section className="mt-5">
        <h4>Products</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => alert("Edit functionality coming soon!")}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={async () => {
                      try {
                        await axios.delete(`https://e-commerce-website-backend-wy5z.onrender.com/api/products/${p._id}`);
                        setProducts(products.filter((x) => x._id !== p._id));
                        alert("🗑️ Product deleted!");
                      } catch (err) {
                        alert("❌ Delete failed.");
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================== ORDERS SECTION ================== */}
      <section className="mt-5">
        <h4>Orders</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{o.user?.name || "N/A"}</td>
                <td>${o.totalPrice.toFixed(2)}</td>
                <td>{o.isPaid ? "✅" : "❌"}</td>
                <td>{o.isDelivered ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;
