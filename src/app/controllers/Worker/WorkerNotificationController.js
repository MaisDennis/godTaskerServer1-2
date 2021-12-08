import Worker from '../../models/Worker';

class WorkerNotificationController {
  async update(req, res) {
    const { id } = req.params;
    const { notification_token } = req.body;
    // console.log(id, notification_token)

    let worker = await Worker.findByPk(id);

    worker = await worker.update({
      notification_token,
    });

    return res.json({ worker });
  }
}

export default new WorkerNotificationController();
