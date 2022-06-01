import { Op } from 'sequelize';
import firebaseAdmin from 'firebase-admin';
//------------------------------------------------------------------------------
import File from '../../models/File';
import Message from '../../models/Message';
import User from '../../models/User';
import Worker from '../../models/Worker';
//------------------------------------------------------------------------------
class MessageController {
  async store(req, res) {
    const {
      user_id,
      user_email,
      worker_id,
      worker_email,
      chat_id,
      messaged_at,
    } = req.body;

    const message = await Message.create({
      user_id,
      user_email,
      worker_id,
      worker_email,
      chat_id,
      messaged_at,
    });

    return res.json(message);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { user_email } = req.query; // user ID

    const user = await User.findOne({
      where: { email: user_email },
    });

    const { blocked_list } = user;
    let checked_blocked_list = [];

    if (blocked_list !== null) {
      checked_blocked_list = blocked_list;
    }

    const messages = await Message.findAll({
      order: [['updated_at', 'DESC']],
      where: {
        [Op.or]: [{ user_email }, { worker_email: user_email }],
        user_email: {
          [Op.notIn]: checked_blocked_list,
        },
        worker_email: {
          [Op.notIn]: checked_blocked_list,
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'user_name', 'email'],
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
          attributes: ['id', 'worker_name', 'email'],
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

    return res.json(messages);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params;
    const { messaged_at, messageObject, profileUserEmail } = req.body;
    // console.table(messageObject);

    const user = await User.findOne({
      where: {
        email: messageObject.receiver_email,
      },
    });
    // const worker = await Worker.findByPk(messageObject.receiver_id_02);
    // const notificationToken =
    // profileUserEmail === user.email
    //   ? worker.notification_token
    //   : user.notification_token;

    const notificationToken = user.notification_token;
    console.log(notificationToken);

    let pushMessage = {};
    try {
      // When Worker Declines or Accepts the Task
      pushMessage = {
        notification: {
          title: `${messageObject.sender_name}:`,
          body: `${messageObject.message}:`,
        },
        data: {
          title: `${messageObject.sender_name}:`,
          message: `${messageObject.message}:`,
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
        token: notificationToken,
      };

      if (user.notification_token) {
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
    } catch (error) {
      console.log(error);
    }

    let message = await Message.findOne({
      where: {
        chat_id: id,
      },
    });

    message = await message.update({
      messaged_at,
    });

    return res.json(message);
  }

  // ---------------------------------------------------------------------------
  async delete(req, res) {
    const { id } = req.params;

    let message = await Message.findByPk(id);

    message = await message.destroy();

    return res.json(message);
  }
}
export default new MessageController();
