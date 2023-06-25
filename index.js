var express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mime = require('mime');
var port = process.env.PORT || 3700;

app.set("views", __dirname + "/views");
app.set("view engine", "jade");

app.get("/", function (req, res) {
  res.render("page");
});

app.use(express.static(__dirname + "/public", {
  setHeaders: function (res, path, stat) {
    var mimeType = mime.getType(path);
    if (mimeType === "text/css") {
      res.setHeader("Content-Type", mimeType);
    }
  }
}));

http.listen(port, function () {
  console.log("Node.js listening on port " + port);
});

io.on('connection', function (socket) {
  socket.emit('message', { message: 'Welcome to the real-time web chat' });

  socket.on('send', function (data) {
    io.emit('message', data);
  });

  socket.on('error', function (error) {
    console.error('Socket error:', error);
    // Handle the error here
  });
});
