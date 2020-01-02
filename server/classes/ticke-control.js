const fs = require('fs');




class Ticket {

    // esta clase no se exporta porque solo se usa en esta misma clase 
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio =escritorio;
    }
}


class TicketControl {
// esta es una clase normal, del esm5 

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        let data = require('../data/data.json');
        // leemos el archivo data.json
        
        if( data.hoy === this.hoy ){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
            
        }else{
            this.reiniciarConteo();
        }

    }

    siguienteTicket(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;

    }

    // ==============================
    //          Getters
    // ==============================
    
    getUltimoTicket(){
      return  'Tikcet -'+ this.ultimo;
    }

    getUltimos4(){
        return this.ultimosCuatro;
    }


    
    atenderTicket(escritorio){

        if( this.tickets.length === 0 ){
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        // eliminamos el primer elemento del arreglo 

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        console.log( typeof this.ultimosCuatro )
      
        this.ultimosCuatro.unshift(atenderTicket);
        // this.ultimosCuatro.unshift( atenderTicket );
        // esta insstruccion agregar el ticket al inicio del arreglo

        if( this.ultimosCuatro.length > 4 ){
            this.ultimosCuatro.splice(-1,1)
            // borra el ultimo elemento del arreglo 
            
        }
        
        console.log(this.ultimosCuatro)
        this.grabarArchivo();
        return atenderTicket;
    
    }


    grabarArchivo() {

        let jsonData = { 
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, 
            ultimosCuatro: this.ultimosCuatro
        }

        let jsonDataString = JSON.stringify( jsonData );

        fs.writeFileSync('./server/data/data.json', jsonDataString);
        
    }
    
    
    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];

        console.log('Se ha inicializado elsistema');
        this.grabarArchivo()
    
    }


}




module.exports ={
    TicketControl
}
