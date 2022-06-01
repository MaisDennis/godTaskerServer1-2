import { Op } from 'sequelize';
// -----------------------------------------------------------------------------
import File from '../../models/File';
import Worker from '../../models/Worker';

class WorkerFollowedCountController {
  async index(req, res) {
    const { worker_name, nameFilter } = req.query;
    const worker = await Worker.findOne({
      where: {
        worker_name,
      },
    });
    const users = await worker.getUser({
      where: {
        user_name: {
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

    // const countFollowers = users.length;

    return res.json(users);
  }
}

export default new WorkerFollowedCountController();
