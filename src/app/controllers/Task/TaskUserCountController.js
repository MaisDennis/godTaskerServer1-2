import { Op } from 'sequelize';
import Task from '../../models/Task';
import { addDays, endOfISOWeek } from 'date-fns'
// -----------------------------------------------------------------------------
class TaskUserCountController {
  async index(req, res) {
    const { userID } = req.query;
    // console.log(req.query)
    const parsedUserID = parseInt(userID)

    const sent = await Task.findAll({
      order: ['due_date'],
      where: {
        user_id: parsedUserID,
        canceled_at: null,
        end_date: null,
        initiated_at: null,
      },
    });

    const initiated = await Task.findAll({
      order: ['due_date'],
      where: {
        user_id: parsedUserID,
        canceled_at: null,
        end_date: null,
        initiated_at: { [Op.ne]: null },
      },
    });

    const finished = await Task.findAll({
      order: ['due_date'],
      where: { user_id: userID, canceled_at: null, end_date: { [Op.ne]: null } },
    });

    const canceled = await Task.findAll({
      order: ['due_date'],
      where: { user_id: userID, canceled_at: { [Op.ne]: null } },
    });

    function overDue() {
      let array = []
      initiated.map(i => {
        if(i.due_date < new Date()) {
          console.log('www')
          array.push(i.due_date)
        }
      })
      return array
    }

    function todayDue() {
      let array = []
      initiated.map(i => {
        if(i.due_date === new Date()) {
          console.log('www')
          array.push(i.due_date)
        }
      })
      return array
    }

    function tomorrowDue() {
      let array = []
      initiated.map(i => {
        if(i.due_date === addDays(new Date(), 1)) {
          console.log('www')
          array.push(i.due_date)
        }
      })
      return array
    }

    function thisWeekDue() {
      let array = []
      initiated.map(i => {
        if(
          (i.due_date < endOfISOWeek(new Date())) && (i.due_date > new Date())
        ) {
          console.log('www')
          array.push(i.due_date)
        }
      })
      return array
    }

    const countSent = sent.length
    const countInitiated = initiated.length
    const countFinished = finished.length
    const countCanceled = canceled.length
    const countOverDue = overDue().length
    const countTodayDue = todayDue().length
    const countTomorrowDue = tomorrowDue().length
    const countThisWeekDue = thisWeekDue().length

    return res.json({
      countSent, countInitiated, countFinished,
      countCanceled, countOverDue, countTodayDue,
      countTomorrowDue, countThisWeekDue
    });
  }
}

export default new TaskUserCountController();
