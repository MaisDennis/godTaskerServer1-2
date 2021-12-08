import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import Worker from '../../models/Worker';
// import File from '../../models/File';
// -----------------------------------------------------------------------------
class UserUpdateNoPhotoController {

  async update(req, res) {
    const {
      first_name,
      last_name,
      worker_name,
      phonenumber,
      birth_date,
      gender,
      bio,
      instagram,
      linkedin,

    } = req.body;

    const worker = await Worker.findOne({
      where: { phonenumber: phonenumber },
    });
    // console.log(worker);

    await worker.update({
      first_name,
      last_name,
      worker_name,
      phonenumber,
      birth_date,
      gender,
      bio,
      instagram,
      linkedin,
    });

    return res.json({
      first_name,
      last_name,
      worker_name,
      birth_date,
      gender,
    });
  }
}
export default new UserUpdateNoPhotoController();
