// node server which handle socket io connection
//To listen the event, use socket.on(event_name,callback_function)
const io = require('socket.io')(8000, {
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