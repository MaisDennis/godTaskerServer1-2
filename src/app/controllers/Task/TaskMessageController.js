import Task from '../../models/Task';

class TaskMessageController {

  async update(req, res) {
    const {id} = req.params;
    const messages = req.body;
    // console.log(id)
    // console.log(messages)
    let task = await Task.findByPk(id);

    task = await task.update({
      messages: messages
    });

    return res.json(id);
  }
}
export default new TaskMessageController();
