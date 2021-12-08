import Sequelize, { Model } from 'sequelize';

class Worker extends Model {
  static init(sequelize) {
    super.init(
      {
        subscriber: Sequelize.BOOLEAN,
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        worker_name: Sequelize.STRING,
        worker_password: Sequelize.STRING,
        phonenumber: Sequelize.STRING,
        email: Sequelize.STRING,
        birth_date: Sequelize.STRING,
        gender: Sequelize.STRING,
        bio: Sequelize.STRING(2200),
        instagram: Sequelize.STRING,
        linkedin: Sequelize.STRING,
        notification_token: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        deleted_phonenumber: Sequelize.STRING,
        deleted_email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    // this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsToMany(models.User, {
      as: 'user',
      through: 'user_workers',
      foreignKey: 'worker_id',
      otherKey: 'user_id',
    });
  }
}

export default Worker;
