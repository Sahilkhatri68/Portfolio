const express = require("express");
const router = express.Router();
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Home Page
router.get("/", (req, res) => {
  res.send("Server is working");
  //io connection
  io.on("connection", (socket) => {
    console.log("a user connected");
  });
});

module.exports = router;
