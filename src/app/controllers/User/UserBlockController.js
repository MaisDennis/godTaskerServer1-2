import { Op } from 'sequelize';
import User from '../../models/User';
import Worker from '../../models/Worker';
// -----------------------------------------------------------------------------
class UserBlockController {
  async index(req, res) {
    const users = await User.findAll({
      where: {
        blocked_list: {
          [Op.ne]: [],
        },
      },
    });

    return res.json(users);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { email, blocker_email } = req.body;
    console.log(email);

    const user = await User.findOne({
      where: { email },
    });

    const worker = await Worker.findOne({
      where: { email },
    });

    let user_blocked_list = user.blocked_list;
    let worker_blocked_list = worker.blocked_list;

    if (user_blocked_list === null) {
      user_blocked_list = [];
      user_blocked_list.push(blocker_email);
    } else {
      user_blocked_list.push(blocker_email);
    }

    if (worker_blocked_list === null) {
      worker_blocked_list = [];
      worker_blocked_list.push(blocker_email);
    } else {
      worker_blocked_list.push(blocker_email);
    }

    await user.update({
      blocked_list: user_blocked_list,
    });

    await worker.update({
      blocked_list: worker_blocked_list,
    });

    // console.log({ user_flagged_list, worker_flagged_list });

    return res.json(user);
  }
}
export default new UserBlockController();
