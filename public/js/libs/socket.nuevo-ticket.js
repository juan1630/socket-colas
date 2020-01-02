
// establecer la comunicacion con el servidor

var socket = io();
var label = $('#lblNuevoTicket');
var lblCargando = $('#lblNuevoTicket');

socket.on('connect', function () {
    
    console.log('conectado al servidor ')
});


socket.on('disconnect', function () {

    console.log('Desconectado del servidor');

});


socket.on('estadoActual', (data) => {

    console.log(data.estadoActual  )

    lblCargando.text(data.estadoActual);
})

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function ( siguienteTicket ) {
        label.text(siguienteTicket);
    })
})