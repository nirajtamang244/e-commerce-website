import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Our Products</h2>
      <div className="row">
        {products.map((p) => (
          <div key={p._id} className="col-md-4 mb-3">
            <Link to={`/product/${p._id}`} className="text-decoration-none text-dark">
            <div className="card h-100">
              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p>${p.price.toFixed(2)}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
