const Subscriber = require('./app/controllers/subscriber')

module.exports = function (server) {
  //Allow OPTIONS
  server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
  });
  
  //Initialize REST Routes
  Subscriber(server)
}