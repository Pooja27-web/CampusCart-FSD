import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  //  Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
          🛒 Your Shopping Cart
        </h2>
        <p style={{ color: "#666", fontSize: "0.95rem" }}>
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
        </p>
        <div style={{
          width: "60px", height: "4px",
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          borderRadius: "2px", margin: "12px auto 0"
        }} />
      </div>

      {cart.length > 0 ? (
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          padding: "20px"
        }}>
          {cart.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: i < cart.length - 1 ? "1px dashed #eee" : "none"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {item.image && (
                  <img src={item.image} alt={item.name} style={{
                    width: "50px", height: "50px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #eee"
                  }} />
                )}
                <div>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "0.95rem", color: "#222" }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#888" }}>₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Total + Actions */}
          <div style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "2px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "1rem", color: "#555" }}>Total</span>
            <span style={{ fontWeight: "700", fontSize: "1.2rem", color: "#1a1a2e" }}>₹{total}</span>
          </div>

          <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
            <button
              onClick={clearCart}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "#e74c3c",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Clear Cart
            </button>
            <button
              onClick={() => window.location.href = "/payment"}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🛒</div>
          <h4 style={{ color: "#555", fontWeight: "600" }}>Your cart is empty</h4>
          <p style={{ color: "#aaa" }}>Browse products and add items to your cart.</p>
        </div>
      )}
    </div>
  );
}
