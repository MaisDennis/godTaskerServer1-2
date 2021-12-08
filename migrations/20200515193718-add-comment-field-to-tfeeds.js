module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tfeeds', 'comment', {
      type: Sequelize.JSON,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('tfeeds', 'comment');
  },
};
