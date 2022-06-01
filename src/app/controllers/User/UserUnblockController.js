import User from '../../models/User';
import Worker from '../../models/Worker';
// -----------------------------------------------------------------------------
class UserUnblockController {
  async update(req, res) {
    const { email, unblocker_email } = req.body;
    // console.log(flagger_email);

    const user = await User.findOne({
      where: { email },
    });

    const worker = await Worker.findOne({
      where: { email },
    });

    const user_blocked_list = user.blocked_list;
    const worker_blocked_list = worker.blocked_list;

    user_blocked_list.map(u => {
      if (u === unblocker_email) {
        const position = user_blocked_list.indexOf(u);
        user_blocked_list.splice(position, 1);
      }
      return user_blocked_list;
    });

    worker_blocked_list.map(w => {
      if (w === unblocker_email) {
        const position = worker_blocked_list.indexOf(w);
        worker_blocked_list.splice(position, 1);
      }
      return worker_blocked_list;
    });

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
export default new UserUnblockController();
