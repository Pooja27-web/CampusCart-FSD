export default function OrderConfirmationPage() {
  const lastOrder = JSON.parse(localStorage.getItem("lastOrder")) || null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "20px"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        width: "100%",
        maxWidth: "700px",
        padding: "40px",
        textAlign: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
        }}
      >
        <h2 style={{
          fontWeight: "700",
          fontSize: "2rem",
          color: "#1a1a2e",
          marginBottom: "20px"
        }}>
          ✔ Order Confirmed!
        </h2>

        {lastOrder ? (
          <>
            <p style={{ fontSize: "1rem", color: "#555", marginBottom: "20px" }}>
              Thank you <strong>{lastOrder.name}</strong>, your order has been placed successfully.
            </p>

            {/* Customer Details */}
            <div style={{
              background: "#f8f9ff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              textAlign: "left",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <h4 style={{ marginBottom: "12px", color: "#333" }}>👤 Customer Details</h4>
              <p><strong>Name:</strong> {lastOrder.name}</p>
              <p><strong>Phone:</strong> {lastOrder.phone}</p>
              {lastOrder.altPhone && <p><strong>Alt Phone:</strong> {lastOrder.altPhone}</p>}
              <p><strong>Address:</strong> {lastOrder.address}</p>
            </div>

            {/* Payment + Total */}
            <div style={{
              background: "#fff8f0",
              border: "1px solid #ffe0b2",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              textAlign: "left"
            }}>
              <h4 style={{ marginBottom: "12px", color: "#e65100" }}>💳 Payment Summary</h4>
              <p><strong>Method:</strong> {lastOrder.paymentMethod}</p>
              <p style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1a1a2e" }}>
                Total: ₹{lastOrder.total}
              </p>
            </div>
          </>
        ) : (
          <p>No recent order found.</p>
        )}

        <button
          onClick={() => window.location.href = "/products"}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            color: "#fff",
            fontWeight: "700",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.3s ease"
          }}
        >
          🛍️ Continue Shopping
        </button>
      </div>
    </div>
  );
}
