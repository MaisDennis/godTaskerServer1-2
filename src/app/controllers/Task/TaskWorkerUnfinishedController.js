import { Op } from 'sequelize';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
import File from '../../models/File';
import User from '../../models/User';
// -----------------------------------------------------------------------------
class TaskWorkerUnfinishedController {
  async index(req, res) {
    const { workerID } = req.query;
    // const { test } = req.query;
    const tasks = await Task.findAll({
      order: ['due_date'],
      where: { worker_id: workerID, canceled_at: null, end_date: null },
      // where: { end_date: null },
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'worker_name'],
          // where: {
          //   worker_name: {
          //     [Op.like]: `%${test}%`,
          //   },
          // },
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
          attributes: ['id', 'user_name'],
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
