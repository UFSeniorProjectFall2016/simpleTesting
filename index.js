var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Set port variables to make application listen
var port = process.env.PORT || 5000;    // Default port to 5000 if not explicitly specified
                                        // since Heroku listen to that port

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.configure(function() {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('device status', function(msg){
    // console.log(msg.name + msg.status);
    io.emit('device status', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:', port);
});
