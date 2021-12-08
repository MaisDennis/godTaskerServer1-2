module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tasks', 'message_id', {
      type: Sequelize.INTEGER,
      references: { model: 'messages', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('tasks', 'message_id');
  },
};
