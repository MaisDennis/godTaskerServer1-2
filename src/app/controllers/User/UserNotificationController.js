import User from '../../models/User';
import Worker from '../../models/Worker';

class UserNotificationController {
  async update(req, res) {
    const { id } = req.params;
    const { notification_token } = req.body;
    // console.log(id, notification_token);

    try {
      let user = await User.findByPk(id);
      let worker = await Worker.findByPk(id);

      user = await user.update({
        notification_token,
      });

      worker = await worker.update({
        notification_token,
      });

      return res.json({ user, worker });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserNotificationController();
