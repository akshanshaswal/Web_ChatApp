const socket=io('http://localhost:8080')

const form =document.getElementById('send-container');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector(".container");

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinp.value;
    append(`you : ${message}`,'rightview');
    socket.emit('send',message);
    messageinp.value='';
})
const naam=prompt("Enter yout name to join");
socket.emit('new-user-joined', naam);

socket.on('user-joined',naam=>{
    append(`${naam} joined the chat `,'rightview');
})
socket.on('receive',data=>{
    append(`${data.name} : ${data.message} `,'leftview');
})
socket.on('left',name=>{
    append(`${name} left the chat `,'leftview');
})

