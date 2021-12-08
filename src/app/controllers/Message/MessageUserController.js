import firebaseAdmin from 'firebase-admin';
import Message from '../../models/Message';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
// -----------------------------------------------------------------------------
class MessageUserController {
  async index(req, res) {
    const { user_id, worker_id } = req.query;
    console.log(user_id);
    let inverted = false;

    let message = await Message.findOne({
      where: {
        user_id,
        worker_id,
      },
    });

    if (message === null) {
      message = await Message.findOne({
        where: {
          user_id: worker_id,
          worker_id: user_id,
        },
      });
      inverted = true;
      return res.json({ message, inverted });
    }
    return res.json({ message, inverted });
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params;
    const { messages, task_id, user_name } = req.body;
    console.log('MessageWorkerController');

    let message = await Message.findByPk(id);

    message.messages.push(messages);

    message = await message.update({
      messages: message.messages,
    });

    // Firebase Notification ***************************************************

    const task = await Task.findByPk(task_id);
    const worker = await Worker.findByPk(message.worker_id);

    const pushMessage = {
      notification: {
        title: `Message from ${user_name}`,
        body: `Task: ${task.name} Message: ${messages.message}`,
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

    firebaseAdmin
      .messaging()
      .send(pushMessage)
      .then(response => {
        console.log('User sent message: ', response);
      })
      .catch(error => {
        console.log('Error sending message: ', error);
      });

    return res.json(message);
  }
}
export default new MessageUserController();
