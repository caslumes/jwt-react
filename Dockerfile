FROM node:alpine

WORKDIR /tmp/react

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run docker

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

WORKDIR /

RUN rm -rf /tmp/react