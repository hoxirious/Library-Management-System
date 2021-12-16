#Dockerfile
FROM node:12.18-alpine3.12

COPY $PWD /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80

CMD [ "npm", "start" ]