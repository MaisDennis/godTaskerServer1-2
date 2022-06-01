import { Op } from 'sequelize';
import firebaseAdmin from 'firebase-admin';
// -----------------------------------------------------------------------------
import User from '../../models/User';
import Worker from '../../models/Worker';
import File from '../../models/File';
// -----------------------------------------------------------------------------
class UserFollowingController {
  async store(req, res) {
    // const { id } = req.params;
    // const { worker_id } = req.body;
    const { user_email, worker_email } = req.body;

    const user = await User.findOne({
      where: {
        email: user_email,
      },
    });
    const worker = await Worker.findOne({
      where: {
        email: worker_email,
      },
    });

    user.addWorker(worker.id);

    // Firebase Notification ***************************************************
    const pushMessage = {
      notification: {
        title: `The Godtasker`,
        body: `${user.user_name} started following you`,
      },
      data: {
        channelId: 'godtaskerChannel01', // (required)
        title: `The Godtasker`,
        message: `${user.user_name} started following you`,
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

    return res.json(user);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { contactName, nameFilter } = req.query;
    const user = await User.findOne({
      where: {
        user_name: contactName,
      },
    });
    const workers = await user.getWorker({
      where: {
        worker_name: {
          [Op.like]: `%${nameFilter}%`,
        },
        canceled_at: null,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(workers);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    // const { id } = req.params;
    const { user_email, worker_email } = req.body;
    const user = await User.findOne({
      where: {
        email: user_email,
      },
    });

    const worker = await Worker.findOne({
      where: {
        email: worker_email,
      },
    });

    user.removeWorker(worker.id);

    return res.json(user);
  }
}

export default new UserFollowingController();
