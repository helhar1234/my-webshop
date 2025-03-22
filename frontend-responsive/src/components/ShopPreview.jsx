import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useAuth } from "../context/AuthContext";

function ShopPreview() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
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
        "http://localhost:5000/api/cart/add",
        { productId, quantity },
        { withCredentials: true }
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
    <div className="shop-preview container">
      {/* Desktop Grid */}
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

      {/* Mobile Scroll */}
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
