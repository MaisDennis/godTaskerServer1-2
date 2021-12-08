import Sequelize, { Model } from 'sequelize';

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        messaged_at: Sequelize.STRING,
        chat_id: Sequelize.INTEGER,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Worker, { foreignKey: 'worker_id', as: 'worker' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
export default Message;
