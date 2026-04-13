import { useState, useEffect } from "react";

export default function PaymentPage() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  //  Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleConfirmPayment = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all required details.");
      return;
    }

    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const userInfo = users[currentUser];

    if (userInfo) {
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        paymentMethod,
        address,
        customer: { name, phone, altPhone },
        items: cart,
      };
      userInfo.orders = [...(userInfo.orders || []), newOrder];
      users[currentUser] = userInfo;
      localStorage.setItem("users", JSON.stringify(users));
    }

    //  Clear cart after payment
    localStorage.removeItem("cart");

    //  Save last order for confirmation page
    localStorage.setItem("lastOrder", JSON.stringify({
      name, phone, altPhone, address, paymentMethod, total
    }));

    window.location.href = "/order-confirmation";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#fff",
          marginBottom: "8px"
        }}>
          💳 Payment Details
        </h2>
        <div style={{
          width: "60px", height: "4px",
          background: "#fff",
          borderRadius: "2px", margin: "12px auto 0"
        }} />
      </div>

      {cart.length > 0 ? (
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          padding: "30px"
        }}>
          <h4 style={{ marginBottom: "20px", color: "#333" }}>🛍️ Order Summary</h4>
          {cart.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                <span style={{ fontWeight: "600", color: "#222" }}>{item.name}</span>
              </div>
              <span style={{ fontWeight: "700", color: "#667eea" }}>₹{item.price}</span>
            </div>
          ))}

          <div style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "2px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <span style={{ fontSize: "1rem", color: "#555" }}>Total</span>
            <span style={{ fontWeight: "700", fontSize: "1.2rem", color: "#1a1a2e" }}>₹{total}</span>
          </div>

          {/* Customer Details */}
          <h4 style={{ marginTop: "30px", color: "#333" }}>👤 Customer Details</h4>
          <div style={{ marginTop: "10px", textAlign: "left" }}>
            <label>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "6px", borderRadius: "8px", border: "1px solid #ddd" }}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div style={{ marginTop: "10px", textAlign: "left" }}>
            <label>Phone *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "6px", borderRadius: "8px", border: "1px solid #ddd" }}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div style={{ marginTop: "10px", textAlign: "left" }}>
            <label>Alternative Phone</label>
            <input
              type="text"
              value={altPhone}
              onChange={(e) => setAltPhone(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "6px", borderRadius: "8px", border: "1px solid #ddd" }}
              placeholder="Enter alternative phone number"
            />
          </div>
          <div style={{ marginTop: "10px", textAlign: "left" }}>
            <label>Address *</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "6px", borderRadius: "8px", border: "1px solid #ddd" }}
              placeholder="Enter your delivery address"
              required
            />
          </div>

          {/* Payment Method */}
          <h4 style={{ marginTop: "30px", color: "#333" }}>💳 Payment Method</h4>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{
              width: "100%", padding: "12px", borderRadius: "10px",
              border: "1px solid #ddd", marginTop: "10px"
            }}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
          </select>

          <button
            onClick={handleConfirmPayment}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
             Confirm Payment
          </button>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#fff" }}>Your cart is empty.</p>
      )}
    </div>
  );
}
