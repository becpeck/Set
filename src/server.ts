import express from 'express';
import { createServer } from 'node:http';
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

app.get("/", (req, res) => {
    res.send('Hello World');
})

server.listen(3000, () => {
    console.log("server running on port 3000");
})

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("a user disconnected");
    });
});


