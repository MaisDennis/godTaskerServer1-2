import { Router } from 'express';
// import multer from 'multer';
// -----------------------------------------------------------------------------
import authMiddleware from './app/middlewares/auth';

import FileController from './app/controllers/FileController';

import MessageController from './app/controllers/Message/MessageController';
import MessageUserController from './app/controllers/Message/MessageUserController';
import MessageWorkerController from './app/controllers/Message/MessageWorkerController';
import MessageRemoveController from './app/controllers/Message/MessageRemoveController';
import MessageUpdateController from './app/controllers/Message/MessageUpdateController';

import SessionController from './app/controllers/SessionController';
import SignatureController from './app/controllers/SignatureController';

import TaskCancelController from './app/controllers/Task/TaskCancelController';
import TaskConfirmController from './app/controllers/Task/TaskConfirmController';
import TaskController from './app/controllers/Task/Task_Controller';
import TaskDetailController from './app/controllers/Task/TaskDetailController';
import TaskMessageController from './app/controllers/Task/TaskMessageController';
import TaskReviveController from './app/controllers/Task/TaskReviveController';
import TaskUserCanceledController from './app/controllers/Task/TaskUserCanceledController';
import TaskUserCountController from './app/controllers/Task/TaskUserCountController';
import TaskUserFinishedController from './app/controllers/Task/TaskUserFinishedController';
import TaskUserNotificationController from './app/controllers/Task/TaskUserNotificationController';
import TaskUserUnfinishedController from './app/controllers/Task/TaskUserUnfinishedController';
import TaskWorkerNotificationController from './app/controllers/Task/TaskWorkerNotificationController';
import TaskWorkerFinishedController from './app/controllers/Task/TaskWorkerFinishedController';
import TaskWorkerUnfinishedController from './app/controllers/Task/TaskWorkerUnfinishedController';
import TaskWorkerCanceledController from './app/controllers/Task/TaskWorkerCanceledController';
import TaskWorkerCountController from './app/controllers/Task/TaskWorkerCountController';

import UserController from './app/controllers/User/UserController';
import UserFollowingController from './app/controllers/User/UserFollowingController';
import UserFollowingCountController from './app/controllers/User/UserFollowingCountController';
import UserFollowingIndividualController from './app/controllers/User/UserFollowingIndividualController';
import UserListIndividualController from './app/controllers/User/UserListIndividualController';
import UserNotificationController from './app/controllers/User/UserNotificationController';
import UserUpdateNoPhotoController from './app/controllers/User/UserUpdateNoPhotoController';

import WorkerFollowedController from './app/controllers/Worker/WorkerFollowedController';
import WorkerFollowedCountController from './app/controllers/Worker/WorkerFollowedCountController';
import WorkerMobileController from './app/controllers/Worker/WorkerMobileController';
import WorkerController from './app/controllers/Worker/WorkerController';
import WorkerUpdateNoPhotoController from './app/controllers/Worker/WorkerUpdateNoPhotoController';
import WorkerIndividualController from './app/controllers/Worker/WorkerIndividualController';
import WorkerNotificationController from './app/controllers/Worker/WorkerNotificationController';
// -----------------------------------------------------------------------------
const routes = new Router();
// const upload = multer(multerConfig);
routes.post('/messages', MessageController.store);
routes.get('/messages/:id', MessageController.index);
routes.get('/messages', MessageUserController.index);
routes.put('/messages/:id', MessageController.update);
routes.put('/messages/:id/user', MessageUserController.update);
routes.put('/messages/:id/worker', MessageWorkerController.update);
routes.put('/messages/update/:id', MessageUpdateController.update);
routes.put('/messages/remove/:id', MessageRemoveController.update);

routes.post('/sessions', SessionController.store);

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.get('/tasks/finished', TaskWorkerFinishedController.index);
routes.get('/tasks/unfinished', TaskWorkerUnfinishedController.index);
routes.get('/tasks/canceled', TaskWorkerCanceledController.index);
routes.get('/tasks/count', TaskWorkerCountController.index);
routes.get('/tasks/:id/details', TaskDetailController.index);
routes.get('/tasks/user/canceled', TaskUserCanceledController.index);
routes.get('/tasks/user/unfinished', TaskUserUnfinishedController.index);
routes.get('/tasks/user/finished', TaskUserFinishedController.index);
routes.get('/tasks/user/count', TaskUserCountController.index);
routes.put('/tasks/messages/:id', TaskMessageController.update);
routes.put('/tasks/confirm/:id', TaskConfirmController.update);
routes.put('/tasks/:id', TaskController.update);
routes.put(
  '/tasks/:id/notification/user',
  TaskUserNotificationController.update
);
routes.put(
  '/tasks/:id/notification/worker',
  TaskWorkerNotificationController.update
);
routes.put('/tasks/:id/details', TaskDetailController.update);
routes.put('/tasks/:id/cancel', TaskCancelController.update);
routes.put('/tasks/:id/revive', TaskReviveController.update);
routes.delete('/tasks/:id', TaskController.delete);

routes.post('/users', UserController.store);
routes.post('/users/:id/following', UserFollowingController.store);
routes.get('/users/:id/following', UserFollowingController.index);
routes.get('/users/:id/following/count', UserFollowingCountController.index);
routes.get(
  '/users/following/individual',
  UserFollowingIndividualController.index
);
routes.get('/users/:id', UserListIndividualController.index);
routes.put('/users', UserController.update);
routes.put('/users/:id/following', UserFollowingController.update);
routes.put('/users/no-photo', UserUpdateNoPhotoController.update);

routes.post('/workers', WorkerController.store);
routes.get('/workers', WorkerController.index);
routes.get('/workers/mobile', WorkerMobileController.index);
routes.get('/workers/individual', WorkerIndividualController.index);
routes.get('/workers/:id/followed', WorkerFollowedController.index);
routes.get('/workers/:id/followed/count', WorkerFollowedCountController.index);
routes.put('/workers', WorkerController.update);
routes.put('/workers/no-photo', WorkerUpdateNoPhotoController.update);
routes.put('/workers/:id/notifications', WorkerNotificationController.update);

// routes.get('/messages/tfeed', TaskFeedMobileController.index);
// routes.put('/tasks/:id/tfeed/comment', T_FeedController.update);

routes.post('/signatures', SignatureController.store);
routes.get('/signatures', SignatureController.index);

routes.post('/files', FileController.store);
routes.get('/files', FileController.index);
// -----------------------------------------------------------------------------
routes.use(authMiddleware);
// -----------------------------------------------------------------------------

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.put('/users/:id/notifications', UserNotificationController.update);
routes.delete('/users', UserController.delete);

routes.delete('/workers', WorkerController.delete);

export default routes;
