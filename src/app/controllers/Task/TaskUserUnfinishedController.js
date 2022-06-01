import { Op } from 'sequelize';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
import File from '../../models/File';
import User from '../../models/User';
// -----------------------------------------------------------------------------
class TaskUserUnfinishedController {
  async index(req, res) {
    const { workerNameFilter, userID, nameFilter } = req.query;
    // console.log(req.query)
    const parsedUserID = parseInt(userID);
    const tasks = await Task.findAll({
      order: ['due_date'],
      where: {
        user_id: parsedUserID,
        canceled_at: null,
        end_date: null,
        name: { [Op.iLike]: `%${nameFilter}%` },
      },
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'worker_name', 'email'],
          where: {
            worker_name: {
              [Op.like]: `%${workerNameFilter}%`,
            },
          },
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
    const countTasks = tasks.length;
    console.log(countTasks);
    return res.json(tasks);
  }
}

export default new TaskUserUnfinishedController();
