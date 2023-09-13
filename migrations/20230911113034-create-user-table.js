module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("User", {
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
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            role: {
                type: Sequelize.ENUM("admin", "truck driver"),
                default: "truck driver",
            },
            address: {
                type: Sequelize.STRING,
            },
            licenseNumber: {
                type: Sequelize.STRING,
            },
            licenseType: {
                type: Sequelize.STRING,
            },
            licenseExpiry: {
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
        await queryInterface.addIndex("User", ["phoneNumber"], {
            indicesType: "UNIQUE",
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable("User");
    },
};
