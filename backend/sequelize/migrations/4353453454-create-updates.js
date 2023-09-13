module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Updates', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        message: {
          type: Sequelize.STRING,
          allowNull: false
        },
        likes: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        thumbnail: {
          type: Sequelize.STRING
        },
        tags: {
          type: Sequelize.STRING
        },
        creator: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false
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
      await queryInterface.dropTable('Stores');
    }
  };
  