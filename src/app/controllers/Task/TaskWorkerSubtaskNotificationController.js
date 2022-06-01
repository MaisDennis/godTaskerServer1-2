// import firebase from '../../../config/firebase';
import 'firebase/firestore';
// import { startOfHour, parseISO, isBefore, subDays, format } from 'date-fns';
// import { Op } from 'sequelize';
// import { ptBR } from 'date-fns/locale';

import firebaseAdmin from 'firebase-admin';
import Task from '../../models/Task';
import User from '../../models/User';
import Worker from '../../models/Worker';

class TaskWorkerSubtaskNotificationController {
  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params; // id: task_id
    const { position, text } = req.body;
    console.log(text);
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
    const worker = await Worker.findByPk(task.worker_id);

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

    // const formattedDate = fdate =>
    // fdate == null
    //   ? ''
    //   : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

    // console.log(task.sub_task_list);
    let pushMessage = {};
    try {
      pushMessage = {
        notification: {
          title: `${text[0]}: ${task.name}:`,
          body: `${worker.worker_name} ${
            task.sub_task_list[position].complete ? `${text[1]}` : `${text[3]}`
          } ${text[2]}: ${task.sub_task_list[position].description}`,
        },
        data: {
          channelId: 'godtaskerChannel01', // (required)
          title: `${text[0]}: ${task.name}:`,
          message: `${worker.worker_name} ${
            task.sub_task_list[position].complete ? `${text[1]}` : `${text[3]}`
          } ${text[2]}: ${task.sub_task_list[position].description}`,
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
export default new TaskWorkerSubtaskNotificationController();
