import { Op } from 'sequelize';

import firebaseAdmin from 'firebase-admin';
import File from '../../models/File';
import Message from '../../models/Message';
import Task from '../../models/Task';
import User from '../../models/User';
import Worker from '../../models/Worker';
// import Notification from '../../schemas/Notification';
class MessageController {
  async store(req, res) {
    // const { chat_id } = req.query;
    // Firebase Firestore Chat Message******************************************
    // const messagesRef = firestore.collection(`messages/chat/${chat_id}`)

    // const message_id = Math.floor(Math.random() * 1000000)

    // messagesRef
    //   .doc(`${message_id}`)
    //   .set({
    //     id: message_id,
    //     message: `Bem-vindo a tarefa ${task.name}, pode fazer perguntas por aqui!`,
    //     sender: `user`,
    //     user_read: true,
    //     worker_read: false,
    //     timestamp: formattedDate(new Date()),
    //     reply_message: '',
    //     reply_sender: '',
    //     forward_message: false,
    //     visible: true,
    //     createdAt: new Date(),
    //     taskId: task.id,
    //     workerId: '',
    //   })
    //   .then((docRef) => {
    //     documentId = docRef.id;
    //     console.log(documentId)
    //   })
    //   .catch((error) => {
    //     console.error("Error adding document: ", error);
    //   });

    const { user_id, worker_id, chat_id, messaged_at } = req.body;
    console.log(req.body);

    const message = await Message.create({
      worker_id,
      user_id,
      chat_id,
      messaged_at,
    });

    return res.json(message);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { id } = req.params; // user ID

    const messages = await Message.findAll({
      order: [['updated_at', 'DESC']],
      where: {
        [Op.or]: [{ user_id: id }, { worker_id: id }],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'user_name', 'phonenumber'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'worker_name', 'phonenumber'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    // const invertedMessages = await Message.findAll({
    //   where: {
    //     worker_id: id,
    //   },
    //   include: [
    //     {
    //       model: User,
    //       as: 'user',
    //       attributes: ['id', 'user_name', 'phonenumber'],
    //       include: [
    //         {
    //           model: File,
    //           as: 'avatar',
    //           attributes: ['name', 'path', 'url'],
    //         },
    //       ],
    //     },
    //     {
    //       model: Worker,
    //       as: 'worker',
    //       attributes: ['id', 'worker_name', 'phonenumber'],
    //       include: [
    //         {
    //           model: File,
    //           as: 'avatar',
    //           attributes: ['name', 'path', 'url'],
    //         },
    //       ],
    //     },
    //   ],
    // })

    return res.json(messages);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params;
    const { messaged_at } = req.body;
    console.log('eureeka!!');
    let message = await Message.findOne({
      where: {
        chat_id: id,
      },
    });

    message = await message.update({
      messaged_at,
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
