import { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function ProductDetailPage() {
  const { id } = useParams(); // gets the product ID from the URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`https://e-commerce-website-backend-wy5z.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h4 className="text-success">${product.price.toFixed(2)}</h4>

          <button className="btn btn-primary mt-3" onClick={() => addToCart(product, 1)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
