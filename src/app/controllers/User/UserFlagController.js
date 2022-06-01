import { Op } from 'sequelize';
import User from '../../models/User';
import Worker from '../../models/Worker';
// -----------------------------------------------------------------------------
class UserFlagController {
  async index(req, res) {
    const users = await User.findAll({
      where: {
        flag_count: {
          [Op.gte]: 1,
        },
      },
    });

    return res.json(users);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { email, flagger_email } = req.body;
    // console.log(flagger_email);

    const user = await User.findOne({
      where: { email },
    });

    const worker = await Worker.findOne({
      where: { email },
    });

    let user_flagged_list = user.flagged_list;
    let worker_flagged_list = worker.flagged_list;

    if (user_flagged_list === null) {
      user_flagged_list = [];
      user_flagged_list.push(flagger_email);
    } else {
      user_flagged_list.push(flagger_email);
    }

    if (worker_flagged_list === null) {
      worker_flagged_list = [];
      worker_flagged_list.push(flagger_email);
    } else {
      worker_flagged_list.push(flagger_email);
    }

    const counter = user.flag_count + 1;

    await user.update({
      flag_count: counter,
      flagged_list: user_flagged_list,
    });

    await worker.update({
      flag_count: counter,
      flagged_list: worker_flagged_list,
    });

    // console.log({ user_flagged_list, worker_flagged_list });

    return res.json(user);
  }
}
export default new UserFlagController();
