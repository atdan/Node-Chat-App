var socket = io();//initiating a request from the client to the server to open up a web socket and keep it open

socket.on('connect', function ()  {
    console.log(`connected to server`);

    socket.emit(`createMessage`, {
        from: 'Atuma',
        text: 'Yep it works'
    })
});

socket.on('disconnect',function () {

    console.log(`Disconnected from server`);
});

//listener
socket.on('newMessage', function (message) {
    console.log(`New Message`,message)
});