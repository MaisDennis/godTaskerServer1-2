import Message from '../../models/Message';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
import firebaseAdmin from 'firebase-admin'
// import Notification from '../../schemas/Notification';
class MessageController {
  async store(req, res) {
    const {
    task_id, user_id, user_name, worker_id, worker_name,
    } = req.body;

    const message = await Message.create({
      task_id,
      worker_id,
      worker_name,
      user_id,
      user_name,
      messages: [],
    });

    return res.json(message);
  }
  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { id } = req.params; // task ID

    const messages = await Message.findByPk(id)

    return res.json(messages);
  }
  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params;
    const { messages, task_id } = req.body;

    let message = await Message.findByPk(id);

    message.messages.push(messages)

    message = await message.update({
      messages: message.messages,
    });

    // Firebase Notification ***************************************************
    // const formattedDate = fdate =>
    // fdate == null
    //   ? ''
    //   : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

    // const task = await Task.findByPk(task_id)
    // const worker = await Worker.findByPk(message.worker_id)


    // const pushMessage = {
    //   notification: {
    //     title: `Message for task: ${task.name}`,
    //     body: `${task.due_date}`
    //   },
    //   data: {

    //   },
    //   android: {
    //     notification: {
    //       sound: 'default'
    //     }
    //   },
    //   apns: {
    //     payload: {
    //       aps: {
    //         sound: 'default'
    //       }
    //     }
    //   },
    //   token: worker.notification_token
    // };

    // firebaseAdmin.messaging().send(pushMessage)
    //   .then(response => {
    //     console.log('Successfully sent message: ', response);
    //   })
    //   .catch(error => {
    //     console.log('Error sending message: ', error);
    //   })

    return res.json(message);
  }
}
export default new MessageController();
