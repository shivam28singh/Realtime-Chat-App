const express = require('express');
const res = require('express/lib/response');
const app = express()
const path = require('path')

app.use('/', express.static(path.resolve(__dirname,'./public')));

app.get('/',(req,res)=>{
  res.render("index.ejs")
})

const server = app.listen(8080)

// node server which handle socket io connection
//To listen the event, use socket.on(event_name,callback_function)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  })

  var users=[];


io.on('connection',socket => {
    socket.on("new-user-joined", (name) => {
      users[socket.id] = name;
      socket.broadcast.emit('user-joined',name)
    })

    socket.on("MessageSent",msg =>{
      socket.broadcast.emit('newMessage',{message: msg, name: users[socket.id]})
    })

    socket.on("disconnect",person=>{
      socket.broadcast.emit("left",users[socket.id]);
      delete users[socket.id];
    })
})