import { Op } from 'sequelize';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
import File from '../../models/File';
import User from '../../models/User';
// -----------------------------------------------------------------------------
class TaskWorkerUnfinishedController {
  async index(req, res) {
    const { workerID, nameFilter } = req.query;
    const tasks = await Task.findAll({
      order: ['due_date'],
      where: {
        worker_id: workerID,
        canceled_at: null,
        end_date: null,
        name: { [Op.iLike]: `%${nameFilter}%` },
      },
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'worker_name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'user_name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(tasks);
  }
}

export default new TaskWorkerUnfinishedController();
