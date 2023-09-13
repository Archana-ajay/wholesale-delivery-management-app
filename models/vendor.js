const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // Todo
     Vendor.hasMany(models.Orders, { foreignKey: "vendorId" ,as:"orders"});
    }
  }

  Vendor.init(
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
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          is:/^[0-9]{10}$/
        },
      },
      location:{
        type:DataTypes.STRING,
        allowNull: false
      },
      email:{
        type:DataTypes.STRING,
        allowNull: false
      },
      createdBy:{
        type:DataTypes.UUID
      }
    },
    {
      sequelize,
      tableName: 'Vendor',
      timestamps:true
    }
  );
  return Vendor;
};