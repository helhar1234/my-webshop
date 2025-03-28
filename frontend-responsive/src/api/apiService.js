import axios from "axios";

const API_URL = "${API_BASE_URL}"; // Dein Backend-Server

// API Client mit Session-Cookies
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Wichtig für Cookies (Session)
});

// 🔹 Authentifizierung
export const registerUser = async (username, password) => {
    const response = await apiClient.post("/auth/register", { username, password });
    return response.data;
};

export const loginUser = async (username, password) => {
    const response = await apiClient.post("/auth/login", { username, password });
    return response.data;
};

export const logoutUser = async () => {
    await apiClient.post("/auth/logout");
};

export const getProfile = async () => {
    const response = await apiClient.get("/auth/profile");
    return response.data;
};

// 🔹 Produkte abrufen
export const fetchProducts = async () => {
    const response = await apiClient.get("/products");
    return response.data;
};

// 🔹 Produktsuche
export const searchProducts = async (query) => {
    const response = await apiClient.get(`/search?query=${query}`);
    return response.data;
};

// 🔹 Warenkorb-Handling
export const addToCart = async (productId, quantity) => {
    const response = await apiClient.post("/cart/add", { productId, quantity });
    return response.data;
};

export const getCart = async () => {
    const response = await apiClient.get("/cart");
    return response.data;
};

export const clearCart = async () => {
    const response = await apiClient.delete("/cart/clear");
    return response.data;
};

// 🔹 Checkout
export const checkout = async (cart) => {
    const response = await apiClient.post("/checkout", { cart });
    return response.data;
};
