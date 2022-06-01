import { io } from './http';

io.on('connection', socket => {
  console.log('a user connected');
  socket.broadcast.emit('test', msg => io.emit('chat message', 'msg'));
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
