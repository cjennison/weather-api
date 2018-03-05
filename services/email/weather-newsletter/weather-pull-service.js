const config = require(__dirname + '/../../../config/wunderground.json');
const request = require('request');
const moment = require('moment')

const stateToAbbreviation = require('../../state-to-abbreviation')

function getWeather(subscriber) {
  return new Promise((resolve, reject) => {
    const dateFormatted = moment().format("YYYYMMDD")
    request(`http://api.wunderground.com/api/${config.key}/history_${dateFormatted}/q/${stateToAbbreviation(subscriber.state, 'abbr')}/${subscriber.city}.json`, function (error, response, body) {
      if (error) {
        return reject(error)
      }
      try {
        const parsedBody = JSON.parse(body)
        resolve(parsedBody.history)
      } catch (e) {
        return reject(error)
      }
    });

  })
}

module.exports.getWeather = getWeather