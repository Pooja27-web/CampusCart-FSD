import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useEffect, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";
import "./products.css"; 

export default function ProductsPage() {
  const { addToCart } = useContext(CartContext);
  const [filter, setFilter] = useState("all");

  //  Popup state
  const [showPopup, setShowPopup] = useState(false);

  //  Collapsible filter state
  const [filterOpen, setFilterOpen] = useState(true);

  //  read search query from URL
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  //  local search state synced with URL
  const [search, setSearch] = useState(searchQuery);

  // keep local state in sync if URL changes
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  //  update URL whenever user types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      navigate("/products"); // clear query
    } else {
      navigate(`/products?search=${value}`);
    }
  };

  //  filter products by category + search (multi-field)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === "all" || p.category === filter;
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        (p.description &&
          p.description.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  //  clear search: reset state + URL
  const handleClear = () => {
    setSearch("");
    navigate("/products");
  };

  //  Wrap addToCart with popup logic
  const handleAddToCart = (product) => {
    addToCart(product); // existing cart logic
    setShowPopup(true); // show popup
    setTimeout(() => setShowPopup(false), 2000); // hide after 2s
  };

  return (
    <div className="products-page d-flex">
      {/* Sidebar filter with toggle */}
      <div className="filter-sidebar p-3 border-end">
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          {filterOpen ? "Hide Categories ▲" : "Show Categories ▼"}
        </button>

        <div className={`filter-content ${filterOpen ? "open" : "closed"}`}>
          <h4>Filter by Category</h4>
          {["all", "books", "pens", "gadgets", "essentials","Pencils"].map((cat) => (
            <button
              key={cat}
              className={`btn w-100 mb-2 ${
                filter === cat ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="products-container flex-grow-1 p-3">
        {/*  Search bar */}
        <div className="mb-3 position-relative">
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2 search-bar"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
            />
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        <div className="row">
          {filteredProducts.map((product, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">₹{product.price}</p>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && <p>No products found.</p>}
        </div>
      </div>

      {/*  Popup message */}
      {showPopup && (
        <div className="popup-message">
          ✅ Added to cart successfully!
        </div>
      )}
    </div>
  );
}
