'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userFirstName: {
        type: Sequelize.STRING(100), 
      },
      userLastName: {
        type: Sequelize.STRING(100)
      },
      userUserName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      userPhoneNumber: {
        type: Sequelize.STRING(20),
      },
      userPassword: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      userBirthday: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};