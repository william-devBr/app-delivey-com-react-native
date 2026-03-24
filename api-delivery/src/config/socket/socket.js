const {Server} = require('socket.io');

let io;

const init = (httpServer)=> {

     io = new Server(httpServer, {
        cors : {origin : "*" }
     });

     io.on("connection", (socket)=> {
        console.log('restaurante iniciado');
          socket.on("join_restaurante", (id)=> {
             socket.join(`restaurante_${id}`);
             console.log(`restaurante ${id} conectado`)
          })
     });

     return io;
}

const getIO = ()=> {
    if(!io) {
        throw new Error('Socket.IO não iniciado')
    }

    return io
};

module.exports = {init, getIO}