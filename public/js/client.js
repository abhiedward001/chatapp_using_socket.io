const socket=io('http://localhost:2200');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageConatiner=document.querySelector('.container');

const append=(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
 
}

form.addEventListener('submit',(para)=>{
para.preventDefault();
const message=messageInput.value;
append(`You:${message}`,'right');
socket.emit('send',message);
messageInput.value=" ";

});
let name;
do{
 name=prompt("Enter your Name please");
}
while(!name)

socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'right');
});
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
});
socket.on('leave',data=>{
    append(`${data} left the chat` ,'left');
});
