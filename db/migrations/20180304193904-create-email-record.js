'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmailRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subscriberId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subscribers',
          key: 'id'
        }
      },
      emailType: {
        type: Sequelize.INTEGER
      },
      toAddress: {
        type: Sequelize.STRING
      },
      fromAddress: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      html: {
        type: Sequelize.TEXT('medium')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmailRecords');
  }
};