'use strict';
module.exports = (sequelize, DataTypes) => {
  const EMAIL_TYPES = {
    0: 'test',
    1: 'weather-newsletter'
  }
  
  var EmailRecord = sequelize.define('EmailRecord', {
    emailType: DataTypes.INTEGER,
    toAddress: DataTypes.STRING,
    fromAddress: DataTypes.STRING,
    subject: DataTypes.STRING,
    html: DataTypes.STRING
  }, {});
  EmailRecord.associate = function(models) {
    EmailRecord.belongsTo(models.Subscriber);
  };

  EmailRecord.emailType = function(type) {
    return EMAIL_TYPES[type]
  };

  return EmailRecord;
};