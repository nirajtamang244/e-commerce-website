import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer fake_user_token_for_now`,
        },
      })
      .then((res) => setOrder(res.data))
      .catch((err) => console.error("Error fetching order:", err));
  }, [id]);

  if (!order) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4 text-center">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Order ID: {order._id}</p>
      <h4 className="mt-4">Shipping to: {order.shippingAddress.address}</h4>
      <p>
        Total: <strong>${order.totalPrice.toFixed(2)}</strong>
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
}

export default OrderConfirmationPage;
