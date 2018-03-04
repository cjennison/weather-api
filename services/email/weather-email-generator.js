const EmailGenerator = require('./email-generator')
const { Subscriber } = require('../../db/models')

class WeatherEmailGenerator extends EmailGenerator{
  constructor () {
    super()

    this.emailType = 1
    
    //Use default from address
  }

  recipient(subscriber) {
    return subscriber.email
  }

  subject(subscrber) {
    return new Promise((resolve, reject) => {
      resolve('Hello, world YOOOO!')
    })
  }

  htmlBody() {
    return new Promise((resolve, reject) => {
      resolve('<div>Hello, world WHAT!</div>')
    })
  }

  execute () {
    // Get Subscribers
    Subscriber.findAll().then((subscribers) => {
      super.execute(subscribers);
    })
  }
}

module.exports = WeatherEmailGenerator