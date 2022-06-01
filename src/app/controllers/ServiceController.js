import Service from '../models/Service';
import User from '../models/User';
// -----------------------------------------------------------------------------
class ServiceController {
  // create task----------------------------------------------------------------
  async store(req, res) {
    const {
      creator_email,
      name,
      description,
      sub_task_list,
      // task_attributes,
    } = req.body;

    const service = await Service.create({
      creator_email,
      name,
      description,
      sub_task_list,
      // task_attributes,
    });

    return res.json(service);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { creator_email } = req.query;

    const services = await Service.findAll({
      where: { creator_email },
    });

    const displays = await Service.findAll({
      where: {
        creator_email,
        display_in_profile: true,
      },
    });
    return res.json({ services, displays });
  }

  // edit task------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params; // id: task_id
    // console.log(id)
    const {
      name,
      description,
      sub_task_list,
      task_attributes,
      price,
      confirm_photo_option,
      tenure,
      display_in_profile,
    } = req.body;

    let service = await Service.findByPk(id);

    service = await service.update({
      name,
      description,
      sub_task_list,
      task_attributes,
      price,
      confirm_photo_option,
      tenure,
      display_in_profile,
    });

    return res.json(service);
  }

  // ---------------------------------------------------------------------------
  async delete(req, res) {
    const { id } = req.params; // id: task_id

    let service = await Service.findByPk(id);

    service = await service.destroy();

    return res.json(service);
  }
}
export default new ServiceController();
