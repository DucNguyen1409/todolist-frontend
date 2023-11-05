FROM node:20-alpine3.17 as node
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build
FROM nginx:alpine
COPY --from=node /usr/local/app/build /usr/share/nginx/html
EXPOSE 80