import Sequelize, { Model } from 'sequelize';

class UserWorkers extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'UserWorkers',
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsToMany(models.Worker, {
      through: 'UserWorkers',
      foreignKey: 'worker_id',
      as: 'worker',
    });
  }
}

export default UserWorkers;
