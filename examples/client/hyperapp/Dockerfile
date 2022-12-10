FROM nginx:alpine

# from https://github.com/FreedomBen/nginx-docker
RUN sed -i -e '/location.*\/.*{/a autoindex on\;' /etc/nginx/conf.d/default.conf

ENV PATH_NGINX_SERVE=/usr/share/nginx/html
RUN rm /usr/share/nginx/html/*.html
COPY . ${PATH_NGINX_SERVE}
