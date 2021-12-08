import firebase from '../../../config/firebase'
import 'firebase/firestore'
import 'firebase/auth'

import Message from '../../models/Message';
class MessageRemoveController {
  async update(req, res) {
    const { id } = req.params;
    const { message_id } = req.body;

    let message = await Message.findByPk(id);
    let pos = message.messages.findIndex(m => m.id === message_id)

    // message.messages.splice(pos, 1)
    const removedMessage = message.messages[pos].message
    message.messages[pos].removed_message = removedMessage
    message.messages[pos].message = "Mensagem removida"

    message = await message.update({
      messages: message.messages,
    });



    return res.json(message);
  }
}
export default new MessageRemoveController();
