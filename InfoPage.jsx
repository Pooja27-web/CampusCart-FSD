import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InfoPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSaveInfo = () => {
    //  Load existing users or create empty object
    const users = JSON.parse(localStorage.getItem("users")) || {};

    //  Save this user’s info keyed by their email
    users[email] = {
      name,
      phone,
      address,
      email,
      orders: users[email]?.orders || [] // keep past orders if they exist
    };

    //  Write back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    //  Mark current logged-in user
    localStorage.setItem("currentUser", email);
    localStorage.setItem("isLoggedIn", "true");

    //  Go to payment page
    navigate("/payment");
  };

  return (
    <div className="info-page p-3">
      <h2>Enter Your Information</h2>
      <input
        type="text"
        placeholder="Full Name"
        className="form-control mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="form-control mb-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <textarea
        placeholder="Delivery Address"
        className="form-control mb-2"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSaveInfo}>
        Save & Continue
      </button>
    </div>
  );
}
