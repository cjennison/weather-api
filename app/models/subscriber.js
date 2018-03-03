const Sequelize = require('sequelize');
const database = require('../database')

const Subscriber = database.define('subscriber', {
  email: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  }
});

module.exports = Subscriber