FROM node:alpine
WORKDIR /server/
COPY package.json .
RUN npm install
COPY app.js .
CMD ["node" , "app.js"]