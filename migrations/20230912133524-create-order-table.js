module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            products: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            truckDriverId: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            vendorId: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            totalAmount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            collectedAmount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdBy: {
                type: Sequelize.DATE,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
        // await queryInterface.addIndex('Product');
    },

    async down(queryInterface) {
        return queryInterface.dropTable("Orders");
    },
};
