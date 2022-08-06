FROM nginx:alpine
COPY --from=node /app/dist/agent-performance-ui /usr/share/nginx/html