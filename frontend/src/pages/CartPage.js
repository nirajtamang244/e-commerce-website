import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item._id} className="d-flex align-items-center border p-3 mb-2">
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
            className="me-3"
          />
          <div className="flex-grow-1">
            <h5>{item.name}</h5>
            <p>${item.price.toFixed(2)}</p>
            <input
              type="number"
              value={item.qty}
              min="1"
              onChange={(e) => updateQty(item._id, parseInt(e.target.value))}
              className="form-control w-25"
            />
          </div>
          <button
            className="btn btn-danger ms-3"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>
      ))}
      <h4>Total: ${total.toFixed(2)}</h4>
      <button className="btn btn-secondary mt-3 me-2" onClick={clearCart}>
        Clear Cart
      </button>
      <button className="btn btn-success mt-3">Proceed to Checkout</button>
    </div>
  );
}

export default CartPage;
