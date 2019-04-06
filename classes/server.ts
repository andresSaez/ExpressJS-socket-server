import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

    private static _instace: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = http.createServer( this.app );
        this.io = socketIO( this.httpServer );

        this.listenSockets();
    }

    public static get instace() {
        return this._instace || ( this._instace = new this() );
    }

    private listenSockets() {
        console.log('Escuchando conexiones - sockets ');

        this.io.on('connection', cliente => {

            // Conectar cliente
            socket.conectarCliente( cliente );

            // Configurar usuario
            socket.configurarUsuario( cliente, this.io );

            console.log( cliente.id );

            // Mensajes
            socket.mensaje( cliente, this.io );

            
            // Disconnect
            socket.disconnect( cliente );


            
        });
    }

    start( callback: Function ) {

        this.httpServer.listen( this.port, callback() );
    }
}

