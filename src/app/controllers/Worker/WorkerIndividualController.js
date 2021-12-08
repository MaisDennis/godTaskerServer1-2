import * as Yup from 'yup';
import { Op } from 'sequelize';
// -----------------------------------------------------------------------------
import Worker from '../../models/Worker';
import File from '../../models/File';

class WorkerIndividualController {
  async index(req, res) {
    // const { id } = req.params;
    // const { phonenumber } = req.body;
    const { phonenumber } = req.query;
    // console.log(phonenumber)
    // const worker = await Worker.findByPk(id);

    const worker = await Worker.findOne({
      attributes: [
        'subscriber',
        'first_name',
        'last_name',
        'worker_name',
        'worker_password',
        'phonenumber',
        'email',
        'birth_date',
        'gender',
        'avatar_id',
      ],
      where: {
        phonenumber: phonenumber
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    // console.log(worker)
    return res.json(worker);
  }
}

export default new WorkerIndividualController();
