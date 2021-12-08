import Message from '../../models/Message';

class MessageUpdateController {
  async update(req, res) {
    const { id } = req.params;
    const { messages } = req.body;

    let message = await Message.findByPk(id);

    message = await message.update({
      messages: messages,
    });

    return res.json(message);
  }
}
export default new MessageUpdateController();
