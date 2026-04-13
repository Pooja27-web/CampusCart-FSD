import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
      <input
        type="text"
        placeholder="Search for products, brands and more"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", flex: 1 }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>
        🔍
      </button>
    </form>
  );
}
