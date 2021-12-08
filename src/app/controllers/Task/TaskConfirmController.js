// import * as Yup from 'yup';
import firebaseAdmin from 'firebase-admin';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
// import Notification from '../../schemas/Notification';
// -----------------------------------------------------------------------------
class TaskConfirmController {
  async update(req, res) {
    const { id } = req.params; // id: task_id.
    const end_date = new Date();
    const { signature_id } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({
      end_date,
      signature_id,
    });

    // const worker = await Worker.findByPk(task.worker_id);

    // await Notification.create({
    //   content: `${worker.name} finalizou a tarefa ${task.name}.`,
    //   task: task.id,
    //   worker: task.worker_id,
    // });

    // Firebase Notification ***************************************************
    const worker = await Worker.findByPk(task.worker_id);

    const pushMessage = {
      notification: {
        title: `Task has been completed!`,
        body: `${task.name}`,
      },
      data: {},
      android: {
        notification: {
          sound: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
      token: worker.notification_token,
    };

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
export default new TaskConfirmController();
