import 'firebase/firestore';
// import firebaseAdmin from 'firebase-admin';
// import firebase from '../../../config/firebase'
import Task from '../../models/Task';
// import Worker from '../../models/Worker';

class TaskReviveController {
  async update(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({
      canceled_at: null,
      status,
    });
    // Firebase Notification ***************************************************
    // const worker = await Worker.findByPk(task.worker_id);

    // const pushMessage = {
    //   notification: {
    //     title: `Task has been canceled`,
    //     body: `${task.name}`,
    //   },
    //   data: {},
    //   android: {
    //     notification: {
    //       sound: 'default',
    //     },
    //   },
    //   apns: {
    //     payload: {
    //       aps: {
    //         sound: 'default',
    //       },
    //     },
    //   },
    //   token: worker.notification_token,
    // };

    // firebaseAdmin
    //   .messaging()
    //   .send(pushMessage)
    //   .then(response => {
    //     console.log('Successfully sent message: ', response);
    //   })
    //   .catch(error => {
    //     console.log('Error sending message: ', error);
    //   });

    return res.json(task);
  }
}
export default new TaskReviveController();
