import * as Yup from 'yup';
import { Op } from 'sequelize';
// -----------------------------------------------------------------------------
import User from '../../models/User';
import Worker from '../../models/Worker';
import File from '../../models/File';
// -----------------------------------------------------------------------------
class WorkerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      worker_name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Create Worker fail: Schema error' });
    }

    const { id, subscriber, worker_name, email, points, bio } = req.body;

    const workerExists = await Worker.findOne({
      where: { email },
    });
    if (workerExists) {
      return res
        .status(400)
        .json({ error: 'Create Worker fail: Email already exists.' });
    }

    const worker = await Worker.create({
      id,
      subscriber,
      worker_name,
      email,
      points,
      bio,
    });

    return res.json(worker);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Create Worker fail: Schema error' });
    }

    const { email } = req.body;

    const worker = await Worker.findOne({
      where: { email },
    });

    await worker.update(req.body);

    const {
      id,
      first_name,
      last_name,
      worker_name,
      avatar,
    } = await Worker.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      first_name,
      last_name,
      worker_name,
      email,
      avatar,
    });
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { nameFilter, user_email } = req.query;

    const user = await User.findOne({
      where: { email: user_email },
    });

    const { blocked_list } = user;
    let checked_blocked_list = [];

    if (blocked_list !== null) {
      checked_blocked_list = blocked_list;
    }

    const workers = await Worker.findAll({
      where: {
        worker_name: {
          [Op.iLike]: `%${nameFilter}%`,
        },
        email: {
          [Op.notIn]: checked_blocked_list,
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

  //----------------------------------------------------------------------------
  async delete(req, res) {
    const { id } = req.params;
    let worker = await Worker.findByPk(id);

    worker = await worker.destroy();

    return res.json(worker);
  }
}

export default new WorkerController();
