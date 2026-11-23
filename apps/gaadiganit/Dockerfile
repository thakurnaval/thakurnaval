# GaadiGanit — static PWA served by nginx on Cloud Run.
# Build context: apps/gaadiganit (this folder), so it works unchanged in its own repo.

# ── Stage 1: test and build ──────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Manifests first so the npm install layer is cached between builds
COPY package.json package-lock.json ./
COPY packages/engine/package.json packages/engine/
COPY web/package.json web/
RUN npm ci

COPY defaults defaults
COPY packages packages
COPY web web
RUN npm run build -w @gaadiganit/web

# ── Stage 2: serve ───────────────────────────────────────────────────────────
FROM nginx:alpine AS runner
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/web/dist /usr/share/nginx/html

# Cloud Run sends traffic to 8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
