module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price :{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category:{
        type: Sequelize.STRING,
        allowNull: false
      },
      imageUrl:{
        type: Sequelize.STRING,
      },
      createdBy:{
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
    // await queryInterface.addIndex('Product');
  },

  async down(queryInterface) {
    return queryInterface.dropTable('Product');
  },
};