FROM node:alpine

RUN mkdir /app
WORKDIR /app

RUN npm i -g @quasar/cli

COPY package.json .
RUN npm install

COPY . .

CMD ["npx", "quasar", "dev"]
