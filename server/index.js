const express= require("express");
const app = express();
const http = require("http");
const  { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server , {
    cors: {
        origin : "http://localhost:5173" ,
        methods: ["GET","POST"],
    }
})


io.on("connection" , (socket) => {

    console.log("User Connected :" ,socket.id)

    socket.on("send_message" , (data) =>{
        // console.log(data); ca marche
        socket.to(data.room).emit("receive_message",  data)
    })

    socket.on("join_room" , (data) => {
        socket.join(data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected : " , socket.id)
    })
});


server.listen(5174 , () => {
    console.log("Server is running");
});