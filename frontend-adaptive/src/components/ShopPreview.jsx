import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useAuth } from "../context/AuthContext";
import { ArrowRight } from "lucide-react";

function ShopPreview() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const [maxProducts, setMaxProducts] = useState(10);
  const token = localStorage.getItem("token");
const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
  
  useEffect(() => {
    const updateMaxProducts = () => {
      setMaxProducts(window.innerWidth <= 480 ? 5 : 10);
    };

    updateMaxProducts(); // initial check
    window.addEventListener("resize", updateMaxProducts);
    return () => window.removeEventListener("resize", updateMaxProducts);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) =>
        console.error("Error fetching products:", error)
      );
  }, []);

  // Increase quantity
  const handleIncrease = (productId) => {
    setQuantities((prev) => {
      const current = prev[productId] ?? 1;
      return { ...prev, [productId]: Math.min(50, current + 1) };
    });
  };

  // Decrease quantity
  const handleDecrease = (productId) => {
    setQuantities((prev) => {
      const current = prev[productId] ?? 1;
      return { ...prev, [productId]: Math.max(1, current - 1) };
    });
  };

  const handleQuantityChange = (productId, newVal) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.min(50, newVal),
    }));
  };

  // Add product to cart
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
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Navigate to product detail
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Button: View All Products
  const handleViewAll = () => {
    navigate("/shop");
  };

  return (
    <div className="shop-preview">
      <div className="shop-preview__grid">
        {products.slice(0, maxProducts).map((product) => {
          const quantity = quantities[product.id] ?? 1;
          return (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantity}
              onDecrease={() => handleDecrease(product.id)}
              onIncrease={() => handleIncrease(product.id)}
              onQuantityChange={(newVal) =>
                handleQuantityChange(product.id, newVal)
              }
              onAddToCart={() => handleAddToCart(product.id)}
              onClick={() => handleProductClick(product.id)}
            />
          );
        })}
      </div>
      <div className="shop-preview__view-all">
        <button className="button button--primary" onClick={handleViewAll}>
          <span>Weitere Produkte</span>
          <ArrowRight size={18} className="product-card__icon" />
        </button>
      </div>
    </div>
  );
}

export default ShopPreview;
