import redis from "redis";

const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

client.on("connect", function() {
  console.log("[REDIS] Connection has been established");
});

client.on("error", function(err) {
  throw new Error(`Problem with Redis connection`);
});

export default client;
