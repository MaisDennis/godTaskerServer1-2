import 'dotenv/config';
import express from 'express';
// import path from 'path';
import cors from 'cors';
import routes from './routes';
// import FileController from './app/controllers/FileController';

import './database';

// require('dotenv/config');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
    // this.server.use(
    //   '/files',
    //   express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    // );

    // this.server.use(
    //   '/signatures',
    //   express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    // ); // link to signature pic.
    // this.server.use(
    //   '/tasks/:id',
    //   express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    // ); // link to signature pic.
    // this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
    // this.server.use('/files', FileController);
  }
}

export default new App().server;
