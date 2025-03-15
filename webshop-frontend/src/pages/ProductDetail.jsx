// ProductDetail.js
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams(); // Produkt-ID aus URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Einzelnes Produkt laden, z. B. /api/products/42
        axios
            .get(`http://localhost:5000/api/products/${id}`)
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

    // Produkt in den Warenkorb legen
    const handleAddToCart = async () => {
        if (!product) return;
        try {
            await axios.post(
                "http://localhost:5000/api/cart/add",
                { productId: product.id, quantity },
                { withCredentials: true }
            );
            alert("Produkt zum Warenkorb hinzugefügt!");
        } catch (error) {
            console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
        }
    };

    if (!product) {
        return <p>Lädt...</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img
                src={`/images/products/${product.name}.png`}
                alt={product.name}
                width="100"
                height="80"
            />
            <p>Preis: {product.price} €</p>
            <p>Beschreibung: {product.description}</p>

            <div>
                <button onClick={handleDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
            </div>

            <button onClick={handleAddToCart}>In den Warenkorb</button>
        </div>
    );
}

export default ProductDetail;
