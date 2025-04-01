import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useAuth } from "../context/AuthContext";
import { useCart  } from "../context/CartContext";

function ShopPreview() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const { updateCart } = useCart();
  const token = localStorage.getItem("token");
const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

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
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.min(50, newVal),
    }));
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

  const handleViewAll = () => {
    navigate("/shop");
  };

  return (
    <div className="shop-preview container">
      <div className="d-none d-md-grid shop-preview__grid">
        {products.slice(0, 10).map((product) => {
          const quantity = quantities[product.id] ?? 1;
          return (
            <div key={product.id}>
              <ProductCard
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
            </div>
          );
        })}
      </div>

      <div className="d-md-none shop-preview__scroll">
        {products.slice(0, 10).map((product) => {
          const quantity = quantities[product.id] ?? 1;
          return (
            <div key={product.id} className="shop-preview__scroll-item">
              <ProductCard
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
            </div>
          );
        })}
      </div>

      <div className="shop-preview__view-all text-center mt-4">
        <button className="button button--primary" onClick={handleViewAll}>
          Weitere Produkte
        </button>
      </div>
    </div>
  );
}

export default ShopPreview;
