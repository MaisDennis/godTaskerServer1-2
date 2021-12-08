import { Op } from 'sequelize';
// -----------------------------------------------------------------------------
import Worker from '../../models/Worker';

class WorkerFollowedController {
  async index(req, res) {
    const { id } = req.params;
    let worker = await Worker.findByPk(id);
    const users = await worker.getUser();

    const countFollowers = users.length;

    return res.json(countFollowers);
  }
}

export default new WorkerFollowedController();
