# frontend-adaptive/Dockerfile (aber wird aus dem Root-Build-Kontext ausgeführt)

FROM node:20-alpine

WORKDIR /app

# Kopiere package.json aus dem richtigen Ordner
COPY frontend-adaptive/package*.json ./

RUN npm install

# Optional: wenn esbuild o. ä. Probleme macht
RUN npm rebuild esbuild

# Kopiere den restlichen Code aus dem richtigen Subfolder
COPY frontend-adaptive/. .

EXPOSE 3001

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3001"]
