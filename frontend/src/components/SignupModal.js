import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function SignupModal({ show, onClose }) {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/users/register", {
        name,
        email,
        password,
      });
      setUser(res.data);
      onClose();
    } catch (err) {
      setError("Signup failed. Try a different email.");
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
        <h4 className="mb-3 text-center">Create Account</h4>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit" className="btn btn-success w-100">
            Sign Up
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

export default SignupModal;
