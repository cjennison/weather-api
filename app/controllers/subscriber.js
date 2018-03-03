const Subscriber = require('../models/subscriber')

function SubscriberController (server) {
  server.get('/subscribers', getSubscribers)
  server.post('/subscribers', postSubscribers)
}

function getSubscribers(req, res, next) {
  console.log("GET /subscribers")
  Subscriber.findAll().then((subscribers) => {
    console.log(subscribers)
    res.json(subscribers)
  })
}

function postSubscribers(req, res, next) {
  console.log("POST /subscribers")
  res.send("POST /subscribers")
}


module.exports = SubscriberController