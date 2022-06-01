import * as Yup from 'yup';
// -----------------------------------------------------------------------------
// import firebase from 'firebase';
import User from '../../models/User';
import Worker from '../../models/Worker';
import File from '../../models/File';
// -----------------------------------------------------------------------------
class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      user_name: Yup.string().required(),
      worker_name: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
      email: Yup.string(),
    });

    // console.log(req.body);

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Create User fail: Schema error' });
    }

    const {
      id,
      subscriber,
      user_name,
      worker_name,
      hint,
      email,
      // password,
      points,
      bio,
    } = req.body;

    console.log(req.body);

    const userExists = await User.findOne({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Create User fail: Email already exists.' });
    }

    // const emailError = false;

    // await firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(response => {
    //     response.user.sendEmailVerification();
    //     console.log('User account created & signed in!');
    //     emailError = false;
    //   })
    //   .catch(error => {
    //     emailError = true;
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }
    //     console.error(error);
    //     return res.json(error);
    //   });

    // if (emailError === false) {
    const user = await User.create({
      id,
      subscriber,
      user_name,
      hint,
      email,
      points,
      bio,
    });

    const worker = await Worker.create({
      id,
      subscriber,
      worker_name,
      email,
      points,
      bio,
    });

    return res.json({
      user,
      worker,
    });
    // }
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const {
      email,
      // oldPassword,
    } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    // if (oldPassword && !(await user.checkPassword(oldPassword))) {
    //   return res.status(401).json({ error: 'Password does not match' });
    // }

    await user.update(req.body);

    const { id, first_name, last_name, user_name, avatar } = await User.findOne(
      {
        where: { email },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      }
    );
    return res.json({
      id,
      first_name,
      last_name,
      user_name,
      email,
      avatar,
    });
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const users = await User.findAll({
      where: {
        canceled_at: null,
      },
    });

    return res.json(users);
  }

  // ---------------------------------------------------------------------------
  async delete(req, res) {
    const { id } = req.params;
    let user = await User.findByPk(id);

    user = await user.destroy();

    return res.json(user);
  }
}

export default new UserController();
