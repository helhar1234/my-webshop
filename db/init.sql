-- Erstelle die Tabellen
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    UNIQUE (user_id, product_id)
);

CREATE TABLE session (
    sid VARCHAR PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);

-- Beispielprodukte hinzufügen
INSERT INTO products (name, description, price, stock) VALUES
('Tomaten', 'Frische Bio-Tomaten', 1.99, 100),
('Kartoffeln', 'Regionale Kartoffeln', 2.49, 50),
('Salat', 'Frischer Kopfsalat', 1.29, 30),
('Gurken', 'Knackige Gurken aus regionalem Anbau', 1.79, 80),
('Paprika', 'Bunte Paprika, reich an Vitaminen', 2.99, 60),
('Zwiebeln', 'Frische Zwiebeln für jede Küche', 1.19, 200),
('Knoblauch', 'Aromatischer Knoblauch', 0.99, 150),
('Karotten', 'Süße Bio-Karotten', 1.49, 120),
('Brokkoli', 'Frischer grüner Brokkoli', 2.59, 75),
('Blumenkohl', 'Gesunder Blumenkohl', 2.99, 65),
('Spinat', 'Frischer Blattspinat', 1.99, 40),
('Champignons', 'Weiße Champignons für jedes Gericht', 2.79, 55),
('Rote Beete', 'Gesunde Rote Beete', 1.89, 70),
('Süßkartoffeln', 'Nährstoffreiche Süßkartoffeln', 2.99, 90),
('Radieschen', 'Frische Radieschen', 1.49, 100),
('Lauch', 'Aromatischer Lauch', 2.29, 80),
('Rosenkohl', 'Kleiner grüner Rosenkohl', 2.99, 60),
('Kohlrabi', 'Milder Kohlrabi', 1.79, 90),
('Zucchini', 'Feine Zucchini aus biologischem Anbau', 1.99, 85),
('Sellerie', 'Knackiger Sellerie', 2.49, 70),
('Eisbergsalat', 'Frischer Eisbergsalat', 1.39, 50),
('Feldsalat', 'Gesunder Feldsalat', 1.79, 40),
('Chinakohl', 'Leichter Chinakohl', 2.19, 65),
('Rotkohl', 'Vitaminreicher Rotkohl', 2.59, 75),
('Weißkohl', 'Herzhafter Weißkohl', 2.39, 80),
('Avocado', 'Reife Avocado', 2.99, 50),
('Mango', 'Süße Mango aus fairem Handel', 3.49, 40),
('Banane', 'Bio-Bananen aus Südamerika', 1.99, 120),
('Äpfel', 'Saftige Äpfel aus der Region', 2.49, 200),
('Birnen', 'Reife Birnen mit feinem Geschmack', 2.79, 150),
('Pflaumen', 'Saisonale Pflaumen', 3.19, 60),
('Orangen', 'Vitamin-C-reiche Orangen', 2.99, 100),
('Zitronen', 'Saftige Zitronen', 1.49, 90),
('Kiwis', 'Süß-säuerliche Kiwis', 2.99, 80),
('Weintrauben', 'Frische Weintrauben', 3.49, 70),
('Ananas', 'Süße Ananas', 3.99, 30),
('Kokosnüsse', 'Exotische Kokosnüsse', 2.79, 20),
('Wassermelonen', 'Erfrischende Wassermelonen', 4.99, 25),
('Erdbeeren', 'Saisonale Erdbeeren', 3.99, 40),
('Himbeeren', 'Frische Himbeeren', 4.49, 35),
('Blaubeeren', 'Aromatische Blaubeeren', 4.29, 50),
('Johannisbeeren', 'Vitaminreiche Johannisbeeren', 3.99, 45),
('Brombeeren', 'Süß-herbe Brombeeren', 4.39, 30),
('Granatapfel', 'Gesunder Granatapfel', 2.99, 50),
('Feigen', 'Saftige Feigen', 3.79, 40),
('Datteln', 'Natürliche Süße Datteln', 4.99, 30),
('Maracuja', 'Exotische Maracuja', 3.99, 25),
('Kirschen', 'Saisonale Kirschen', 4.99, 50),
('Mandarinen', 'Leckere Mandarinen', 3.19, 60),
('Pfirsiche', 'Sonnengereifte Pfirsiche', 3.49, 45),
('Nektarinen', 'Saftige Nektarinen', 3.69, 55),
('Aprikosen', 'Frische Aprikosen', 3.29, 50),
('Zwetschgen', 'Aromatische Zwetschgen', 3.79, 40),
('Melonen', 'Sommerliche Honigmelonen', 4.49, 35);
('Rhabarber', 'Frischer Rhabarber', 2.49, 75),
('Bohnen', 'Grüne Bohnen aus biologischem Anbau', 1.99, 80),
('Erbsen', 'Süße Zuckererbsen', 2.29, 90),
('Mais', 'Frischer Bio-Mais', 1.89, 70),
('Zuckerschoten', 'Knackige Zuckerschoten', 2.59, 60),
('Aubergine', 'Frische Auberginen', 2.79, 50),
('Kürbis', 'Saisonal großer Kürbis', 3.29, 40),
('Rucola', 'Pikante Rucola-Blätter', 1.99, 80),
('Bohnenkraut', 'Aromatisches Bohnenkraut', 1.49, 100),
('Estragon', 'Frischer Estragon', 1.99, 60),
('Schnittlauch', 'Frischer Schnittlauch', 1.29, 120),
('Petersilie', 'Grüne Petersilie', 0.99, 150),
('Basilikum', 'Aromatisches Basilikum', 1.79, 130),
('Thymian', 'Frischer Thymian', 1.59, 110),
('Rosmarin', 'Würziger Rosmarin', 1.69, 100),
('Salbei', 'Aromatischer Salbei', 1.49, 90),
('Oregano', 'Italienischer Oregano', 1.39, 80),
('Minze', 'Frische Minze', 1.29, 95),
('Zitronenmelisse', 'Erfrischende Zitronenmelisse', 1.19, 85),
('Koriander', 'Frischer Koriander', 1.99, 70)



-- Beispielnutzer hinzufügen (Passwort gehasht mit bcrypt)
INSERT INTO users (username, password) VALUES
('admin', '$2a$10$AEB2lBo1lkvL48Mu8iuXf.H90b/lqGKfCpEPWQBOIF69NO/8.JXAq'); -- Passwort: "admin"
