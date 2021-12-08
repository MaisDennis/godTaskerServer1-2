import firebase from '../../../config/firebase'
import 'firebase/firestore'
// import { startOfHour, parseISO, isBefore, subDays, format } from 'date-fns';
// import { Op } from 'sequelize';
// import { ptBR } from 'date-fns/locale';

import Task from '../../models/Task';
import User from '../../models/User';
import firebaseAdmin from 'firebase-admin'

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
    let user = await User.findByPk(task.user_id);

    // const formattedDate = fdate =>
    // fdate == null
    //   ? ''
    //   : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });
    console.log(task.status.comment)

    let pushMessage = {}
    try {
      if(task.status.canceled_by) {
        pushMessage = {
          notification: {
            title: `Task has been declined: ${name}`,
            body: `${task.status.comment}`
          },
          data: {

          },
          android: {
            notification: {
              sound: 'default'
            }
          },
          apns: {
            payload: {
              aps: {
                sound: 'default'
              }
            }
          },
          token: user.notification_token
        };
      } else {
        pushMessage = {
          notification: {
            title: `Task has been edited: ${name}`,
            body: `${name}, Due: ${due_date}`
          },
          data: {

          },
          android: {
            notification: {
              sound: 'default'
            }
          },
          apns: {
            payload: {
              aps: {
                sound: 'default'
              }
            }
          },
          token: user.notification_token
        };
      }


      firebaseAdmin.messaging().send(pushMessage)
        .then(response => {
          console.log('Successfully sent message: ', response);
        })
        .catch(error => {
          console.log('Error sending message: ', error);
        })
    }
    catch(error) {
      console.log(error)
    }
    return res.json(task);
  }
}
export default new TaskWorkerNotificationController();
