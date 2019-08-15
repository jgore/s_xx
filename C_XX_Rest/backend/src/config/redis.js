import redis from "redis";
import {
  NOT_FOUND_KEY,
  REDIS_INTERNAL_ERROR,
  FOUND_KEY,
  REDIS_DELETE_COMPANY_STACK
} from "../statuses/redisStatuses";

const REDIS_PORT = process.env.REDIS_PORT || 6379,
  REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const client = redis.createClient(REDIS_PORT, REDIS_HOST);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("connect", function() {
  console.log(`Connected to redis instance on ${REDIS_HOST}:${REDIS_PORT}`);
});

client.on("error", function(err) {
  console.log("Error " + err);
});

export function setToDeleteCompanyStack(key, companyId) {
  return new Promise((resolve, reject) => {
    client.select(REDIS_DELETE_COMPANY_STACK, function(err) {
      if (err) {
        reject(REDIS_INTERNAL_ERROR);
      }
      client.set(key, companyId, "EX", 3600 * 24, err => {
        if (err) {
          reject(REDIS_INTERNAL_ERROR);
        }
        resolve();
      });
    });
  });
}

export function getFromDeleteCompanyStack(key) {
  return new Promise((resolve, reject) => {
    client.select(REDIS_DELETE_COMPANY_STACK, function() {
      client.get(key, (err, reply) => {
        if (err) {
          reject(REDIS_INTERNAL_ERROR);
        }
        if (!reply) {
          reject(NOT_FOUND_KEY);
        }
        resolve({
          status: FOUND_KEY,
          message: reply
        });
      });
    });
  });
}

export default client;
