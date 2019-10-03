const path = require('path');//built in
const http = require('http');//in Built node module
const express = require(`express`);
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require(`./utils/message`);
const {isRealString} = require(`./utils/validation`);
const {Users} = require(`./utils/users`);

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);//how we'll communicate btw server and client
var users = new Users();

app.use(express.static(publicPath));

//this method lets you register a new event listener to do something when
//connection lets you do something when a new connection comes on, when anew user
io.on(`connection`, (socket) => {
    console.log('New user connected');



    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)){
           return callback('Name and room are required')
        }
        socket.join(params.room);
        //remove user from all rooms
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // io.emit() -> io.to('room name').emit
        // socket.broadcast.emit -> socket.broadcast.to('room name').emit

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.emit from admin, text: weqlcome to the chat app
        //greet the eindividual user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'))

        //socke .broadcat.emit tp inform everyone else qthat a new user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback()
    });

    //event listener
    socket.on('createMessage', (message, callback)=> {

        // io.emit emits an event to every single connection

        var user = users.getUser(socket.id);


        if (user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))

        }

        callback();

        //send the event to everybody but this socket
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {

        var user = users.getUser(socket.id);
        if (user){
            io.to(user.room).emit(`newLocationMessage`, generateLocationMessage(user.name,coords.latitude, coords.longitude))

        }
    });

    socket.on(`disconnect` , () => {
        console.log('User was disconnected')

        var user = users.removeUser(socket.id);

        if (user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));

            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
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

