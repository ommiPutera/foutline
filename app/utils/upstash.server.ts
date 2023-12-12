import * as crypto from "crypto";
import { createSessionStorage } from "@remix-run/node";

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashRedisResToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if(!upstashRedisRestUrl || !upstashRedisResToken) throw new Error("error: REDIS NEED ENV")

const headers = {
  Authorization: `Bearer ${upstashRedisResToken}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};

const expiresToSeconds = (expires: Date | undefined) => {
  if(!expires) return 60
  const now = new Date();
  const expiresDate = new Date(expires);
  const secondsDelta = Math.ceil(
    (expiresDate.getTime() - now.getTime()) / 1000,
  );
  return secondsDelta < 0 ? 0 : secondsDelta;
};

export function createUpstashSessionStorage({ cookie }: any) {
  return createSessionStorage({
    cookie,
    async createData(data, expires) {
      const randomBytes = crypto.randomBytes(8);
      const id = Buffer.from(randomBytes).toString("hex");
      await fetch(
        `${upstashRedisRestUrl}/set/${id}?EX=${expiresToSeconds(expires)}`,
        {
          method: "post",
          body: JSON.stringify({ data }),
          headers,
        },
      );
      return id;
    },
    async readData(id) {
      console.log(id);
      const response = await fetch(`${upstashRedisRestUrl}/get/${id}`, {
        headers,
      });
      try {
        const { result } = await response.json();
        return JSON.parse(result).data;
      } catch (error) {
        return null;
      }
    },
    async updateData(id, data, expires) {
      await fetch(
        `${upstashRedisRestUrl}/set/${id}?EX=${expiresToSeconds(expires)}`,
        {
          method: "post",
          body: JSON.stringify({ data }),
          headers,
        },
      );
    },
    async deleteData(id) {
      await fetch(`${upstashRedisRestUrl}/del/${id}`, {
        method: "post",
        headers,
      });
    },
  });
}