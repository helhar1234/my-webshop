FROM node:20-alpine

WORKDIR /app

# package.json zuerst kopieren und installieren
COPY package*.json ./

RUN npm install

# Stelle sicher, dass esbuild korrekt installiert wird
RUN npm rebuild esbuild

COPY . .

# Für Adaptive-Frontend Port 3001, für Responsive-Frontend Port 3000
EXPOSE 3001

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3001"]
