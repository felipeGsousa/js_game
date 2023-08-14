const express = require('express');
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {pingInterval: 2000, pingTimeout:5000});

const port = 3000;

app.use(express.static("../"))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + 'index.html')
})

const players = {

}

io.on('connection', (socket) => {
    console.log("user conn")
    players[socket.id] = {
        x: 8*31,
        y: 8*31,
    }

    io.emit('updatePlayers', players)

    socket.on('disconnect', (reason) => {
        console.log(reason);
        delete players[socket.id];
        io.emit('updatePlayers', players)
    })

    socket.on('playerAction', (player)=> {
        players[socket.id] = JSON.parse(player);
        io.emit('updatePlayers', players);
    })

})

server.listen(port, ()=>{
    console.log("Server running");
});

