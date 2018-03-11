const { EmailRecord } = require('../../db/models');

class EmailRecordCreator {
  constructor(params, subscriber) {
    if (!params || !subscriber) {
      return new Error('Missing Params or Subscriber');
    }
    this.params = params;
    this.subscriber = subscriber;
  }

  create() {
    EmailRecord.create(this.params)
      .then((emailRecord) => {
        emailRecord.setSubscriber(this.subscriber)
          .catch((error) => {
            console.log('Could not associate email record with subscriber', error);
          });
      })
      .catch((error) => {
        console.log('Could not create EmailRecord', error);
      });
  }
}

module.exports = EmailRecordCreator;
