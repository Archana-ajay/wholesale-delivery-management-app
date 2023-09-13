const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // Todo
    Orders.belongsTo(models.Vendor, { foreignKey: "vendorId", as:"vendor" });
      Orders.belongsTo(models.User, { foreignKey: "truckDriverId", as:"truckDriver" });
    }
  }

  Orders.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      products: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      truckDriverId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    vendorId:{
        type: DataTypes.UUID,
        allowNull: false,
      },
      totalAmount:{
        type:DataTypes.INTEGER,
        allowNull: false
      },
      collectedAmount:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      createdBy:{
        type:DataTypes.UUID
      }
    },
    {
      sequelize,
      tableName: 'Orders',
      timestamps:true
    }
  );
  return Orders;
};