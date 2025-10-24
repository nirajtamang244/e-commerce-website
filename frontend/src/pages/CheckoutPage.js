import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = 5;
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const orderData = {
        orderItems: cart.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      // Send order to backend (you can replace token with real user later)
      const res = await axios.post(
        "https://e-commerce-website-backend-wy5z.onrender.com/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer fake_user_token_for_now`,
          },
        }
      );

      clearCart();
      navigate(`/order-confirmation/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Shipping Address</h4>
          <input
            type="text"
            placeholder="Address"
            className="form-control mb-2"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="City"
            className="form-control mb-2"
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="form-control mb-2"
            value={shippingAddress.postalCode}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                postalCode: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Country"
            className="form-control mb-2"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
          />

          <h4 className="mt-3">Payment Method</h4>
          <select
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>

          <button
            className="btn btn-success mt-4"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          {cart.map((item) => (
            <div key={item._id} className="border-bottom py-2">
              <p>
                {item.name} × {item.qty} = ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
          <h5 className="mt-3">Items: ${itemsPrice.toFixed(2)}</h5>
          <h5>Shipping: ${shippingPrice.toFixed(2)}</h5>
          <h5>Total: ${totalPrice.toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
