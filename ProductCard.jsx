// src/components/ProductCard.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css"; // For popup styling

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    addToCart(product); // Add to cart context
    setShowPopup(true); // Show popup
    setTimeout(() => setShowPopup(false), 2000); // Hide after 2 seconds
  };

  return (
    <>
      <div className="card" style={{ width: "18rem", margin: "1rem" }}>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">₹{product.price}</p>
          <button className="btn btn-success w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Popup message */}
      {showPopup && (
        <div className="popup-message">
          ✅ {product.name} added to cart!
        </div>
      )}
    </>
  );
}
