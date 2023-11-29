const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server , {
    cors :{
        origin: "http://localhost:5173", // A CHANGER POUR REACT 
        methods: ["GET" , "POST"],
    },
})

io.on("connection", (socket) => {
  
    console.log(`User Connected: ${socket.id}`) 

    socket.on("join_room", (data) => {
        socket.join(data);
      });
    
      socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
        {/*socket.to(data.room).emit("receive_message", data); */}
      });
    });
 

server.listen(5174, () => {
    console.log("SERVER IS RUNNING");
});


/*
    socket.on("send_Id_Salon", (data) => {
        console.log(data)
   })

    socket.on('nouveau-joueur' , Pseudo =>{

   })

   socket.on('send-chat-message', message =>{
    socket.broadcast.emit('chat-message', message)
   })
})  

*/