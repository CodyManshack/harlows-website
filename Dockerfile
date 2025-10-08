FROM node:alpine

WORKDIR /app

RUN npm i -g @quasar/cli

COPY . .
RUN npm install

CMD ["npx", "quasar", "dev"]
