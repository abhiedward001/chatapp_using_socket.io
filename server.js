const express = require("express");
const app = express();

const http = require('http').createServer(app)
var port = process.env.PORT || 2200;
const io = require("socket.io")(http) //running socket.io server which is an instance of http (which attach to a http instance)

const users = {};

app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index.ejs");
});
//io.on will liten all the connections(socket.io instance will listen lots of socket connection )
io.on('connection', socket => {
    //particular connection
    socket.on('new-user-joined', name => {
        
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave',  users[socket.id] );
        delete users[socket.id];
    });
});

http.listen(port, () => {
    console.log("someone staretd the server");
});