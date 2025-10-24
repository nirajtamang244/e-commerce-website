function LogoutModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal-backdrop d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255,255,255,0.9)",
        zIndex: 1000,
      }}
    >
      <div className="card p-4 shadow text-center" style={{ width: "400px" }}>
        <h4 className="mb-3 text-success">✅ Logged Out</h4>
        <p>You have been logged out successfully.</p>
        <button className="btn btn-primary mt-2" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default LogoutModal;
