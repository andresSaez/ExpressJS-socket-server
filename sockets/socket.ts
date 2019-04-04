import { Socket } from 'socket.io';


export const disconnect = ( client: Socket ) => {

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

}


export const mensaje = ( client: Socket ) => {

    client.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido:', payload );
    });
}