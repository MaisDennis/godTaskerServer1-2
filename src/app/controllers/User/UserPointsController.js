// -----------------------------------------------------------------------------
import User from '../../models/User';
import Worker from '../../models/Worker';
// -----------------------------------------------------------------------------
class UserPointsController {
  async update(req, res) {
    const { id } = req.params;
    const { points } = req.body;

    const user = await User.findByPk(id);
    const worker = await Worker.findByPk(id);
    const sumPoints = user.points + points;

    await user.update({
      points: sumPoints,
    });

    await worker.update({
      points: sumPoints,
    });

    return res.json({ user, worker });
  }
}

export default new UserPointsController();
