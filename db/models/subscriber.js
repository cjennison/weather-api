'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subscriber = sequelize.define('Subscriber', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    city: DataTypes.STRING,
    state: DataTypes.STRING,
  }, {});
  Subscriber.associate = function(models) {
    // associations can be defined here
  };
  Subscriber.allowedAttributes = function() {
    return ['email', 'city', 'state']
  }; 
  return Subscriber;
};