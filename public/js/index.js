var socket = io();//initiating a request from the client to the server to open up a web socket and keep it open

socket.on('connect', function ()  {
    console.log(`connected to server`);

    // socket.emit(`createMessage`, {
    //     from: 'Atuma',
    //     text: 'Yep it works'
    // })

});

socket.on('disconnect',function () {

    console.log(`Disconnected from server`);
});

//listener
socket.on('newMessage', function (message) {
    console.log(`New Message`, message)

    //ordered list to view messages
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery(`#messages`).append(li);
});

// socket.emit('createMessage', {
//     from: 'index.js',
//     text: 'Hi'
// }, function(data) {
//     console.log('Event acknoledge function', data);
// })

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(e) {

    });
});