import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import User from '../../models/User';
// -----------------------------------------------------------------------------
class UserCheckController {
  async index(req, res) {
    const { username, phonenumber } = req.query;
    console.log(phonenumber);

    // const schema = Yup.object().shape({
    //   user_name: Yup.string().required(),
    //   email: Yup.string()
    //   .email()
    //   .required(),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).send({ error: 'Create User fail: Schema error' });
    // }

    const userExists = await User.findAll({
      where: {
        user_name: username,
      },
    });

    // const emailExists = await User.findAll({
    //   where: {
    //     email,
    //   },
    // });

    const phonenumberExists = await User.findAll({
      where: {
        phonenumber,
      },
    });

    if (userExists != 0 && phonenumberExists != 0) {
      return res.json({ user: true, phonenumber: true });
    }

    if (userExists != 0 && phonenumberExists == 0) {
      return res.json({ user: true, phonenumber: false });
    }

    if (userExists == 0 && phonenumberExists != 0) {
      return res.json({ user: false, phonenumber: true });
    }

    return res.json({ user: false, phonenumber: false });
  }
}

export default new UserCheckController();
