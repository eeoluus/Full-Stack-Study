FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN apk add xdg-utils

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
