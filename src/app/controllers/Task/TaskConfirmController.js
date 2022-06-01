import firebaseAdmin from 'firebase-admin';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
// -----------------------------------------------------------------------------
class TaskConfirmController {
  async update(req, res) {
    const { id } = req.params; // id: task_id.
    const end_date = new Date();
    const { signature_id, score, messageTitle, messageMessage } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({
      end_date,
      signature_id,
      score,
    });

    // Firebase Notification ***************************************************
    const worker = await Worker.findByPk(task.worker_id);

    const pushMessage = {
      notification: {
        title: messageTitle,
        body: messageMessage,
      },
      data: {
        channelId: 'godtaskerChannel01', // (required)
        title: messageTitle,
        message: messageMessage,
      },
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

    if (worker.notification_token) {
      firebaseAdmin
        .messaging()
        .send(pushMessage)
        .then(response => {
          console.log('Successfully sent message: ', response);
        })
        .catch(error => {
          console.log('Error sending message: ', error);
        });
    }

    return res.json(task);
  }
}
export default new TaskConfirmController();
