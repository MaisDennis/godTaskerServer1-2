import Message from '../../models/Message';
import Task from '../../models/Task';
import User from '../../models/User';
import Worker from '../../models/Worker';
import firebaseAdmin from 'firebase-admin'

class MessageWorkerController {

  async update(req, res) {
    const { id } = req.params;
    const { messages, task_id, user_id, worker_id } = req.body;
    console.log('MessageWorkerController')

    let message = await Message.findByPk(id);

    message.messages.push(messages)

    message = await message.update({
      messages: message.messages,
    });

    // Firebase Notification ***************************************************
    const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

    const task = await Task.findByPk(task_id)
    const worker = await Worker.findByPk(message.worker_id)
    const user = await User.findByPk(user_id)

    const pushMessage = {
      notification: {
        title: `Message from ${worker.worker_name}`,
        body: `Task: ${task.name} Message: ${messages.message}`
      },
      data: {

      },
      android: {
        notification: {
          sound: 'default'
        }
      },
      apns: {
        payload: {
          aps: {
            sound: 'default'
          }
        }
      },
      token: user.notification_token
    };

    firebaseAdmin.messaging().send(pushMessage)
      .then(response => {
        console.log('Worker sent message: ', response);
      })
      .catch(error => {
        console.log('Error sending message: ', error);
      })

    return res.json(message);
  }
}
export default new MessageWorkerController();
