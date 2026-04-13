
// src/pages/Home.jsx
import "./HomePage.css";
import "../components/Navbar.css"; // Import for popup styling
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";


export default function Home() {
const { addToCart } = useContext(CartContext);
const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");

const handleAddToCart = (product) => {
  addToCart(product);
  setPopupMessage(`✅ ${product.name} added to cart!`);
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 2000);
};

  return (
    <div className="home-container">
      <br />
      <h1>Welcome to CampusCart</h1>
      <p>Your one-stop shop for student essentials.</p>

      {/* Bootstrap Carousel */}
      <div className="carousel-wrapper">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="public_images/shopping.webp" className="d-block w-100" alt="CampusCart banner 1" />
            </div>
            <div className="carousel-item">
              <img src="public_images/Pen.webp" className="d-block w-100" alt="CampusCart banner 2" />
            </div>
            <div className="carousel-item">
              <img src="public_images/Blue.jpg" className="d-block w-100" alt="CampusCart banner 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="category-links">
          <div className="category-card">📚 Books</div>
          <div className="category-card">✏️ Stationery</div>
          <div className="category-card">💻 Gadgets</div>
          <div className="category-card">🎒 Essentials</div>
        </div>
      </div>
    <div className="offers-section">
  <h2>Special Offers</h2>
  <div className="offer-banner">
    🎉 Flat 20% off on all Stationery this week!
  </div>
</div>

    {/* Popular Products Section */}
<div className="products-section">
  <h2>Popular Products</h2>
  <div className="products-grid">
    <div className="product-card">
      <img src="public_images/shopping.webp" alt="Notebook" />
      <h3>Notebook</h3>
      <p>₹120</p>
      <button onClick={() => handleAddToCart({ name: "Notebook", price: 120 })}>
  Add to Cart
</button>

    </div>
    <div className="product-card">
      <img src="public_images/Pen.webp" alt="Pen" />
      <h3>Pen Pack</h3>
      <p>₹50</p>
      <button onClick={() => handleAddToCart({ name: "Pen Pack ", price: 50 })}>
  Add to Cart
</button>

    </div>
    <div className="product-card">
      <img src="public_images/BagPack.jpg" alt="Backpack" />
      <h3>Backpack</h3>
      <p>₹999</p>
      <button onClick={() => handleAddToCart({ name: "BagPack", price: 999 })}>
  Add to Cart
</button>

    </div>
    <div className="product-card">
      <img src="public_images/Headphone.jpg" alt="Headphones" />
      <h3>Headphones</h3>
      <p>₹1499</p>
      <button onClick={() => handleAddToCart({ name: "Headphones", price: 1499 })}>
  Add to Cart
</button>
    </div>
     <div className="product-card">
      <img src="public_images/calcy.jpg" alt="Calculator" />
      <h3>Scientific Calculator</h3>
      <p>₹499</p>
      <button onClick={() => handleAddToCart({ name: "Scientific Calculator", price: 499 })}>
  Add to Cart
</button>
    </div>
    <div className="product-card">
      <img src="public_images/Water.jpg" alt="Water Bottle" />
      <h3>Water Bottle</h3>
      <p>₹199</p>
       <button onClick={() => handleAddToCart({ name: "Water Bottle", price: 199 })}>
  Add to Cart
</button>
    </div>
    <div className="product-card">
      <img src="public_images/Pencils.jpg" alt="Laptop Stand" />
      <h3>Pencil</h3>
      <p>₹60</p>
      <button onClick={() => handleAddToCart({ name: "Pencil", price: 60 })}>
  Add to Cart
</button>
    </div>
    <div className="product-card">
      <img src="public_images/PowerBank.jpg" alt="Power Bank" />
      <h3>Power Bank</h3>
      <p>₹1299</p>
      <button onClick={() => handleAddToCart({ name: "Power Bank", price: 1299 })}>
  Add to Cart
</button>
    </div>
  </div>
  </div>
  {/* Offers Section */}


{/* Footer Section */}
<footer className="footer">
  <div className="footer-links">
    <a href="#">About Us</a>
    <a href="#">Contact</a>
    <a href="#">Privacy Policy</a>
    <a href="#">Terms & Conditions</a>
  </div>
  <div className="footer-socials">
    <span>Follow us:</span>
    <a href="#">Facebook</a>
    <a href="#">Instagram</a>
    <a href="#">Twitter</a>
  </div>
  <p className="footer-copy">© 2026 CampusCart. All rights reserved.</p>
</footer>

{/* Popup message */}
{showPopup && (
  <div className="popup-message">
    {popupMessage}
  </div>
)}

</div>



  );
}