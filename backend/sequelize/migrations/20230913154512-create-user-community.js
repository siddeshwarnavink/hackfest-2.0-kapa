module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCommunities', {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        primaryKey: true,
      },
      communityId: {
        type: Sequelize.UUID,
        references: {
          model: 'Communities',
          key: 'id'
        },
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserCommunities');
  }
};
