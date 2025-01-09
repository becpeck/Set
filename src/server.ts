import express from 'express';
import { createServer } from 'node:http';
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.send('Hello World');
})

server.listen(3000, () => {
    console.log("server running on port 3000");
})

io.on("connection", (socket) => {
    console.log("a user connected");
});

io.on("disconnect", (socket) => {
    console.log("a user disconnected");
});
