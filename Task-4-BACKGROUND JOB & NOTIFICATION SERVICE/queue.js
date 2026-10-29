
const { Queue } = require("bullmq");
const connection = require("./redis");

const notificationQueue = new Queue("notification-queue", {
    connection
});

module.exports = notificationQueue;
