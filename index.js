var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('device status', function(msg){
    // console.log(msg.name + msg.status);
    io.emit('device status', msg);
  });
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
