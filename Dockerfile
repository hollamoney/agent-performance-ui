FROM nginx:alpine
COPY --from=node /dist/agent-performance-ui /usr/share/nginx/html