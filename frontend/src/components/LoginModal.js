import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function LoginModal({ show, onClose }) {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/users/login", {
        email,
        password,
      });
      setUser(res.data);
      onClose();
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="modal-backdrop d-flex justify-content-center align-items-center" style={{
      position: "fixed",
      top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(255,255,255,0.9)",
      zIndex: 1000
    }}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h4 className="mb-3 text-center">Login</h4>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary w-100 mt-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
