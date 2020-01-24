FROM nginx:stable
MAINTAINER Woka Aditama  "woka@alterra.id"

RUN mkdir -p /var/www/gundam-front
RUN mkdir -p /var/logs/nginx

COPY default.conf /etc/nginx/conf.d/
COPY . /var/www/gundam-front

WORKDIR /var/www/gundam-front
