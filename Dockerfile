FROM node:18-alpine as frontend

WORKDIR /home/node/app
COPY app/package*.json ./
RUN npm install

COPY app/ ./
RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm install

COPY backend/ ./
RUN npm run build

COPY --from=frontend /home/node/app/dist ./dist/public

EXPOSE 3000
CMD ["node", "dist/core.js"]
