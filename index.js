var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3700;

// Set view of '/' end point
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("page");
});

// Use our public/chat.js file as listener
app.use(express.static(__dirname + "/public"));

// Set port
http.listen(port, function () {
  console.log("Node.js listening on port " + port);
});

// Set up socket connection
io.on("connection", function (socket) {
  socket.emit("message", { message: "Welcome to the Real Time Web Chat" });
  socket.on("send", function (data) {
    io.emit("message", data);
  });
});
