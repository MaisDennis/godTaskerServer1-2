import { Op } from 'sequelize';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
import File from '../../models/File';
import User from '../../models/User';
// -----------------------------------------------------------------------------
class TaskWorkerCanceledController {
  async index(req, res) {
    const { workerID, nameFilter } = req.query;
    const tasks = await Task.findAll({
      where: {
        worker_id: workerID,
        canceled_at: { [Op.ne]: null },
        name: { [Op.iLike]: `%${nameFilter}%` },
      },
      order: ['due_date'],
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

export default new TaskWorkerCanceledController();
