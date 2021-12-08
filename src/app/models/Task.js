import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING(2200),
        sub_task_list: Sequelize.JSON,
        task_attributes: Sequelize.JSON,
        messages: Sequelize.JSON,
        score: Sequelize.INTEGER,
        status: Sequelize.JSON,
        status_bar: Sequelize.FLOAT,
        confirm_photo: Sequelize.BOOLEAN,
        unread_user: Sequelize.INTEGER,
        unread_worker: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        initiated_at: Sequelize.DATE,
        due_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        messaged_at: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        userphonenumber: Sequelize.STRING,
        workerphonenumber: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    // this.belongsTo(models.User, { foreignKey: 'userphonenumber' });
    this.belongsTo(models.Worker, { foreignKey: 'worker_id', as: 'worker' });
    // this.belongsTo(models.Worker, { foreignKey: 'workerphonenumber' });
    this.belongsTo(models.Signature, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}
export default Task;
