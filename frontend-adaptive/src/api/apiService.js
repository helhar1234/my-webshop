import axios from "axios";

const API_URL = "http://localhost:5000"; // Dein Backend-Server

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Wichtig für Cookies (Session)
});

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

export const fetchProducts = async () => {
    const response = await apiClient.get("/products");
    return response.data;
};

export const searchProducts = async (query) => {
    const response = await apiClient.get(`/search?query=${query}`);
    return response.data;
};

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

export const checkout = async (cart) => {
    const response = await apiClient.post("/checkout", { cart });
    return response.data;
};
