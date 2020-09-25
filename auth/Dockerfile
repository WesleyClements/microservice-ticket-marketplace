FROM node:lts

WORKDIR /app
COPY package*.json ./
RUN npm ci --only-prod
COPY . .

CMD ["npm", "start"]