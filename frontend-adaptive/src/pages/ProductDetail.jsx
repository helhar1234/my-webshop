import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import QuantityCounter from "../components/QuantityCounter";
import ProductPreview from "../components/ShopPreview";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { updateCart } = useCart();
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Laden des Produkts:", error);
      });
  }, [id]);

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, 50));
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleQuantityChange = (newVal) => {
    setQuantity(Math.min(newVal, 50));
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!product) return;
    try {
      await axios.post(
        `${API_BASE_URL}/cart/add`,
        { productId: product.id, quantity },
        authHeader
      );
      updateCart();
    } catch (error) {
      console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
    }
  };

  const [buttonState, setButtonState] = useState("default");
  
    const handleClick = (e) => {
      e.stopPropagation();
      setButtonState("loading");
  
      setTimeout(() => {
        setButtonState("success");
        setTimeout(() => {
          setButtonState("default");
        }, 1000); // Dauer der Check-Anzeige
      }, 800); // Dauer des Ladeeffekts
  
      handleAddToCart(); // Logik bleibt erhalten
    };

  if (!product) {
    return <p>Lädt...</p>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        <div className="product-detail__image">
          <img
            src={`/images/products/${product.name}.png`}
            alt={product.name}
          />
        </div>
        <div className="product-detail__info">
          <div className="product-detail__top">
            <h1 className="product-detail__name">{product.name}</h1>
            <p className="product-detail__price">Preis: {product.price} €</p>

          </div><p className="product-detail__description">{product.description}</p>
          <div className="product-detail__counter">
            <QuantityCounter
              value={quantity}
              onChange={handleQuantityChange}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
          </div>

          <button
      className={`button button--primary product-detail__add-to-cart ${buttonState}`}
      onClick={handleClick}
    >
      {buttonState === "loading" && (
        <span className="loader"></span>
      )}
      {buttonState === "success" && (
        <span className="check">✔</span>
      )}
      {buttonState === "default" && (
        <span>In den Warenkorb</span>
      )}
    </button>
        </div>
      </div>
      <div className="product-detail__preview">
        <h2>Weitere Produkte</h2>
        <ProductPreview />
      </div>
    </div>
  );
}

export default ProductDetail;
