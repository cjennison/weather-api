const SubscriberController = require('./controllers/subscriber')

module.exports = function (server) {
  //Allow OPTIONS
  server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
  });
  
  //Initialize REST Routes
  new SubscriberController(server)
}