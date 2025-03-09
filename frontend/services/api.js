const API_URL = "http://localhost:5000/api";

/** Produkte abrufen */
export async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
}

/** Produkt suchen */
export async function searchProducts(query) {
    const response = await fetch(`${API_URL}/search?query=${query}`);
    return response.json();
}

/** Benutzer einloggen */
export async function login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

/** Benutzer registrieren */
export async function register(username, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

/** Produkt in den Warenkorb legen */
export async function addToCart(productId, quantity) {
    const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity })
    });
    return response.json();
}

/** Warenkorb abrufen */
export async function getCart() {
    const response = await fetch(`${API_URL}/cart`);
    return response.json();
}

/** Warenkorb leeren */
export async function clearCart() {
    const response = await fetch(`${API_URL}/cart/clear`, {
        method: "DELETE"
    });
    return response.json();
}

/** Checkout durchführen */
export async function checkout(cart) {
    const response = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart })
    });
    return response.json();
}
