const EmailGenerator = require('../email-generator')
const { getWeather } = require('./weather-pull-service')
const subjectGenerator = require('./weather-newsletter-subject-generator')
const htmlGenerator = require('./weather-newsletter-html-generator')


class WeatherEmailGenerator extends EmailGenerator{
  constructor (subscriber) {
    super(subscriber)

    this.emailType = 1
    //Use default from address
  }

  setSubscriberWeather() {
    return getWeather(this.subscriber)
      .then((weatherData) => {
        this.weatherData = weatherData
      })
      .catch((err) => {
        console.log("Failed to get weather", err)
      })
  }

  recipient() {
    return this.subscriber.email
  }

  subject() {
    //TODO Promise is not necessary
    return new Promise((resolve, reject) => {
      resolve(subjectGenerator(this.weatherData))
    })
  }

  htmlBody() {
    //TODO Promise is not necessary
    return new Promise((resolve, reject) => {
      resolve(htmlGenerator(this.weatherData))
    })
  }

  execute () {
    this.setSubscriberWeather().then(() => {
      super.execute();
    })
  }
}

module.exports = WeatherEmailGenerator