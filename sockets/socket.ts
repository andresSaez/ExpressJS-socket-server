import { Socket } from 'socket.io';


export const disconnect = ( client: Socket ) => {

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

}

// Escuchar mensajes
export const mensaje = ( client: Socket, io: SocketIO.Server ) => {

    client.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido:', payload );

        io.emit('mensaje-nuevo', payload );
    });
}