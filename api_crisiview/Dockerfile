FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk update && apk upgrade --no-cache libcrypto3 libssl3
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3001
USER node
CMD ["node", "server.js"]
