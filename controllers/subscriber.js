const { Subscriber, EmailRecord } = require('../db/models')
const BaseController = require('./base')

class SubscriberController extends BaseController {
  constructor(server) {
    super(server);
    
    server.get('/subscribers', (...args) => {
      this.getSubscribers(...args)
    })
    server.post('/subscribers', (...args) => {
      this.postSubscribers(...args)
    })
  }

  getSubscribers(req, res, next) {
    console.log("GET /subscribers")
    Subscriber.findAll({include: [ EmailRecord ]}).then((subscribers) => {
      res.json(subscribers)
    })
  }

  postSubscribers(req, res, next) {
    console.log("POST /subscribers")
  
    Subscriber.create(this.whiteListedParams(req.body, Subscriber))
      .then((subscriber) => {
        res.send(200, subscriber)
      })
      .catch((err) => {
        res.send(400, { error: "Failed to create subscriber" })
      })
  }
}


module.exports = SubscriberController