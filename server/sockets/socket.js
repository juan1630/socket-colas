const { io } = require('../server');
const { TicketControl } = require('../classes/ticke-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        
        let siguienteTicket = ticketControl.siguienteTicket();

        console.log( siguienteTicket );
        callback(siguienteTicket);
        
    });

    
    // emitir un evento llamdo estado actual, retorna el ultimo estado del ticket
    client.emit('estadoActual', { 
                estadoActual: ticketControl.getUltimoTicket(),
                ultimos4: ticketControl.getUltimos4()
            } );


    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio){

            return callback({
                err:true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        
        callback(atenderTicket);

        // actualizar 

        // emitimos los ultimos 4
        client.broadcast.emit('ultimos4', {ultimos4: ticketControl.getUltimos4() })
    });


});