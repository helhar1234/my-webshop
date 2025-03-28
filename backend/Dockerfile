FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Kein fixer Port im EXPOSE!
EXPOSE 10000

CMD ["node", "src/server.js"]
