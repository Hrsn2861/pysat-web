FROM node:12.10.0

RUN npm config set chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
RUN npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
RUN npm config set registry=https://registry.npm.taobao.org

ENV WEB=/opt/web

WORKDIR $WEB

COPY package.json $WEB
COPY package-lock.json $WEB
RUN npm install

COPY . $WEB
RUN npm run build

FROM nginx:1.16.1

ENV NGINX=/opt/app

WORKDIR $NGINX

COPY --from=0 /opt/web/dist dist
COPY nginx/ nginx/

RUN rm -r /etc/nginx/conf.d \
 && ln -s $NGINX/nginx /etc/nginx/conf.d

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
