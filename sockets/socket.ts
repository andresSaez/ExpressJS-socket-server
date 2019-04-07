import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/ususarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( client: Socket, io: SocketIO.Server ) => {

    const usuario = new Usuario( client.id );
    usuariosConectados.agregar( usuario );
}

export const disconnect = ( client: Socket, io: SocketIO.Server ) => {

    client.on('disconnect', () => {
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario( client.id );
        io.emit('usuarios-activos', usuariosConectados.getLista());

    });

}

// Escuchar mensajes
export const mensaje = ( client: Socket, io: SocketIO.Server ) => {

    client.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido:', payload );

        io.emit('mensaje-nuevo', payload );
    });
}

// Configurar usuario
export const configurarUsuario = ( client: Socket, io: SocketIO.Server ) => {

    client.on('configurar-usuario', ( payload: { nombre: string }, callback: CallableFunction ) => {

        usuariosConectados.actualizarNombre( client.id, payload.nombre );
        io.emit('usuarios-activos', usuariosConectados.getLista());


        callback( {
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });
}

// Obtener usuarios
export const obtenerUsuarios = ( client: Socket, io: SocketIO.Server ) => {

    client.on('obtener-usuarios', () => {

        io.to( client.id ).emit('usuarios-activos', usuariosConectados.getLista());
    });
}