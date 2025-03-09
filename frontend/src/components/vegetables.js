import { fetchProducts } from "../../services/api.js"; // Importiere die API-Funktion

async function loadVegetablesSection() {
    try {
        const products = await fetchProducts(); // API-Aufruf
        console.log(products);
        const container = document.getElementById("vegetables");

        if (!products || products.length === 0) {
            container.innerHTML = "<p>Keine Produkte gefunden.</p>";
            return;
        }

        // Nur die ersten 10 Produkte anzeigen
        const selectedProducts = products.slice(0, 8);

        // HTML für die Produktanzeige erstellen
        const productHTML = selectedProducts.map(product => `
            <div class="box_section">
                <div class="image_4">
                    <img src="../../public/images/products/${product.name}.png" 
                         alt="${product.name}" 
                         onerror="this.src='../../public/images/products/default.png'">
                </div>
                <h2 class="dolor_text">$<span style="color: #ebc30a;">${product.price}</span></h2>
                <h2 class="dolor_text">${product.name}</h2>
                <h2 class="dolor_text_1">${product.stock} in stock</h2>
                <p class="tempor_text">${product.description}</p>
                <div class="buy_bt_1"><a href="#" onclick="addToCart(${product.id}, 1)">Buy Now</a></div>
            </div>
        `).join(""); 

        container.innerHTML = `
            <div class="vegetables_section layout_padding">
                <div class="container">
                    <div class="image_2"><img src="../../public/images/logos/img-2.png"></div>
                    <h1 class="about_taital">Our Vegetables</h1>
                    <p class="lorem_text">Fresh and organic vegetables just for you!</p>
                    <div class="vegetables_section_2">${productHTML}</div>
                    <div class="read_bt_1"><a href="shop.html">View All</a></div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("❌ Fehler beim Laden der Produkte:", error);
        document.getElementById("vegetables").innerHTML = "<p>Fehler beim Laden der Produkte.</p>";
    }
}

// Funktion nach dem Laden des DOMs ausführen
document.addEventListener("DOMContentLoaded", loadVegetablesSection);
