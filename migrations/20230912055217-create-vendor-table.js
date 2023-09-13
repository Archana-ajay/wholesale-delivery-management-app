module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Vendor", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    is: /^[0-9]{10}$/,
                },
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
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
    },

    async down(queryInterface) {
        return queryInterface.dropTable("Vendor");
    },
};
