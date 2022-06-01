import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        creator_email: Sequelize.STRING,
        name: Sequelize.STRING,
        description: Sequelize.STRING(2200),
        sub_task_list: Sequelize.JSON,
        task_attributes: Sequelize.JSON,
        price: Sequelize.FLOAT,
        confirm_photo_option: Sequelize.INTEGER,
        tenure: Sequelize.INTEGER,
        display_in_profile: Sequelize.BOOLEAN,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator_email', as: 'creator' });
  }
}
export default Service;
