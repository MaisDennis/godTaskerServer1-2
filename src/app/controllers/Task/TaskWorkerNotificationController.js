// import firebase from '../../../config/firebase';
import 'firebase/firestore';
// import { startOfHour, parseISO, isBefore, subDays, format } from 'date-fns';
// import { Op } from 'sequelize';
// import { ptBR } from 'date-fns/locale';

import firebaseAdmin from 'firebase-admin';
import Task from '../../models/Task';
import User from '../../models/User';
import Worker from '../../models/Worker';

class TaskWorkerNotificationController {
  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params; // id: task_id
    // console.log(id)
    const {
      name,
      description,
      sub_task_list,
      task_attributes,
      messages,
      score,
      status,
      status_bar,
      start_date,
      initiated_at,
      messaged_at,
      canceled_at,
      due_date,
    } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({
      name,
      description,
      sub_task_list,
      task_attributes,
      messages,
      score,
      status,
      status_bar,
      start_date,
      initiated_at,
      messaged_at,
      canceled_at,
      due_date,
    });

    // Firebase Notification ***************************************************
    const user = await User.findByPk(task.user_id);
    const worker = await Worker.findByPk(task.worker_id);

    // const formattedDate = fdate =>
    // fdate == null
    //   ? ''
    //   : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

    let pushMessage = {};
    try {
      // When Worker Declines or Accepts the Task
      pushMessage = {
        notification: {
          title: `${worker.worker_name}:`,
          body: `${task.status.comment}`,
        },
        data: {
          channelId: 'godtaskerChannel01', // (required)
          title: `${worker.worker_name}:`,
          message: `${task.status.comment}`,
        },
        android: {
          notification: {
            sound: 'default',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
            },
          },
        },
        token: user.notification_token,
      };

      if (user.notification_token) {
        firebaseAdmin
          .messaging()
          .send(pushMessage)
          .then(response => {
            console.log('Successfully sent message: ', response);
          })
          .catch(error => {
            console.log('Error sending message: ', error);
          });
      }
    } catch (error) {
      console.log(error);
    }
    return res.json(task);
  }
}
export default new TaskWorkerNotificationController();
