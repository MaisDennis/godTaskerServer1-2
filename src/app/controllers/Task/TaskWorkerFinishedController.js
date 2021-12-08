import { Op } from 'sequelize';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
import File from '../../models/File';
import User from '../../models/User';
import Signature from '../../models/Signature';
// -----------------------------------------------------------------------------
class TaskWorkerFinishedController {
  async index(req, res) {
    const { workerID } = req.query;
    // const { test } = req.query;
    const tasks = await Task.findAll({
      order: ['end_date'],
      where: {
        worker_id: workerID, canceled_at: null, end_date: { [Op.ne]: null },
      },
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'worker_name'],
          // where: {
          //   name: {
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
        {
          model: Signature,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(tasks);
  }
}

export default new TaskWorkerFinishedController();
