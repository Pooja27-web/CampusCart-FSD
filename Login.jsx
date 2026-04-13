import { useState, useEffect } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup" | "logout"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("currentUser");
    if (loggedIn && user) {
      setCurrentUser(user);
      setMode("logout");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const userInfo = users[email];

    if (userInfo && userInfo.password === password) {
      localStorage.setItem("currentUser", email);
      localStorage.setItem("isLoggedIn", true);
      setCurrentUser(email);
      setMode("logout");
      alert("Login successful!");
      window.location.href = "/products";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      alert("User already exists. Please login.");
      setMode("login");
    } else {
      users[email] = { email, password, orders: [] };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! Please login.");
      setMode("login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    setCurrentUser(null);
    setMode("login");
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "20px"
    }}>
      <div style={{
        background: "#faf1f1",
        borderRadius: "16px",
        boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        padding: "40px",
        textAlign: "center",
        transition: "transform 0.2s ease, box-shadow 0.2s ease"
      }}>
        {/* Logo */}
        <img
          src="public_images/Campus.png"
          alt="CampusCart Logo"
          style={{ width: "80px", marginBottom: "20px", borderRadius: "12px" }}
        />

        {mode === "login" && (
          <>
            <h2 style={{ fontWeight: "700", fontSize: "1.8rem", color: "#1a1a2e", marginBottom: "20px" }}>
              🔐 Login to CampusCart
            </h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "16px", textAlign: "left" }}>
                <label style={{ fontSize: "0.85rem", color: "#555", fontWeight: "600" }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "10px",
                    border: "1px solid #ddd", marginTop: "6px", fontSize: "0.95rem"
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div style={{ marginBottom: "20px", textAlign: "left" }}>
                <label style={{ fontSize: "0.85rem", color: "#555", fontWeight: "600" }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "10px",
                    border: "1px solid #ddd", marginTop: "6px", fontSize: "0.95rem"
                  }}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" style={{
                width: "100%", padding: "12px", borderRadius: "10px", border: "none",
                background: "linear-gradient(90deg, #667eea, #764ba2)", color: "#fff",
                fontWeight: "700", fontSize: "1rem", cursor: "pointer"
              }}>
                Login
              </button>
            </form>
            <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "#666" }}>
              Don't have an account? <span
                onClick={() => setMode("signup")}
                style={{ color: "#667eea", fontWeight: "600", cursor: "pointer" }}
              >Sign up</span>
            </p>
          </>
        )}

        {mode === "signup" && (
          <>
            <h2 style={{ fontWeight: "700", fontSize: "1.8rem", color: "#1a1a2e", marginBottom: "20px" }}>
              📝 Sign up for CampusCart
            </h2>
            <form onSubmit={handleSignup}>
              <div style={{ marginBottom: "16px", textAlign: "left" }}>
                <label style={{ fontSize: "0.85rem", color: "#555", fontWeight: "600" }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "10px",
                    border: "1px solid #ddd", marginTop: "6px", fontSize: "0.95rem"
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div style={{ marginBottom: "20px", textAlign: "left" }}>
                <label style={{ fontSize: "0.85rem", color: "#555", fontWeight: "600" }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "10px",
                    border: "1px solid #ddd", marginTop: "6px", fontSize: "0.95rem"
                  }}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" style={{
                width: "100%", padding: "12px", borderRadius: "10px", border: "none",
                background: "linear-gradient(90deg, #667eea, #764ba2)", color: "#fff",
                fontWeight: "700", fontSize: "1rem", cursor: "pointer"
              }}>
                Sign up
              </button>
            </form>
            <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "#666" }}>
              Already have an account? <span
                onClick={() => setMode("login")}
                style={{ color: "#667eea", fontWeight: "600", cursor: "pointer" }}
              >Login</span>
            </p>
          </>
        )}

        {mode === "logout" && (
          <>
            <h2 style={{ fontWeight: "700", fontSize: "1.8rem", color: "#1a1a2e", marginBottom: "20px" }}>
              👋 Welcome back, {currentUser}
            </h2>
            <button onClick={handleLogout} style={{
              width: "100%", padding: "12px", borderRadius: "10px", border: "none",
              background: "linear-gradient(90deg, #667eea, #764ba2)", color: "#fff",
              fontWeight: "700", fontSize: "1rem", cursor: "pointer"
            }}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
