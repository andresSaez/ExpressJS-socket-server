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
            console.log('cliente conectado');


            // Mensajes
            socket.mensaje( cliente );

            
            // Disconnect
            socket.disconnect( cliente );
        });
    }

    start( callback: Function ) {

        this.httpServer.listen( this.port, callback() );
    }
}

