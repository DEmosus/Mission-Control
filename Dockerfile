FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY nasa-front-end/package*.json nasa-front-end/
RUN npm install --prefix nasa-front-end

COPY nasa-back-end/package*.json nasa-back-end/
RUN npm install --prefix nasa-back-end --only=production

COPY nasa-front-end/ nasa-front-end/
RUN npm run build --prefix nasa-front-end

COPY nasa-back-end/ nasa-back-end/
USER node

CMD ["npm", "start", "--prefix", "nasa-back-end"]

EXPOSE 8000