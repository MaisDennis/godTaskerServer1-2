import User from '../../models/User';
// import Worker from '../../models/Worker';
// -----------------------------------------------------------------------------
class UserFollowingCountController {
  async index(req, res) {
    const { contactName } = req.query;
    const user = await User.findOne({
      where: {
        user_name: contactName,
      },
    });
    const workers = await user.getWorker();
    const countFollowing = workers.length;

    return res.json(countFollowing);
  }
}

export default new UserFollowingCountController();
