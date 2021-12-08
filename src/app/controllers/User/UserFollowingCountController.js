import User from '../../models/User';
// import Worker from '../../models/Worker';
// -----------------------------------------------------------------------------
class UserFollowingCountController {
  async index(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const workers = await user.getWorker();
    const countFollowing = workers.length;

    return res.json(countFollowing);
  }
}

export default new UserFollowingCountController();
