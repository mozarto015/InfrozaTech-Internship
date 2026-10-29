
const express = require("express");
const notificationQueue = require("./queue");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("My Task 4 server is working!");
});o

app.post("/notify", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                success: false,
                error: "Please provide a message."
            });
        }

        const job = await notificationQueue.add(
            "send-notification",
            { message },
            {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 1000
                },
                removeOnComplete: false,
                removeOnFail: false
            }
        );

        res.status(202).json({
            success: true,
            message: "Notification job queued successfully.",
            jobId: job.id
        });
    } catch (error) {
        console.error("Failed to queue notification:", error.message);

        res.status(500).json({
            success: false,
            error: "Failed to queue notification."
        });
    }
});

app.get("/notify/:id", async (req, res) => {
    try {
        const job = await notificationQueue.getJob(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                error: "Job not found."
            });
        }

        const state = await job.getState();

        res.json({
            success: true,
            jobId: job.id,
            state: state,
            message: job.data.message,
            result: job.returnvalue || null,
            failedReason: job.failedReason || null
        });
    } catch (error) {
        console.error("Failed to get job status:", error.message);

        res.status(500).json({
            success: false,
            error: "Failed to get job status."
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
