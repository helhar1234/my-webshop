FROM node:18

WORKDIR /app

# Copy only the package files first to cache dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code, including src/
COPY . .

# Optional: print dir structure for debug
# RUN ls -la /app && ls -la /app/src

EXPOSE 5000

# Start the server
CMD ["node", "src/server.js"]
