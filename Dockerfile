# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S node -u 1001

FROM base AS deps
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci || npm install

FROM deps AS build
COPY . .
# Build if a build script exists; ignore errors if not
RUN npm run build || echo "No build step"

FROM base AS prod
ENV NODE_ENV=production
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app /app
USER node
EXPOSE 3000
CMD ["npm", "start"]