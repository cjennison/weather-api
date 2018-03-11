const SubscriberController = require('./controllers/subscriber');
const WeatherEmailGenerator = require('./services/email/weather-newsletter/weather-email-generator');
const { Subscriber } = require('./db/models');
const _ = require('lodash');

module.exports = function (server) {
  //  Allow OPTIONS
  server.opts(/\.*/, (req, res, next) => {
    res.send(200);
    next();
  });

  //  Initialize REST Routes
  new SubscriberController(server);

  server.get('/email-tester', (req, res) => {
    Subscriber.findAll().then((subscribers) => {
      _.forEach(subscribers, (subscriber) => {
        const emailGenerator = new WeatherEmailGenerator(subscriber);
        emailGenerator.execute();
      });
    }).catch((err) => {
      console.log('Could not start email tester', err);
    });

    res.send(200, 'Queued Emails');
  });
};
