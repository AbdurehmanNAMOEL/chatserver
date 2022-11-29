const express= require('express')
const app = express()
const http= require('http')
const colors=require('colors')
const cors= require('cors')
require('dotenv').config()
const server= http.createServer(app)
const {Server}= require('socket.io')
const io =new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on('connection', socket=>{
    socket.on("join_room",data=>{
     socket.join(data)
     console.log(`user with id ${socket.id} joined room:${data}`.green);
    })

    socket.on("userMessage",data=>{
     socket.to(data.room).emit('receiver',data)
    })

    socket.on('disconnect',()=>{
        console.log(`user with id: ${socket.id} is disconnected`.red);
    })
})

app.use(cors())
server.listen(process.env.PORT||5500,()=>{
    console.log('server listening on port 3001'.blue);
})