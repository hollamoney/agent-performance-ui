FROM node:latest as node
WORKDIR /app
COPY . . 
RUN npm install source-map-resolve
RUN npm audit fix
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/angular-app /usr/share/nginx/html