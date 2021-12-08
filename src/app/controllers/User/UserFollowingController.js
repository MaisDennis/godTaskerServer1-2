import { Op } from 'sequelize';
// -----------------------------------------------------------------------------
import User from '../../models/User';
// import Worker from '../../models/Worker';
import File from '../../models/File';
// -----------------------------------------------------------------------------
class UserFollowingController {
  async store(req, res) {
    const { id } = req.params;
    const { worker_id } = req.body;
    // console.log({ id, worker_id });

    const user = await User.findByPk(id);

    user.addWorker(worker_id);

    return res.json(user);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { id } = req.params;
    const { nameFilter } = req.query;
    const user = await User.findByPk(id);
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
    const { id } = req.params;
    const { worker_id } = req.body;
    const user = await User.findByPk(id);

    user.removeWorker(worker_id);

    return res.json(user);
  }
}

export default new UserFollowingController();
