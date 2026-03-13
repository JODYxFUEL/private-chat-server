const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
cors:{origin:"*"}
})

const roomPasswords = {
Navjot:"Navjot29"
}

io.on("connection",(socket)=>{

socket.on("joinRoom",(data)=>{

let room=data.room
let pass=data.password

if(roomPasswords[room] && roomPasswords[room] !== pass){
socket.emit("wrongPassword")
return
}

let users = io.sockets.adapter.rooms.get(room)

if(users && users.size >= 2){
socket.emit("roomFull")
return
}

socket.join(room)

})

socket.on("message",(data)=>{
io.to(data.room).emit("message",data)
})

socket.on("delete",(data)=>{
io.to(data.room).emit("delete",data.id)
})

})

server.listen(3000,()=>{
console.log("Server running")
})
