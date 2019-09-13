const path = require('path');//built in
const http = require('http');//in Built node module
const express = require(`express`);
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);//how we'll communicate btw server and client

app.use(express.static(publicPath));

//this method lets you register a new event listener to do something when
//connection lets you do something when a new connection comes on, when anew user
io.on(`connection`, (socket) => {
    console.log('New user connected');

    //socket.emit from admin, text: weqlcome to the chat app
    //greet the eindividual user
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    })
 
    //socke .broadcat.emit tp inform everyone else qthat a new user joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    })
    

    //event listener
    socket.on('createMessage', (message)=> {
        console.log(message);

        //io.emit emits an event to every single connection
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        //send the event to everybody but this socket
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on(`disconnect` , () => {
        console.log('User was disconnected')
    });

    //emmitter
    //socket.emit emits a new event to a single connection
    // socket.emit(`newMessage`,{
    //     from: 'atuma',
    //     text: 'Hi, from daniel',
    //     createdAt: 2332
    // });


});

server.listen(port, () => {
    console.log(`server started on port ${port}`)
});

