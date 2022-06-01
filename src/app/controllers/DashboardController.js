import * as Yup from 'yup';
import { Op } from 'sequelize';
import { addDays, endOfISOWeek } from 'date-fns';
// -----------------------------------------------------------------------------
import User from '../models/User';
import Worker from '../models/Worker';
import File from '../models/File';
import Task from '../models/Task';
import { io } from '../../http';
// -----------------------------------------------------------------------------
class DashboardController {
  async index(req, res) {
    io.on('connection', socket => {
      console.log('a user connected');
      // socket.broadcast.emit('test', (msg) => io.emit('chat message', 'msg'));
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on('test', msg => {
        console.log(msg);
      });
    });
    // getUserListIndividual -------------------------------------------------------
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    // getUserFollowingCount ---------------------------------------------------
    const workers = await user.getWorker();
    const countFollowing = workers.length;

    // getWorkersFollowedCount -------------------------------------------------
    const worker = await Worker.findOne({
      where: {
        email: user.email,
      },
    });
    const users = await worker.getUser({
      where: {
        canceled_at: null,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    const countFollowers = users.length;

    // getTaskUserCount---------------------------------------------------------
    const { user_id, worker_id } = req.query;

    const userSent = await Task.findAll({
      order: ['due_date'],
      where: {
        user_id,
        canceled_at: null,
        end_date: null,
        initiated_at: null,
      },
    });

    const userInitiated = await Task.findAll({
      order: ['due_date'],
      where: {
        user_id,
        canceled_at: null,
        end_date: null,
        initiated_at: { [Op.ne]: null },
      },
    });

    const userFinished = await Task.findAll({
      order: ['due_date'],
      where: {
        user_id,
        canceled_at: null,
        end_date: { [Op.ne]: null },
      },
    });

    const userCanceled = await Task.findAll({
      order: ['due_date'],
      where: { user_id, canceled_at: { [Op.ne]: null } },
    });

    function userOverDue() {
      const array = [];
      userInitiated.map(i => {
        if (i.due_date < new Date()) {
          array.push(i.due_date);
        }
        return array;
      });
      return array;
    }

    function userTodayDue() {
      const array = [];
      userInitiated.map(i => {
        if (i.due_date === new Date()) {
          array.push(i.due_date);
        }
        return array;
      });
      return array;
    }

    function userTomorrowDue() {
      const array = [];
      userInitiated.map(i => {
        if (i.due_date === addDays(new Date(), 1)) {
          array.push(i.due_date);
        }
        return array;
      });
      return array;
    }

    function userThisWeekDue() {
      const array = [];
      userInitiated.map(i => {
        if (i.due_date < endOfISOWeek(new Date()) && i.due_date > new Date()) {
          array.push(i.due_date);
        }
        return array;
      });
      return array;
    }

    const userCountSent = userSent.length;
    const userCountInitiated = userInitiated.length;
    const userCountFinished = userFinished.length;
    const userCountCanceled = userCanceled.length;
    const userCountOverDue = userOverDue().length;
    const userCountTodayDue = userTodayDue().length;
    const userCountTomorrowDue = userTomorrowDue().length;
    const userCountThisWeekDue = userThisWeekDue().length;

    // getTaskUserCount --------------------------------------------------------

    const workerReceived = await Task.findAll({
      order: ['due_date'],
      where: {
        worker_id,
        canceled_at: null,
        end_date: null,
        initiated_at: null,
      },
    });

    const workerInitiated = await Task.findAll({
      order: ['due_date'],
      where: {
        worker_id,
        canceled_at: null,
        end_date: null,
        initiated_at: { [Op.ne]: null },
      },
    });

    const workerFinished = await Task.findAll({
      order: ['due_date'],
      where: {
        worker_id,
        canceled_at: null,
        end_date: { [Op.ne]: null },
      },
    });

    const workerCanceled = await Task.findAll({
      order: ['due_date'],
      where: { worker_id, canceled_at: { [Op.ne]: null } },
    });

    function workerOverDue() {
      const array = [];
      workerInitiated.map(i => {
        if (i.due_date < new Date()) {
          array.push(i.due_date);
        }
        return array;
      });
      return array;
    }

    function workerTodayDue() {
      const array = [];
      workerInitiated.map(i => {
        if (i.due_date === new Date()) {
          array.push(i.due_date);
        }
        return array;
      });
      return array;
    }

    function workerTomorrowDue() {
      const array = [];
      workerInitiated.map(i => {
        if (i.due_date === addDays(new Date(), 1)) {
          array.push(i.due_date);
        }
        return array;
      });
      return array;
    }

    function workerThisWeekDue() {
      const array = [];
      workerInitiated.map(i => {
        if (i.due_date < endOfISOWeek(new Date()) && i.due_date > new Date()) {
          array.push(i.due_date);
        }
        return array;
      });
      return array;
    }

    const workerCountReceived = workerReceived.length;
    const workerCountInitiated = workerInitiated.length;
    const workerCountFinished = workerFinished.length;
    const workerCountCanceled = workerCanceled.length;
    const workerCountOverDue = workerOverDue().length;
    const workerCountTodayDue = workerTodayDue().length;
    const workerCountTomorrowDue = workerTomorrowDue().length;
    const workerCountThisWeekDue = workerThisWeekDue().length;

    return res.json({
      countFollowing,
      countFollowers,
      user,
      userCountSent,
      userCountInitiated,
      userCountFinished,
      userCountCanceled,
      userCountOverDue,
      userCountTodayDue,
      userCountTomorrowDue,
      userCountThisWeekDue,
      workerCountReceived,
      workerCountInitiated,
      workerCountFinished,
      workerCountCanceled,
      workerCountOverDue,
      workerCountTodayDue,
      workerCountTomorrowDue,
      workerCountThisWeekDue,
    });
  }
}
export default new DashboardController();
