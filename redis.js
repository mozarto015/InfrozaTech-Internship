
const IORedis = require("ioredis");

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null
});

connection.on("connect", () => {
    console.log("Connected to Redis/Memurai!");
});

connection.on("error", (error) => {
    console.error("Redis connection error:", error.message);
});

module.exports = connection;
