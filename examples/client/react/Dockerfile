FROM node:alpine

WORKDIR /app/

COPY my-app/package.json .
RUN npm install

COPY my-app/ .

ENV PORT=8000
CMD ["npm", "start"]
