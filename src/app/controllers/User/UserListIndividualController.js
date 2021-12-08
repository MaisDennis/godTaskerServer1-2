import User from '../../models/User';
import File from '../../models/File';
// -----------------------------------------------------------------------------
class UserListIndividualController {
  async index(req, res) {
    const { id } = req.params;
    // const {
    //   first_name,
    //   last_name,
    //   user_name,
    //   avatar,
    //   instagram,
    //   linkedin,
    //   bio,
    // } = await User.findByPk(id);

    const user = await User.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    // return res.json({
    //   first_name,
    //   last_name,
    //   user_name,
    //   avatar,
    //   instagram,
    //   linkedin,
    //   bio,
    // });

    return res.json(user);
  }
}

export default new UserListIndividualController();
