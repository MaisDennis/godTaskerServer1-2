import http from 'http';
import { Server } from 'socket.io';
import app from './app';

const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

export { serverHttp, io };
