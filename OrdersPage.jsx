import { useState, useEffect } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const userInfo = users[currentUser];
    if (userInfo?.orders) {
      setOrders(userInfo.orders);
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#1a1a2e",
          marginBottom: "8px"
        }}>
          🛍️ Your Order History
        </h2>
        <p style={{ color: "#666", fontSize: "0.95rem" }}>
          {orders.length} order{orders.length !== 1 ? "s" : ""} placed
        </p>
        <div style={{
          width: "60px", height: "4px",
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          borderRadius: "2px", margin: "12px auto 0"
        }} />
      </div>

      {orders.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto"
        }}>
          {orders.map((order) => (
            <div key={order.id} style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.14)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              {/* Card Top Banner */}
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ color: "#fff", fontWeight: "700", fontSize: "0.95rem" }}>
                  Order #{order.id}
                </span>
                <span style={{
                  background: "rgba(255,255,255,0.25)",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "600"
                }}>
                  ✔ Confirmed
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px" }}>

                {/* Order Meta */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    background: "#f8f9ff",
                    borderRadius: "10px",
                    padding: "10px 14px"
                  }}>
                    <p style={{ fontSize: "0.7rem", color: "#888", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Date</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "#333", margin: 0 }}>{order.date}</p>
                  </div>
                  <div style={{
                    background: "#f8f9ff",
                    borderRadius: "10px",
                    padding: "10px 14px"
                  }}>
                    <p style={{ fontSize: "0.7rem", color: "#888", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Payment</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "#333", margin: 0 }}>{order.paymentMethod}</p>
                  </div>
                </div>

                {/* Address */}
                {order.address && (
                  <div style={{
                    background: "#fff8f0",
                    border: "1px solid #ffe0b2",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    marginBottom: "16px"
                  }}>
                    <p style={{ fontSize: "0.7rem", color: "#e65100", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>📍 Address</p>
                    <p style={{ fontSize: "0.85rem", color: "#555", margin: 0 }}>{order.address}</p>
                  </div>
                )}

                {/* Items */}
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Items Ordered</p>
                  {order.items.map((item, i) => (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "8px 0",
                      borderBottom: i < order.items.length - 1 ? "1px dashed #eee" : "none"
                    }}>
                      {item.image && (
                        <img src={item.image} alt={item.name} style={{
                          width: "44px", height: "44px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #eee"
                        }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: "600", fontSize: "0.9rem", color: "#222" }}>{item.name}</p>
                      </div>
                      <span style={{
                        fontWeight: "700",
                        fontSize: "0.9rem",
                        color: "#667eea"
                      }}>₹{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{
                  marginTop: "14px",
                  paddingTop: "12px",
                  borderTop: "2px solid #f0f0f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ color: "#888", fontSize: "0.85rem" }}>Total</span>
                  <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "#1a1a2e" }}>
                    ₹{order.items.reduce((sum, item) => sum + Number(item.price), 0)}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🛒</div>
          <h4 style={{ color: "#555", fontWeight: "600" }}>No orders yet</h4>
          <p style={{ color: "#aaa" }}>Your completed orders will appear here.</p>
        </div>
      )}
    </div>
  );
}