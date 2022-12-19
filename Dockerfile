FROM node:18-alpine

WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm install

COPY backend/ ./
RUN npm run build

COPY app/dist ./dist/public

EXPOSE 3000
CMD ["node", "dist/core.js"]
