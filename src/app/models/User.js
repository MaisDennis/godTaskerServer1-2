import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        subscriber: Sequelize.BOOLEAN,
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        user_name: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // campo que nunca existe na database
        password_hash: Sequelize.STRING,
        phonenumber: Sequelize.STRING,
        email: Sequelize.STRING,
        birth_date: Sequelize.STRING,
        gender: Sequelize.STRING,
        bio: Sequelize.STRING(2200),
        instagram: Sequelize.STRING,
        linkedin: Sequelize.STRING,
        notification_token: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        contact_list: Sequelize.JSON,
        deleted_phonenumber: Sequelize.STRING,
        deleted_email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsToMany(models.Worker, {
      as: 'worker',
      through: 'user_workers',
      foreignKey: 'user_id',
      otherKey: 'worker_id',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
