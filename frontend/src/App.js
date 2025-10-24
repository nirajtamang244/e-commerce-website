import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useContext } from "react";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";
import { UserContext } from "./context/UserContext";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import LogoutModal from "./components/LogoutModal";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowLogout(true); 
    setTimeout(() => setShowLogout(false), 2000);
  };

  return (
    <Router>
      <div>
        <header className="bg-dark text-white py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <Link to="/" className="text-white text-decoration-none">
              <h2>E-Commerce Site</h2>
            </Link>

            <div>
              {/* If logged in */}
              {user ? (
                <>
                  <span className="me-3">Hello, {user.name}</span>
                  <button
                    className="btn btn-outline-light me-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline-light me-2"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline-light me-2"
                    onClick={() => setShowSignup(true)}
                  >
                    Signup{" "}
                  </button>
                </>
              )}

              <Link to="/cart" className="btn btn-outline-light me-2">
                {" "}
                🛒 Cart{" "}
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" className="btn btn-outline-warning">
                  ⚙️ Admin{" "}
                </Link>
              )}
            </div>
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

        <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
        <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
        <LogoutModal show={showLogout} onClose={() => setShowLogout(false)} />
      </div>
    </Router>
  );
}

export default App;
