FROM node:20-alpine

WORKDIR /app

# Kopiere package.json aus dem korrekten Unterordner (vom Root aus)
COPY frontend-responsive/package*.json ./

RUN npm install

# Falls esbuild benötigt wird
RUN npm rebuild esbuild

# Jetzt den gesamten Code aus dem Ordner kopieren
COPY frontend-responsive/. .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
