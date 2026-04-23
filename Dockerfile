# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy manifests first so Docker can cache the npm install layer
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Inject our SPA-friendly config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run injects PORT (default 8080) — nginx.conf listens on 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
