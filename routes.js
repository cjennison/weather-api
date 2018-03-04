const SubscriberController = require('./controllers/subscriber')
const WeatherEmailGenerator = require('./services/email/weather-email-generator')

module.exports = function (server) {
  //Allow OPTIONS
  server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
  });
  
  //Initialize REST Routes
  new SubscriberController(server)

  server.get('/email-tester', (req, res) => {
    const emailGenerator = new WeatherEmailGenerator()
    emailGenerator.execute()

    res.send(200)
  })
}