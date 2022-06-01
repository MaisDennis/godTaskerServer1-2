import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import Worker from '../../models/Worker';
// import File from '../../models/File';
// -----------------------------------------------------------------------------
class WorkerUpdateNoPhotoController {
  async update(req, res) {
    const schema = Yup.object().shape({
      first_name: Yup.string(),
      last_name: Yup.string(),
      email: Yup.string(),
      instagram: Yup.string(),
      linkedin: Yup.string(),
      bio: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro nos dados' });
    }

    const { email } = req.body;

    let worker = await Worker.findOne({
      where: { email },
    });
    // console.log(worker);

    await worker.update(req.body);

    worker = await Worker.findOne({
      where: { email },
    });

    return res.json(worker);
  }
}
export default new WorkerUpdateNoPhotoController();
