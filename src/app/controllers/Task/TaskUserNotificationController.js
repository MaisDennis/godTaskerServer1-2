// import firebase from '../../../config/firebase';
import 'firebase/firestore';
// import { startOfHour, parseISO, isBefore, subDays, format } from 'date-fns';
// import { Op } from 'sequelize';
// import { ptBR } from 'date-fns/locale';

import firebaseAdmin from 'firebase-admin';
import Task from '../../models/Task';
import User from '../../models/User';
import Worker from '../../models/Worker';

class TaskUserNotificationController {
  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params; // id: task_id
    // console.log(id);
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

    // When User EDITS the Task
    // Firebase Notification ***************************************************
    const user = await User.findByPk(task.user_id);
    const worker = await Worker.findByPk(task.worker_id);

    try {
      const pushMessage = {
        notification: {
          title: `${user.user_name}`,
          body: `Edited: ${name}, Due: ${due_date}`,
        },
        data: {
          channelId: 'godtaskerChannel01', // (required)
          title: `${user.user_name}`,
          message: `Edited: ${name}, Due: ${due_date}`,
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
        token: worker.notification_token,
      };

      if (worker.notification_token) {
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
export default new TaskUserNotificationController();
