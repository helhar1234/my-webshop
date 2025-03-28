import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import QuantityCounter from "../components/QuantityCounter";
import ProductPreview from "../components/ShopPreview";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function ProductDetail() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Produkt-ID aus URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  // Menge erhöhen
  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, 50));
  };

  // Menge verringern
  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  // Direktwert ändern
  const handleQuantityChange = (newVal) => {
    setQuantity(Math.min(newVal, 50));
  };

  // Produkt in den Warenkorb legen
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
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
    }
  };

  if (!product) {
    return <p>Lädt...</p>;
  }

  return (
    <div className="product-detail mt-5">
      <div className="container">
        <div className="row g-4 product-detail__container">
          {/* Bild */}
          <div className="col-12 col-lg-6 product-detail__image">
            <img
              src={`/images/products/${product.name}.png`}
              alt={product.name}
            />
          </div>

          {/* Produktinfos */}
          <div className="col-12 col-lg-6">
            <div className="product-detail__info">
              <div className="product-detail__header">
                <h1 className="product-detail__name">{product.name}</h1>
                <p className="product-detail__price">{product.price} €</p>
              </div>

              <p className="product-detail__description">{product.description}</p>

              <div className="product-detail__purchase">
                <div className="product-detail__counter">
                  <QuantityCounter
                    value={quantity}
                    onChange={handleQuantityChange}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                  />
                </div>

                <button
                  className="button button--primary product-detail__add-to-cart"
                  onClick={handleAddToCart}
                >
                  In den Warenkorb
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="product-detail__preview">
          <h2>Weitere Produkte</h2>
          <ProductPreview />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
