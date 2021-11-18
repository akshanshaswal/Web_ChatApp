//node server which will handle socket io connnection

const io = require('socket.io')(8080, {
    cors:{
        origin: "http://localhost:5500",
        origin: "http://127.0.0.1:5501"
    }
  });

const user={};
 io.on('connection',socket=>{
     socket.on('new-user-joined',name=>{
         console.log("new user " , name);
         user[socket.id]=name;
         socket.broadcast.emit('user-joined',name);
     });
     socket.on('send',message=>{
         socket.broadcast.emit('receive',{message:message,name:user[socket.id]})
     });

     socket.on('disconnect',message=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    })
 });