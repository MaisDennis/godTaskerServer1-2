import { Router } from 'express';

// -----------------------------------------------------------------------------
import authMiddleware from './app/middlewares/auth';

import DashboardController from './app/controllers/DashboardController';
import FileController from './app/controllers/FileController';

import MessageController from './app/controllers/Message/MessageController';
import MessageUserController from './app/controllers/Message/MessageUserController';
import MessageWorkerController from './app/controllers/Message/MessageWorkerController';
import MessageNotificationController from './app/controllers/Message/MessageNotificationController';

import ServiceController from './app/controllers/ServiceController';
import SessionController from './app/controllers/SessionController';
import SignatureController from './app/controllers/SignatureController';

import TaskCancelController from './app/controllers/Task/TaskCancelController';
import TaskConfirmController from './app/controllers/Task/TaskConfirmController';
import TaskController from './app/controllers/Task/Task_Controller';
import TaskDetailController from './app/controllers/Task/TaskDetailController';
import TaskReviveController from './app/controllers/Task/TaskReviveController';
import TaskStatusController from './app/controllers/Task/TaskStatusController';
import TaskUserCanceledController from './app/controllers/Task/TaskUserCanceledController';
import TaskUserCountController from './app/controllers/Task/TaskUserCountController';
import TaskUserFinishedController from './app/controllers/Task/TaskUserFinishedController';
// import TaskUserNotificationController from './app/controllers/Task/TaskUserNotificationController';
import TaskUserUnfinishedController from './app/controllers/Task/TaskUserUnfinishedController';

import TaskWorkerNotificationController from './app/controllers/Task/TaskWorkerNotificationController';
import TaskWorkerSubtaskNotificationController from './app/controllers/Task/TaskWorkerSubtaskNotificationController';
import TaskWorkerFinishedController from './app/controllers/Task/TaskWorkerFinishedController';
import TaskWorkerUnfinishedController from './app/controllers/Task/TaskWorkerUnfinishedController';
import TaskWorkerCanceledController from './app/controllers/Task/TaskWorkerCanceledController';
import TaskWorkerCountController from './app/controllers/Task/TaskWorkerCountController';

// import UserCheckController from './app/controllers/User/UserCheckController';
import UserController from './app/controllers/User/UserController';
import UserBlockController from './app/controllers/User/UserBlockController';
import UserUnblockController from './app/controllers/User/UserUnblockController';
import UserFlagController from './app/controllers/User/UserFlagController';
// import UserFlagResetController from './app/controllers/User/UserFlagResetController';
import UserFollowingController from './app/controllers/User/UserFollowingController';
import UserFollowingCountController from './app/controllers/User/UserFollowingCountController';
import UserFollowingIndividualController from './app/controllers/User/UserFollowingIndividualController';
import UserListIndividualController from './app/controllers/User/UserListIndividualController';
import UserNotificationController from './app/controllers/User/UserNotificationController';
import UserPointsController from './app/controllers/User/UserPointsController';
import UserUpdateNoPhotoController from './app/controllers/User/UserUpdateNoPhotoController';

import WorkerFollowedController from './app/controllers/Worker/WorkerFollowedController';
import WorkerFollowedCountController from './app/controllers/Worker/WorkerFollowedCountController';
import WorkerMobileController from './app/controllers/Worker/WorkerMobileController';
import WorkerController from './app/controllers/Worker/WorkerController';
import WorkerUpdateNoPhotoController from './app/controllers/Worker/WorkerUpdateNoPhotoController';
import WorkerIndividualController from './app/controllers/Worker/WorkerIndividualController';
// import multer from 'multer';

// import WorkerNotificationController from './app/controllers/Worker/WorkerNotificationController';
const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

