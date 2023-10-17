const express = require("express"); // CommonJS
const { createServer } = require("node:http"); // ES6
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = new createServer(app);
const path = join(__dirname, "Client");
const io = new Server(server);

app.get("/chat", (req, res) => {
  res.sendFile(join(path, "index.html"));
});

app.get("/", (req, res) => {
    res.send("Socket.io server is running on port 3000, Please use http://localhost:300/chat to access the chat page");
});

io.on("connect", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  // this will emit the event to all connected clients to sockets
   //timer function to emit every 10 seconds
    // setInterval(() => {
    //     io.emit('chat message', 'Hello world!'); }, 10000);

server.listen(3000, () => {
  console.log("Example app listening at http://localhost:3000");
});
