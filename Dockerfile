FROM nginx:alpine
COPY --from=node /app/dist/angular-app /usr/share/nginx/html