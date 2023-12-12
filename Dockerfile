# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
FROM node:18-bullseye-slim as base

LABEL fly_launch_runtime="Remix/Prisma"

# Added `ca-certificates` to container
RUN apt-get update && apt-get install -y ca-certificates

# Remix/Prisma app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV PORT="3000"
ENV DATABASE_URL=${DATABASE_URL}
ENV SESSION_SECRET=${SESSION_SECRET}

ENV KINDE_DOMAIN=${KINDE_DOMAIN}
ENV KINDE_CLIENT_ID=${KINDE_CLIENT_ID}
ENV KINDE_CLIENT_SECRET=${KINDE_CLIENT_SECRET}
ENV KINDE_REDIRECT_URL=${KINDE_REDIRECT_URL}
ENV KINDE_LOGOUT_REDIRECT_URL=${KINDE_LOGOUT_REDIRECT_URL}

ENV UPSTASH_REDIS_REST_URL=${UPSTASH_REDIS_REST_URL}
ENV UPSTASH_REDIS_REST_TOKEN=${UPSTASH_REDIS_REST_TOKEN}

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential openssl pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Generate Prisma Client
COPY --link prisma .

ADD prisma /app/prisma
RUN npx prisma generate

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "start" ]
