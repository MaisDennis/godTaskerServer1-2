import Worker from '../../models/Worker';
import File from '../../models/File';
// -----------------------------------------------------------------------------
class WorkerMobileController {
  async index(req, res) {
    const workers = await Worker.findAll({
      // attributes: [
      //   'id',
      //   'name',
      //   'dept',
      //   'phonenumber',
      //   'phonenumber_lastfourdigits',
      //   'gender',
      //   'worker_password',
      //   'avatar_id',
      //   'user_id',
      // ],
      attributes: [
        'id',
        'subscriber',
        'first_name',
        'last_name',
        'worker_name',
        'worker_password',
        'phonenumber',
        'email',
        'birth_date',
        'gender',
        'instagram',
        'linkedin',
        'bio',
      ],
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
}

export default new WorkerMobileController();
