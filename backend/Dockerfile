FROM node:18
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/. .
EXPOSE 10000
CMD ["node", "src/server.js"]
