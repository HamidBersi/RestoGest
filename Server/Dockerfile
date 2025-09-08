# Dockerfile pour un projet Node/Express TypeScript (Server)
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# Dépendances
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Build TypeScript
FROM deps AS build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build || npm run build

# Image finale
FROM base AS prod
ENV NODE_ENV=production
RUN addgroup -S app && adduser -S app -G app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
RUN pnpm prune --prod
USER app
EXPOSE 4000
CMD ["node", "dist/index.js"]
