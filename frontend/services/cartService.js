const API_URL = "http://localhost:5000/api";

/**
 * 🔹 Produkt zum Warenkorb hinzufügen (Frontend-Speicherung + API)
 * @param {number} productId - ID des Produkts
 * @param {number} quantity - Anzahl der Produkte
 */
export async function addToCart(productId, quantity = 1) {
    let cart = getCart();
    
    // Prüfen, ob Produkt schon im Warenkorb ist
    const existingProduct = cart.find(item => item.productId === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    // Speichern im localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optional: API-Call zum Backend (Falls persistenter Warenkorb gewünscht)
    await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity })
    });

    console.log("✅ Produkt zum Warenkorb hinzugefügt:", cart);
}

/**
 * 🔹 Warenkorb abrufen (lokal)
 * @returns {Array} - Liste der Produkte im Warenkorb
 */
export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/**
 * 🔹 Warenkorb vom Backend abrufen
 */
export async function fetchCartFromServer() {
    const response = await fetch(`${API_URL}/cart`);
    return response.json();
}

/**
 * 🔹 Produkt aus dem Warenkorb entfernen
 * @param {number} productId - ID des Produkts
 */
export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);

    // Speichern im localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("🗑 Produkt aus Warenkorb entfernt:", cart);
}

/**
 * 🔹 Warenkorb leeren
 */
export function clearCart() {
    localStorage.removeItem("cart");

    // API-Call zum Backend
    fetch(`${API_URL}/cart/clear`, {
        method: "DELETE"
    });

    console.log("🗑 Warenkorb geleert");
}

/**
 * 🔹 Checkout durchführen
 */
export async function checkout() {
    const cart = getCart();

    const response = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart })
    });

    const result = await response.json();
    
    if (result.success) {
        console.log("✅ Bestellung erfolgreich:", result);
        clearCart();
    } else {
        console.error("❌ Fehler beim Checkout:", result);
    }
}
