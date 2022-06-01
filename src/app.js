import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  async middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
