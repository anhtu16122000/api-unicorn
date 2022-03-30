'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userFirstName:   DataTypes.STRING(100),
    userLastName:    DataTypes.STRING(100),
    userUserName:    DataTypes.STRING(100),
    userPhoneNumber: DataTypes.STRING(20),
    userPassword:    DataTypes.STRING(100),
    refreshTokens:   DataTypes.TEXT,
    userBirthday:    DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};