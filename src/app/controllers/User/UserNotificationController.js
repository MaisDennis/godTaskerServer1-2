import User from '../../models/User';
import Worker from '../../models/Worker';

class UserNotificationController {
  async update(req, res) {
    const { id } = req.params;
    const { notification_token, worker_id } = req.body;
    console.log(id, worker_id, notification_token)

    let user = await User.findByPk(id);
    let worker = await Worker.findByPk(worker_id);

    user = await user.update({
      notification_token,
    });

    worker = await worker.update({
      notification_token,
    });

    return res.json({ user, worker });
  }
}

export default new UserNotificationController();
