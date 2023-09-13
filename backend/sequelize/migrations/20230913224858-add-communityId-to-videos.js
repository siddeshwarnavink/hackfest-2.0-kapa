module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Videos', 'communityId', {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'dffc1370-5247-11ee-ac55-ac1203516bd9'
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Videos', 'communityId');
  }
};
