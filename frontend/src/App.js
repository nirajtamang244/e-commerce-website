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
        <header className="site-header">
          <nav className="navbar">
            <Link to="/" className="brand">
              <span className="brand-logo">PF</span>
              <span className="brand-name">PaFan</span>
            </Link>

            <form className="search" onSubmit={(e)=>e.preventDefault()}>
              <input placeholder="Search products…" />
              <button type="submit">Search</button>
            </form>

            <div className="actions">
              {user ? (
                <>
                  <span className="btn">Hello, {user.name}</span>
                  <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline" onClick={() => setShowLogin(true)}>Login</button>
                  <button className="btn btn-outline" onClick={() => setShowSignup(true)}>Sign Up</button>
                </>
              )}
              <Link to="/cart" className="cart">🛒 Cart</Link>
              {user?.isAdmin && (
                <Link to="/admin" className="btn btn-outline">⚙️ Admin</Link>
              )}
            </div>
          </nav>
        </header>

        <main style={{maxWidth: "1200px", margin: "0 auto", padding: "0 20px"}}>
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
