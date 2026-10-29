
const { Worker } = require("bullmq");
const connection = require("./redis");

const worker = new Worker(
    "notification-queue",
    async (job) => {
        console.log(`Processing job ${job.id}`);
        console.log(`Notification message: ${job.data.message}`);
        

        // Simulate sending a notification.
        // A real email or SMS service can be added later.
        console.log("Notification processed successfully!");

        return {
            delivered: true,
            message: job.data.message
        };
    },
    { connection }
);

worker.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed:`, result);
});

worker.on("failed", (job, error) => {
    console.error(`Job ${job?.id} failed:`, error.message);
});

worker.on("error", (error) => {
    console.error("Worker error:", error.message);
});

console.log("Notification worker is running...");
