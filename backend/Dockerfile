FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install --save -dev nodemon

CMD [ "npm","run","start" ]