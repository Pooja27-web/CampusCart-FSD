import { Link, useNavigate } from "react-router-dom";   // ✅ add useNavigate
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";   //  import CSS for styling

export default function Navbar() {
  const { cart } = useContext(CartContext);

  //  state for search input
  const [query, setQuery] = useState("");

  //  initialize navigate
  const navigate = useNavigate();

  //  handler for search form
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/products?search=${query}`);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "#002D72", padding: "1rem" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Left side: CampusCart brand */}
        <Link
          className="navbar-brand nav-link-custom"
          to="/"
          style={{ fontSize: "1.6rem", fontWeight: "bold" }}
        >
          <h1>CampusCart</h1>
        </Link>

        {/*  Centered Search bar */}
        <form className="d-flex mx-auto navbar-search" onSubmit={handleSearch}>
          <input
            className="form-control navbar-search-bar"
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>

        {/* Right side: links */}
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav me-3">
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/orders">History</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/cart">
                🛒 Cart({cart.length})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
