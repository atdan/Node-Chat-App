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

var locationButton = jQuery(`#send-location`);

locationButton.on('click', function () {

    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')

    navigator.geolocation.getCurrentPosition(function (position) {

        //success listener
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit(`createLocationMessage`, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location').text('Send location');
        locationButton.removeAttr('disabled')
    })
})

socket.on('newLocationMessage', function(message) {
    var li = jQuery(`<li></li>`);
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery(`#messages`).append(li);

    console.log(li);
})
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {

        messageTextBox.val('')
    });
});

