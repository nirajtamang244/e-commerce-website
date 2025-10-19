import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Loasd cart from localStorage when app starts
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Saves the cart to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Adds the item to cart
  const addToCart = (product, qty = 1) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  // Removes the item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // Update quantity
  const updateQty = (id, qty) => {
    setCart(cart.map((item) => (item._id === id ? { ...item, qty } : item)));
  };

  // Clears the cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
