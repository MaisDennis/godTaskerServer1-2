import { Op } from 'sequelize';
// -----------------------------------------------------------------------------
import Worker from '../../models/Worker';

class WorkerFollowedController {
  async index(req, res) {
    // const { id } = req.params;
    const { worker_name } = req.query;
    const worker = await Worker.findOne({
      where: {
        worker_name,
      },
    });
    const users = await worker.getUser();

    const countFollowers = users.length;

    return res.json(countFollowers);
  }
}

export default new WorkerFollowedController();
