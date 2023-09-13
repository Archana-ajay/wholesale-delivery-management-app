const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // Todo
            //Product.hasMany(models.Orders, { foreignKey: "id" });
        }
    }

    Product.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.UUID,
            },
        },
        {
            sequelize,
            tableName: "Product",
            timestamps: true,
        }
    );
    return Product;
};
