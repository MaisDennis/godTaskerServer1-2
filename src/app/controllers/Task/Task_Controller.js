import { Op } from 'sequelize';
import { format, startOfHour, parseISO, isBefore, subDays } from 'date-fns';
import {
  enUS,
  // pt
} from 'date-fns/locale/pt';
import firebaseAdmin from 'firebase-admin';
import 'firebase/firestore';
import User from '../../models/User';
import Task from '../../models/Task';
import Worker from '../../models/Worker';
import File from '../../models/File';
import { io } from '../../../http';
// -----------------------------------------------------------------------------
class Task_Controller {
  // create task----------------------------------------------------------------
  async store(req, res) {
    const [
      {
        workeremail,
        name,
        description,
        sub_task_list,
        task_attributes,
        status,
        points,
        confirm_photo,
        start_date,
        due_date,
        created,
        due,
      },
      user_id,
    ] = req.body;

    const user = await User.findByPk(user_id);

    if (!user.email) {
      return res
        .status(400)
        .json({ error: 'Create failed: User does not exist.' });
    }

    const useremail = user.email;

    const worker = await Worker.findOne({
      where: {
        email: workeremail,
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

    const task = await Task.create({
      user_id,
      useremail,
      worker_id,
      workeremail,
      name,
      description,
      sub_task_list,
      task_attributes,
      status,
      points,
      confirm_photo,
      start_date,
      due_date,
    }).then(() => {
      const parsedDueDate = format(parseISO(due_date), "MMM'/'dd'/'yyyy", {
        locale: enUS,
      });

      const pushMessage = {
        notification: {
          title: `${user.user_name}`,
          body: `${created}: ${name} | ${due} ${parsedDueDate}`,
        },
        data: {
          channelId: 'godtaskerChannel01', // (required)
          title: `${user.user_name}`,
          message: `${created}: ${name} | ${due} ${parsedDueDate}`,
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
        // token:
        //   'coQWZ3C8QKKAx6MRufr0fO:APA91bHG9HRdmqHDTNo-0zexXb1_aDN_Us8RILBaQLa6nxbpmVVsl6TnNr5eYRCwA6YX6Dbu0Eh88mG5FYCrUWNmwjnltWpwGfecfDVvL79n8iASVgg516Ns9NWNpgJg6405AWqgd9Ze',
      };

      io.emit(`task_create_${workeremail}`, 'Task Created');

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
    });

    return res.json(task);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { workerNameFilter, userID } = req.query;
    // io.emit(`task_create_dennisdjlee@yahoo.com`, 'Task Created');
    const tasks = await Task.findAll({
      // order: ['due_date'],
      where: { user_id: userID },
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'worker_name', 'email'],
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
      score,
      status,
      status_bar,
      start_date,
      initiated_at,
      canceled_at,
      due_date,
    } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({
      name,
      description,
      sub_task_list,
      task_attributes,
      score,
      status,
      status_bar,
      start_date,
      initiated_at,
      canceled_at,
      due_date,
    });

    // const updatedTask = await Task.findByPk(task.id);
    // const worker = await User.findByPk(task.worker_id);
    // const user = await User.findByPk(task.user_id);
    // const parsedDueDate = format(parseISO(due_date), "MMM'/'dd'/'yyyy", {
    //   locale: enUS,
    // });

    // const pushMessage = {
    //   notification: {
    //     title: `${worker.worker_name}`,
    //     body: `Updated ${name}`,
    //   },
    //   data: {
    //     channelId: 'godtaskerChannel01', // (required)
    //     title: `${worker.worker_name}`,
    //     message: `updated ${name}`,
    //   },
    //   android: {
    //     notification: {
    //       sound: 'default',
    //     },
    //   },
    //   apns: {
    //     payload: {
    //       aps: {
    //         sound: 'default',
    //       },
    //     },
    //   },
    //   token: user.notification_token,
    //   // token:
    //   //   'coQWZ3C8QKKAx6MRufr0fO:APA91bHG9HRdmqHDTNo-0zexXb1_aDN_Us8RILBaQLa6nxbpmVVsl6TnNr5eYRCwA6YX6Dbu0Eh88mG5FYCrUWNmwjnltWpwGfecfDVvL79n8iASVgg516Ns9NWNpgJg6405AWqgd9Ze',
    // };

    // if (worker.notification_token) {
    //   firebaseAdmin
    //     .messaging()
    //     .send(pushMessage)
    //     .then(response => {
    //       console.log('Successfully sent message: ', response);
    //     })
    //     .catch(error => {
    //       console.log('Error sending message: ', error);
    //     });
    // }

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
