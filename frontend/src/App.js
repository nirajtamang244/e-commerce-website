import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import { Link } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <Router>
      <div>
        <header className="bg-dark text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
        <h2>E-Commerce Site</h2>
        </Link>
        <Link to="/cart" className="btn btn-outline-light"> 🛒 Cart </Link>
        <Link to="/admin" className="btn btn-outline-warning">⚙️ Admin </Link>
        </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
