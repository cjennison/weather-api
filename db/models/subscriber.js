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
    Subscriber.hasMany(models.EmailRecord)
  };
  Subscriber.allowedAttributes = function() {
    return ['email', 'city', 'state']
  }; 
  return Subscriber;
};