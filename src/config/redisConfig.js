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

export const addToRedis = (key, value, expire) => {
  if (expire) {
    client.set(key, value, "EX", expire, redis.print);
  } else {
    client.set(key, value);
  }
};

export const getFromRedis = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err) {
      return callback(err);
    }
    callback(undefined, reply);
  });
};

export const checkIsNotExpire = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err || !reply) {
      callback({ error: "NOT EXIST" });
    } else {
      client.ttl(key, (err, time) => {
        if (err) {
          callback({ error: "NOT EXPIRE" });
        } else {
          callback(undefined, time);
        }
      });
    }
  });
};

export function removeFromRedis(key, callback) {
  client.del(key, (err, response) => {
    if (response == 1) {
      callback(undefined, {});
    } else {
      callback({ error: "Can not delete" });
    }
  });
}

export default client;
