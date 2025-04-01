import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Shop() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { updateCart } = useCart();
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    axios
      .get(
        query
          ? `${API_BASE_URL}/search?query=${query}`
          : `${API_BASE_URL}/products`
      )
      .then((response) => {
        let data = response.data;
        if (sortOrder === "lowToHigh") {
          data.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
          data.sort((a, b) => b.price - a.price);
        }
        setProducts(data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [location.search, sortOrder]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleIncrease = (productId) => {
    setQuantities((prev) => {
      const current = prev[productId] ?? 1;
      return { ...prev, [productId]: Math.min(50, current + 1) };
    });
  };

  const handleDecrease = (productId) => {
    setQuantities((prev) => {
      const current = prev[productId] ?? 1;
      return { ...prev, [productId]: Math.max(1, current - 1) };
    });
  };

  const handleQuantityChange = (productId, newVal) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.min(50, newVal) }));
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const quantity = quantities[productId] ?? 1;
    try {
      await axios.post(
        `${API_BASE_URL}/cart/add`,
        { productId, quantity },
        authHeader
      );
      updateCart();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="shop-container">
      <h1>Unser Sortiment</h1>

      <div className="shop__filters">
        <div className="shop__filters-left">
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="shop__sort-select input"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Preis aufsteigend</option>
            <option value="highToLow">Preis absteigend</option>
          </select>
        </div>
        <div className="shop__filters-right">
          <form className="shop__search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Suche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shop__search-input"
            />
            <button type="submit" className="shop__search-button">
              <img
                src="/images/icons/search-icon.png"
                alt="Search"
                className="shop__search-icon"
              />
            </button>
          </form>

        </div>
      </div>

      <div className="shop__grid">
        {products.map((product) => {
          const quantity = quantities[product.id] ?? 1;
          return (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantity}
              onDecrease={() => handleDecrease(product.id)}
              onIncrease={() => handleIncrease(product.id)}
              onQuantityChange={(newVal) => handleQuantityChange(product.id, newVal)}
              onAddToCart={() => handleAddToCart(product.id)}
              onClick={() => handleProductClick(product.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Shop;
