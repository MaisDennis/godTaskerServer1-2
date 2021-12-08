import { Op } from 'sequelize';
// import 'firebase/auth'
import { startOfHour, parseISO, isBefore, subDays } from 'date-fns';
// import firebaseAdmin from 'firebase-admin';
// import firebase from '../../../config/firebase';
import 'firebase/firestore';
import User from '../../models/User';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
import File from '../../models/File';

class Task_Controller {
  // create task----------------------------------------------------------------
  async store(req, res) {
    // const firestore = firebase.firestore();

    const [
      {
        workerphonenumber,
        name,
        description,
        sub_task_list,
        task_attributes,
        // message_id,
        status,
        confirm_photo,
        start_date,
        due_date,
        // messaged_at,
      },
      user_id,
    ] = req.body;

    // const message_id = 1;
    // const messaged_at = new Date();
    const user = await User.findByPk(user_id);

    if (!user.phonenumber) {
      return res
        .status(400)
        .json({ error: 'Create failed: User does not exist.' });
    }

    const userphonenumber = user.phonenumber;

    const worker = await Worker.findOne({
      where: {
        phonenumber: workerphonenumber,
      },
    });

    if (!worker) {
      return res
        .status(400)
        .json({ error: 'Create failed: Worker does not exist.' });
    }

    const worker_id = worker.id;

    const hourStart = startOfHour(parseISO(start_date));
    if (isBefore(hourStart, subDays(new Date(), 1))) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // const message = await Message.create({
    //   task_id: 1,
    //   worker_id: worker_id,
    //   worker_name: worker.worker_name,
    //   user_id: user.id,
    //   user_name: user.user_name,
    //   messages: [],
    // });

    const task = await Task.create({
      user_id,
      userphonenumber,
      worker_id,
      workerphonenumber,
      name,
      description,
      sub_task_list,
      task_attributes,
      status,
      confirm_photo,
      // message_id,
      // message_id: documentId,
      // messages: [],
      // messaged_at,
      start_date,
      due_date,
    });

    // await Task.findByPk(req.taskId, {
    //   include: [
    //     {
    //       model: Message,
    //       as: 'message',
    //       attributes: ['id'],
    //     },
    //   ],
    // });

    // Firebase Notification ***************************************************
    // const pushMessage = {
    //   notification: {
    //     title: `New Task from ${user.user_name}`,
    //     body: `${name}, Start: ${start_date}, Due: ${due_date}`
    //   },
    //   data: {

    //   },
    //   android: {
    //     notification: {
    //       sound: 'default'
    //     }
    //   },
    //   apns: {
    //     payload: {
    //       aps: {
    //         sound: 'default'
    //       }
    //     }
    //   },
    //   token: worker.notification_token
    // };

    // firebaseAdmin.messaging().send(pushMessage)
    //   .then(response => {
    //     console.log('Successfully sent message: ', response);
    //   })
    //   .catch(error => {
    //     console.log('Error sending message: ', error);
    //   })

    return res.json(task);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { workerNameFilter, userID } = req.query;
    const tasks = await Task.findAll({
      // order: ['due_date'],
      where: { user_id: userID },
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'worker_name', 'phonenumber'],
          where: {
            worker_name: {
              [Op.like]: `%${workerNameFilter}%`,
            },
          },
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(tasks);
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
      // messages,
      score,
      status,
      status_bar,
      start_date,
      initiated_at,
      // messaged_at,
      canceled_at,
      due_date,
    } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({
      name,
      description,
      sub_task_list,
      task_attributes,
      // messages,rs
      score,
      status,
      status_bar,
      start_date,
      initiated_at,
      // messaged_at,
      canceled_at,
      due_date,
    });

    return res.json(task);
  }

  // ---------------------------------------------------------------------------
  async delete(req, res) {
    const { id } = req.params; // id: task_id

    let task = await Task.findByPk(id);

    task = await task.destroy();

    return res.json(task);
  }
}
export default new Task_Controller();
