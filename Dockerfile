FROM node:latest as node
WORKDIR /app
COPY . . 
RUN npm install npm@latest -g

RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/angular-app /usr/share/nginx/html