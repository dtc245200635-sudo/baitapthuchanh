# Multi-stage / Production-ready Nginx image for Portfolio
FROM nginx:1.25-alpine

# Metadata
LABEL maintainer="Ban Duc Duy <dtc245200635@student.edu.vn>"
LABEL description="Personal Portfolio - Mon Trien khai va Quan tri He thong Phan mem"

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy web static assets
COPY index.html /usr/share/nginx/html/index.html

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
