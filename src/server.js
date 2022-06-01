import { serverHttp, io } from './http';

io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

serverHttp.listen(3333);
// app.listen(3333);
// app.listen(process.env.PORT || 3333);
