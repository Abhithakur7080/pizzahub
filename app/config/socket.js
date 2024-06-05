import { Server } from 'socket.io';
import Emitter from 'events';

const setupSocket = (server) => {
  const io = new Server(server);

  // Event emitter
  const eventEmitter = new Emitter();
  
  io.on('connection', (socket) => {
    // Join
    socket.on('join', (roomId) => {
      socket.join(roomId);
    });
  });
  eventEmitter.on("orderUpdated", (data) => {
    //order room
    io.to(`order_${data.id}`).emit('orderUpdated', data);
  });
  eventEmitter.on("orderPlaced", (data) => {
    //admin order handler room
    io.to(`adminRoom`).emit('orderPlaced', data);
  });

  return eventEmitter;
};

export default setupSocket;
