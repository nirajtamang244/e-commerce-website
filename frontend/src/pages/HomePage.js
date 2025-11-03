import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-website-backend-wy5z.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="mt-3">
      {/* ===== HERO ===== */}
      **<section className="hero">
        <div
          className="hero-card"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1600&auto=format&fit=crop')"
          }}
        >
          <div className="hero-inner">
            <h1 className="hero-title">Summer Arrival of Outfit</h1>
            <p className="hero-sub">Discover quality fashion that reflects your style and makes everyday enjoyable.</p>
            <button className="hero-cta">Explore Product →</button>
          </div>
        </div>
      </section>

      {/* ===== MINI PROMOS (2) ===== */}
      <section className="promos">
        <div className="promo">
          <div>
            <div className="promo-title">Where dreams meet couture</div>
            <button className="promo-btn">Shop Now</button>
          </div>
          <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=600&auto=format&fit=crop" alt="" width="120" style={{borderRadius:12}} />
        </div>
        <div className="promo">
          <div>
            <div className="promo-title">Enchanting styles for every women</div>
            <button className="promo-btn">Shop Now</button>
          </div>
          <img src="https://images.unsplash.com/photo-1549478570-18e4e90d03f3?q=80&w=600&auto=format&fit=crop" alt="" width="120" style={{borderRadius:12}} />
        </div>
      </section>

      {/* ===== CATEGORIES STRIP ===== */}
      <section className="section">
        <h3>Browse by categories</h3>
        <div className="categories">
          <div className="cat"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop" alt="shoes" /><span className="badge">SHOES</span></div>
          <div className="cat"><img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop" alt="brush" /><span className="badge">BRUSH</span></div>
          <div className="cat"><img src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=400&auto=format&fit=crop" alt="bag" /><span className="badge">BAG</span></div>
          <div className="cat"><img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=400&auto=format&fit=crop" alt="tshirt" /><span className="badge">T-SHIRT</span></div>
        </div>
      </section>**

      {/* ===== PRODUCTS ===== */}
      <section className="section">
        <h3>Popular products</h3>
        <div className="grid">
          {products.map((p) => (
            <div key={p._id} className="card">
              <Link to={`/product/${p._id}`} className="text-decoration-none text-dark">
                <img src={p.image} alt={p.name} />
                <div className="card-body">
                  <div className="card-title">{p.name}</div>
                  <div className="card-price">${p.price.toFixed(2)}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
