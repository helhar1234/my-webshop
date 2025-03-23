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
('Tomaten', 'Frische, reife Bio-Tomaten, perfekt für Salate oder Saucen. Diese Tomaten kommen aus regionalem Anbau und bieten einen süßen, aromatischen Geschmack.', 1.99, 100),
('Kartoffeln', 'Regionale Kartoffeln, ideal für jedes Gericht – sei es für Bratkartoffeln, Püree oder einfach als Beilage. Sie sind frisch und von bester Qualität.', 2.49, 50),
('Salat', 'Frischer, knackiger Kopfsalat, der jedes Gericht bereichert. Der Salat ist zart, gesund und eignet sich hervorragend für Salate oder als Beilage.', 1.29, 30),
('Gurken', 'Knackige Gurken, die aus regionalem Anbau stammen. Sie sind besonders saftig und eignen sich perfekt für frische Salate oder als Snack.', 1.79, 80),
('Paprika', 'Bunte Paprika, die reich an Vitaminen und Antioxidantien sind. Diese Paprika haben einen frischen Geschmack und eine knackige Textur.', 2.99, 60),
('Zwiebeln', 'Frische Zwiebeln, die sich in jeder Küche bewähren. Sie sind vielseitig verwendbar und bringen sowohl in herzhaften Gerichten als auch in Salaten Geschmack.', 1.19, 200),
('Knoblauch', 'Aromatischer Knoblauch, der in vielen Küchen weltweit verwendet wird. Er verleiht jedem Gericht eine intensive, würzige Note.', 0.99, 150),
('Karotten', 'Süße, saftige Bio-Karotten, die besonders knackig und frisch sind. Sie eignen sich hervorragend für Salate, Suppen oder als Snack.', 1.49, 120),
('Brokkoli', 'Frischer, grüner Brokkoli, der nicht nur lecker ist, sondern auch eine Vielzahl an Vitaminen und Mineralien bietet. Er kann gedämpft, gekocht oder roh genossen werden.', 2.59, 75),
('Blumenkohl', 'Gesunder Blumenkohl, der reich an Vitaminen und Ballaststoffen ist. Er eignet sich hervorragend für pürierte Suppen oder als Gemüsebeilage.', 2.99, 65),
('Spinat', 'Frischer Blattspinat, der besonders nährstoffreich ist. Er kann roh in Salaten oder gekocht in einer Vielzahl von Gerichten genossen werden.', 1.99, 40),
('Champignons', 'Weiße Champignons, die in vielen Gerichten verwendet werden. Sie haben einen milden, angenehmen Geschmack und eine zarte Textur.', 2.79, 55),
('Rote Beete', 'Gesunde Rote Beete, die voller Nährstoffe steckt. Sie hat einen erdigen Geschmack und ist eine ideale Zutat für Salate oder als Beilage.', 1.89, 70),
('Süßkartoffeln', 'Nährstoffreiche Süßkartoffeln, die reich an Vitaminen und Mineralien sind. Sie haben einen süßeren Geschmack und eignen sich gut zum Backen oder Pürieren.', 2.99, 90),
('Radieschen', 'Frische Radieschen mit einem scharfen, aber erfrischenden Geschmack. Sie sind perfekt für Salate oder als gesunder Snack.', 1.49, 100),
('Lauch', 'Aromatischer Lauch, der ein leicht süßes und mildes Aroma hat. Er eignet sich für Suppen, Eintöpfe oder als Gemüsebeilage.', 2.29, 80),
('Rosenkohl', 'Kleiner, grüner Rosenkohl, der für seinen milden Geschmack und seine gesundheitsfördernden Eigenschaften bekannt ist. Er ist eine perfekte Beilage für herzhafte Gerichte.', 2.99, 60),
('Kohlrabi', 'Milder Kohlrabi, der knackig und erfrischend ist. Er kann roh als Snack oder gekocht in verschiedenen Gerichten verwendet werden.', 1.79, 90),
('Zucchini', 'Feine Zucchini aus biologischem Anbau, die eine zarte Textur und einen milden Geschmack bieten. Sie eignen sich hervorragend für Pfannengerichte oder gegrillt.', 1.99, 85),
('Sellerie', 'Knackiger Sellerie, der in vielen Gerichten als Basis oder als Beilage verwendet wird. Er ist bekannt für seinen frischen Geschmack und seine Vielseitigkeit.', 2.49, 70),
('Eisbergsalat', 'Frischer Eisbergsalat, der besonders knackig und erfrischend ist. Er eignet sich hervorragend für Salate oder als Beilage zu Sandwiches.', 1.39, 50),
('Feldsalat', 'Gesunder Feldsalat, der besonders zart und aromatisch ist. Er eignet sich hervorragend für frische Salate und liefert wertvolle Nährstoffe.', 1.79, 40),
('Chinakohl', 'Leichter Chinakohl, der in asiatischen Gerichten oft verwendet wird. Er hat eine feine Textur und einen milden Geschmack.', 2.19, 65),
('Rotkohl', 'Vitaminreicher Rotkohl, der vor allem für seine gesunden Inhaltsstoffe bekannt ist. Er eignet sich hervorragend für Eintöpfe oder als Beilage zu Fleischgerichten.', 2.59, 75),
('Weißkohl', 'Herzhafter Weißkohl, der besonders in der Winterküche beliebt ist. Er hat einen kräftigen Geschmack und eignet sich für Krautsalate oder Eintöpfe.', 2.39, 80),
('Avocado', 'Reife, cremige Avocados, die vollgepackt mit gesunden Fetten sind. Sie eignen sich hervorragend für Salate, Sandwiches oder als Basis für Guacamole.', 2.99, 50),
('Mango', 'Süße, aromatische Mango aus fairem Handel. Sie hat ein saftiges, tropisches Aroma und eignet sich sowohl für Desserts als auch für exotische Salate.', 3.49, 40),
('Banane', 'Bio-Bananen aus Südamerika, die besonders süß und voll von Energie sind. Sie sind ein idealer Snack für zwischendurch und liefern wichtige Nährstoffe.', 1.99, 120),
('Äpfel', 'Saftige Äpfel aus der Region, die frischen, süßen Geschmack bieten. Sie eignen sich sowohl zum direkten Verzehr als auch für Kuchen und andere Süßspeisen.', 2.49, 200),
('Birnen', 'Reife Birnen mit einem feinen, süßen Geschmack. Sie sind besonders saftig und können sowohl frisch als auch in Desserts oder Kuchen genossen werden.', 2.79, 150),
('Pflaumen', 'Saisonale Pflaumen, die süß und leicht säuerlich im Geschmack sind. Sie eignen sich hervorragend für Marmeladen, Kompott oder einfach als Snack.', 3.19, 60),
('Orangen', 'Vitamin-C-reiche Orangen, die einen erfrischenden, süßen Geschmack bieten. Sie sind perfekt zum Saften oder zum direkten Verzehr.', 2.99, 100),
('Zitronen', 'Saftige Zitronen, die für ihren intensiven, erfrischenden Geschmack bekannt sind. Sie sind perfekt für Getränke, Desserts oder als Zutat in herzhaften Gerichten.', 1.49, 90),
('Kiwis', 'Süß-säuerliche Kiwis, die voller Vitamine und Antioxidantien stecken. Sie eignen sich für Obstsalate, Smoothies oder als Snack.', 2.99, 80),
('Weintrauben', 'Frische, saftige Weintrauben, die sowohl als Snack als auch in Obstsalaten genossen werden können. Sie haben einen süßen Geschmack und sind eine gute Quelle für Vitamine.', 3.49, 70),
('Ananas', 'Süße, saftige Ananas, die einen tropischen, erfrischenden Geschmack bietet. Sie eignet sich hervorragend für frische Fruchtsalate oder als Zutat in Desserts.', 3.99, 30),
('Kokosnüsse', 'Exotische Kokosnüsse, die reich an natürlichen Fetten und Nährstoffen sind. Das Fruchtfleisch ist besonders saftig und eignet sich für Getränke oder Desserts.', 2.79, 20),
('Wassermelonen', 'Erfrischende Wassermelonen, die einen hohen Wassergehalt und einen süßen Geschmack bieten. Sie sind ideal für heiße Sommertage als Snack oder in Salaten.', 4.99, 25),
('Erdbeeren', 'Saisonale Erdbeeren, die besonders süß und saftig sind. Sie eignen sich hervorragend für Desserts, Kuchen oder einfach als frischer Snack.', 3.99, 40),
('Himbeeren', 'Frische Himbeeren, die sowohl süß als auch leicht säuerlich im Geschmack sind. Sie sind perfekt für Obstsalate, Desserts oder als Topping für Joghurt.', 4.49, 35),
('Blaubeeren', 'Aromatische Blaubeeren, die voller Antioxidantien sind. Sie eignen sich hervorragend für Smoothies, Desserts oder einfach als gesunder Snack.', 4.29, 50),
('Johannisbeeren', 'Vitaminreiche Johannisbeeren, die einen leicht säuerlichen Geschmack bieten. Sie sind perfekt für Marmeladen, Säfte oder als frische Beilage.', 3.99, 45),
('Brombeeren', 'Süß-herbe Brombeeren, die einen intensiven Geschmack haben. Sie sind ideal für Desserts, Marmeladen oder einfach als Snack.', 4.39, 30),
('Granatapfel', 'Gesunder Granatapfel, der voller Vitamine steckt. Das saftige Fruchtfleisch ist ideal für Salate oder als Snack.', 2.99, 50),
('Feigen', 'Saftige Feigen, die einen süßen, einzigartigen Geschmack haben. Sie sind hervorragend für Desserts oder als Zutat in herzhaften Gerichten.', 3.79, 40),
('Datteln', 'Natürliche Süße Datteln, die einen besonders süßen Geschmack haben. Sie sind ein perfekter Snack oder können in Gebäck und Desserts verwendet werden.', 4.99, 30),
('Maracuja', 'Exotische Maracuja, die einen intensiven, erfrischenden Geschmack bietet. Sie eignet sich hervorragend für Säfte, Desserts oder als Zutat in Smoothies.', 3.99, 25),
('Kirschen', 'Saisonale Kirschen, die süß und saftig sind. Sie eignen sich hervorragend für Obstsalate, Marmeladen oder als süßer Snack.', 4.99, 50),
('Mandarinen', 'Leckere Mandarinen, die einen süßen, erfrischenden Geschmack bieten. Sie sind perfekt zum direkten Verzehr oder als Zutat in Salaten.', 3.19, 60),
('Pfirsiche', 'Sonnengereifte Pfirsiche, die besonders süß und saftig sind. Sie eignen sich hervorragend für Obstsalate oder Desserts.', 3.49, 45),
('Nektarinen', 'Saftige Nektarinen, die einen süßen und aromatischen Geschmack bieten. Sie sind perfekt für Desserts oder zum direkten Verzehr.', 3.69, 55),
('Aprikosen', 'Frische Aprikosen, die einen süßen, fruchtigen Geschmack haben. Sie sind ideal für Marmeladen, Kuchen oder als Snack.', 3.29, 50),
('Zwetschgen', 'Aromatische Zwetschgen, die besonders süß und saftig sind. Sie eignen sich hervorragend für Marmeladen, Kuchen oder als Snack.', 3.79, 40),
('Melonen', 'Sommerliche Honigmelonen, die besonders süß und erfrischend sind. Sie sind perfekt für heiße Tage oder als Zutat in Obstsalaten.', 4.49, 35),
('Rhabarber', 'Frischer Rhabarber, der für seinen säuerlichen Geschmack bekannt ist. Er eignet sich hervorragend für Kuchen, Kompott oder Marmelade.', 2.49, 75),
('Bohnen', 'Grüne Bohnen aus biologischem Anbau, die besonders zart und frisch sind. Sie eignen sich hervorragend als Beilage oder in Eintöpfen.', 1.99, 80),
('Erbsen', 'Süße Zuckererbsen, die besonders zart und lecker sind. Sie eignen sich hervorragend für Salate, Eintöpfe oder als Beilage.', 2.29, 90),
('Mais', 'Frischer Bio-Mais, der besonders süß und saftig ist. Er eignet sich hervorragend als Beilage oder in Salaten.', 1.89, 70),
('Zuckerschoten', 'Knackige Zuckerschoten, die einen süßen, frischen Geschmack bieten. Sie sind ideal für Salate oder als Snack.', 2.59, 60),
('Aubergine', 'Frische Auberginen, die besonders zart und aromatisch sind. Sie eignen sich hervorragend für mediterrane Gerichte oder gegrillt.', 2.79, 50),
('Kürbis', 'Saisonal großer Kürbis, der besonders süß und nahrhaft ist. Er eignet sich perfekt für Kürbissuppen oder als Beilage zu herzhaften Gerichten.', 3.29, 40),
('Rucola', 'Pikante Rucola-Blätter, die mit ihrem scharfen Geschmack jedes Gericht verfeinern. Sie sind besonders in Salaten oder als Pizzabelag beliebt.', 1.99, 80),
('Bohnenkraut', 'Aromatisches Bohnenkraut, das vielen Gerichten eine besondere Würze verleiht. Es eignet sich hervorragend für Bohnen- und Eintopfgerichte.', 1.49, 100),
('Estragon', 'Frischer Estragon, der mit seinem intensiven, leicht bitteren Geschmack ideal für Saucen, insbesondere zu Fischgerichten, ist.', 1.99, 60),
('Schnittlauch', 'Frischer Schnittlauch, der in vielen Gerichten verwendet wird. Er hat einen milden Zwiebelgeschmack und eignet sich besonders gut für Salate oder als Garnierung.', 1.29, 120),
('Petersilie', 'Grüne Petersilie, die frisch und aromatisch ist. Sie eignet sich hervorragend als Garnierung oder in Suppen und Saucen.', 0.99, 150),
('Basilikum', 'Aromatisches Basilikum, das in der mediterranen Küche sehr beliebt ist. Es eignet sich hervorragend für Pesto, Salate oder als Garnierung für Pasta.', 1.79, 130),
('Thymian', 'Frischer Thymian, der für sein würziges, leicht holziges Aroma bekannt ist. Er eignet sich hervorragend für Fleischgerichte, Suppen und Eintöpfe.', 1.59, 110),
('Rosmarin', 'Würziger Rosmarin, der besonders gut zu gebratenem Fleisch oder Kartoffeln passt. Er hat einen intensiven Duft und Geschmack.', 1.69, 100),
('Salbei', 'Aromatischer Salbei, der einen starken, würzigen Geschmack hat. Er eignet sich hervorragend für Fleischgerichte oder als Zutat in Saucen.', 1.49, 90),
('Oregano', 'Italienischer Oregano, der mit seinem würzigen Geschmack jedes mediterrane Gericht verfeinert. Er eignet sich besonders für Pizza oder Pasta.', 1.39, 80),
('Minze', 'Frische Minze, die besonders erfrischend und aromatisch ist. Sie eignet sich hervorragend für Tees, Desserts oder frische Salsas.', 1.29, 95),
('Zitronenmelisse', 'Erfrischende Zitronenmelisse, die mit ihrem zarten Zitronengeschmack jedes Gericht verfeinert. Sie ist ideal für Tees oder in Salaten.', 1.19, 85),
('Koriander', 'Frischer Koriander, der in vielen internationalen Küchen eine wichtige Rolle spielt. Er hat einen einzigartigen Geschmack und eignet sich für Currys, Salsas oder asiatische Gerichte.', 1.99, 70);




-- Beispielnutzer hinzufügen (Passwort gehasht mit bcrypt)
INSERT INTO users (username, password) VALUES
('admin', '$2a$10$AEB2lBo1lkvL48Mu8iuXf.H90b/lqGKfCpEPWQBOIF69NO/8.JXAq'); -- Passwort: "admin"
