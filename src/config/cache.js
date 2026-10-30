const Redis = require("ioredis").default;

const memoryCache = new Map();
let redisClient = null;

try {
  if (process.env.REDIS_HOST) {
    redisClient = new Redis({
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      lazyConnect: true,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 0,
      retryStrategy: () => null, // Never retry to prevent background errors
      reconnectOnError: () => false,
    });

    // Completely ignore and suppress redis connection errors
    redisClient.on("error", () => {});
    redisClient.on("connect", () => {
      console.log("Redis connected");
    });
  }
} catch (e) {
  redisClient = null;
}

const safeRedis = {
  get: async (key) => {
    try {
      if (redisClient && redisClient.status === "ready") {
        return await redisClient.get(key);
      }
    } catch {
      // Ignore redis connection error
    }
    return memoryCache.get(key) || null;
  },
  set: async (key, val, ...args) => {
    memoryCache.set(key, val);
    try {
      if (redisClient && redisClient.status === "ready") {
        return await redisClient.set(key, val, ...args);
      }
    } catch {
      // Ignore redis connection error
    }
    return "OK";
  },
  del: async (key) => {
    memoryCache.delete(key);
    try {
      if (redisClient && redisClient.status === "ready") {
        return await redisClient.del(key);
      }
    } catch {
      // Ignore redis connection error
    }
    return 1;
  },
  on: (event, cb) => {
    if (redisClient) {
      redisClient.on(event, cb);
    }
  },
};

module.exports = safeRedis;


