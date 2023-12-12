import { createRedisSessionStorage } from "@mcansh/remix-redis-session-storage";
import { redis } from './redis.server.ts'

export function createUpstashSessionStorage({cookie}: any) {
  return createRedisSessionStorage({
    redis,
    cookie,
  })
}
