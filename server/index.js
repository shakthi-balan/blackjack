const express = require("express");
const app = express();
const http = require('http');
const cors = require( "cors");
const {Server} = require("socket.io");  //gonna take in a class called Server


app.use(cors());


      
const server = http.createServer(app);      

const io = new Server( server, {
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
        
    },  

});

io.on("connection", (socket)=> {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data)=> {
        socket.join(data);
    });

    socket.on("send message", (data) => {
        socket.to(data.room).emit("recieve message", data)
    });
});
const a = 3001;
server.listen( a, () => {
    console.log(`Server is running on port: ${a}`);
});