io.on('connection', socket => {
  console.log('a user connected');
  // socket.broadcast.emit('test', (msg) => io.emit('chat message', 'msg'));
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
// -----------------------------------------------------------------------------
const routes = new Router();
// const upload = multer(multerConfig);
routes.get('/dashboard/:id', DashboardController.index); //

routes.post('/messages', MessageController.store); //
routes.post('/messages/notification/:id', MessageNotificationController.store); //
routes.get('/messages', MessageController.index); //
routes.get('/messages/user', MessageUserController.index); //
routes.get('/messages/worker', MessageWorkerController.index); //
routes.put('/messages/:id', MessageController.update); //
routes.delete('/messages/:id', MessageController.delete);

routes.post('/sessions', SessionController.store); //

routes.post('/services', ServiceController.store);
routes.get('/services', ServiceController.index);
routes.put('/services/:id', ServiceController.update);
routes.delete('/services/:id', ServiceController.delete);

routes.post('/tasks', TaskController.store); //
routes.get('/tasks', TaskController.index); //
routes.get('/tasks/finished', TaskWorkerFinishedController.index); //
routes.get('/tasks/unfinished', TaskWorkerUnfinishedController.index); //
routes.get('/tasks/canceled', TaskWorkerCanceledController.index); //
routes.get('/tasks/count', TaskWorkerCountController.index); //
routes.get('/tasks/:id/details', TaskDetailController.index);
routes.get('/tasks/user/canceled', TaskUserCanceledController.index); //
routes.get('/tasks/user/unfinished', TaskUserUnfinishedController.index); //
routes.get('/tasks/user/finished', TaskUserFinishedController.index); //
routes.get('/tasks/user/count', TaskUserCountController.index); //
routes.put('/tasks/confirm/:id', TaskConfirmController.update); //
routes.put('/tasks/:id', TaskController.update); //
// routes.put(
//   '/tasks/:id/notification/user',
//   TaskUserNotificationController.update
// );
routes.put(
  '/tasks/:id/notification/worker',
  TaskWorkerNotificationController.update
); //
routes.put(
  '/tasks/:id/notification/worker/subtask',
  TaskWorkerSubtaskNotificationController.update
);
// routes.put('/tasks/:id/details', TaskDetailController.update);
routes.put('/tasks/:id/cancel', TaskCancelController.update); //
routes.put('/tasks/:id/revive', TaskReviveController.update); //
routes.put('/tasks/:id/status', TaskStatusController.update); //
routes.delete('/tasks/:id', TaskController.delete); //

routes.post('/users', UserController.store); //
routes.post('/users/following', UserFollowingController.store); //
// routes.get('/users/usercheck', UserCheckController.index);
routes.get('/users/block', UserBlockController.index);
routes.get('/users/flag', UserFlagController.index);
routes.get('/users/following', UserFollowingController.index); //
routes.get('/users/following/count', UserFollowingCountController.index); //
routes.get(
  '/users/following/individual',
  UserFollowingIndividualController.index
); //
routes.get('/users/:id', UserListIndividualController.index); //
routes.put('/users', UserController.update); //
routes.put('/users/block', UserBlockController.update);
routes.put('/users/flag', UserFlagController.update);
routes.put('/users/unblock', UserUnblockController.update);
// routes.put('/users/flagreset', UserFlagResetController.update);
routes.put('/users/following', UserFollowingController.update); //
routes.put('/users/no-photo', UserUpdateNoPhotoController.update); //
routes.put('/users/notifications/:id', UserNotificationController.update); //
routes.put('/users/points/:id', UserPointsController.update); //

routes.post('/workers', WorkerController.store); // Insomnia
routes.get('/workers', WorkerController.index); //
routes.get('/workers/mobile', WorkerMobileController.index); //
routes.get('/workers/individual', WorkerIndividualController.index); // Insomnia
routes.get('/workers/followed', WorkerFollowedController.index); //
routes.get('/workers/followed/count', WorkerFollowedCountController.index); //
routes.put('/workers', WorkerController.update); //
routes.put('/workers/no-photo', WorkerUpdateNoPhotoController.update); //
// routes.put('/workers/:id/notifications', WorkerNotificationController.update);

routes.post('/signatures', SignatureController.store); //
routes.get('/signatures', SignatureController.index);

routes.post('/files', FileController.store); //
routes.get('/files', FileController.index); //
// -----------------------------------------------------------------------------
routes.use(authMiddleware);
// -----------------------------------------------------------------------------

routes.get('/users', UserController.index);
// routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.delete('/workers/:id', WorkerController.delete);

export default routes;
