const socket = io('http://localhost:8000');

const MessageContainer =document.getElementsByClassName("message_container")[0];
const form = document.getElementById("input_field")
const Name = prompt("Enter your name to continue")

socket.emit('new-user-joined',Name)

socket.on('user-joined',(name)=>{
   Append(name + " Joined the chat","right_grey")
})

socket.on('newMessage',data=>{
     console.log(data.message);
     console.log(data.name);
     Append(data.name +": " + data.message,"left");
})

socket.on("left",person=>{
     Append(person+" left the chat ","left_grey");
})

form.addEventListener('submit' ,(e)=>{
     e.preventDefault()
     const msg = document.getElementById("input_message");
     Append(msg.value, "right");
     socket.emit('MessageSent',msg.value);
     msg.value = '';
})

function Append(msg,position){
     const messageElement = document.createElement('div')
     messageElement.innerText = msg
     messageElement.classList.add("message")
     messageElement.classList.add(position)
     MessageContainer.append(messageElement)
}
