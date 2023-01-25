FROM node:16.14.1

WORKDIR /app/test

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start"]