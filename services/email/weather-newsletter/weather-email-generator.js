const EmailGenerator = require('../email-generator')
const { getWeather } = require('./weather-pull-service')
const subjectGenerator = require('./weather-newsletter-subject-generator')
const htmlGenerator = require('./weather-newsletter-html-generator')
const weatherState = require('./weather-state-service')

class WeatherEmailGenerator extends EmailGenerator{
  constructor (subscriber) {
    super(subscriber)
    this.emailType = 1
    this.fromAddress = 'weather@chris-weather-app.com'
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
    return subjectGenerator(weatherState(this.weatherData))
  }

  htmlBody() {
    return htmlGenerator(this.weatherData, this.subscriber, weatherState(this.weatherData))
  }

  execute () {
    this.setSubscriberWeather().then(() => {
      super.execute();
    })
  }
}

module.exports = WeatherEmailGenerator