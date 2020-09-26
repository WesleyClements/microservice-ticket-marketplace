FROM node:lts

WORKDIR /app
COPY package*.json ./
RUN npm ci --only-prod
COPY . .

RUN npx next telemetry disable

CMD ["npm", "start"]