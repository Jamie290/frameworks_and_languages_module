FROM nginx:alpine

ENV PATH_NGINX_SERVE=/usr/share/nginx/html
RUN curl https://unpkg.com/vue@3/dist/vue.global.js -L -o ${PATH_NGINX_SERVE}/vue.global.js
COPY . ${PATH_NGINX_SERVE}
