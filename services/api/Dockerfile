# 1) BUILD: install all deps, generate client, compile
FROM node:22-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Prisma schema BEFORE generate
COPY prisma ./prisma
RUN npx prisma generate

# BUILD
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

# 2) RUNTIME: copy built app + node_modules from builder, then prune dev deps
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# bring everything from builder, then strip dev deps
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

COPY package*.json ./
RUN npm prune --omit=dev


EXPOSE 3000
CMD ["node", "dist/main.js"]
