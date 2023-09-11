const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // Todo
    }
  }

  User.init(
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type:DataTypes.ENUM("admin","truck driver"),
        defaultValue:"truck driver"
      },
      address:{
        type:DataTypes.STRING,
      },
      licenseNumber:{
        type:DataTypes.STRING
      },
      licenseType:{
        type:DataTypes.STRING
      },
      licenseExpiry:{
        type:DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: 'User',
      indexes: [
        {
          fields: ['phoneNumber'],
          unique: true,
        },
      ],
      timestamps:true
    }
  );
  return User;
};