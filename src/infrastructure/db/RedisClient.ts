import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379",
});

export const connectRedis = async () => {
  await client.on("error", (err) => console.error("Redis Client Error", err)).connect();
};

export const disconnectRedis = async () => {
  await client.disconnect();
};

export default client;
