const config = require(__dirname + '/../../../config/wunderground.json');
const request = require('request');
const moment = require('moment')

const stateToAbbreviation = require('../../state-to-abbreviation')

function getWeather(subscriber) {
  const dateFormatted = moment().format("YYYYMMDD")
    
  const historicPromise = new Promise((resolve, reject) => {
    request(`http://api.wunderground.com/api/${config.key}/history_${dateFormatted}/q/${stateToAbbreviation(subscriber.state, 'abbr')}/${subscriber.city}.json`, function (error, response, body) {
      returnParsedResponse(resolve, reject, error, response, body, 'history');
    });
  });

  const currentConditionsPromise = new Promise((resolve, reject) => {
    request(`http://api.wunderground.com/api/${config.key}/conditions/q/${stateToAbbreviation(subscriber.state, 'abbr')}/${subscriber.city}.json`, function (error, response, body) {
      returnParsedResponse(resolve, reject, error, response, body, 'current_observation');
    });
  });

  return Promise.all([historicPromise, currentConditionsPromise])
}

function returnParsedResponse(resolve, reject, error, response, body, key){
  if (error) {
    return reject(error)
  }
  try {
    const parsedBody = JSON.parse(body)
    resolve(parsedBody[key])
  } catch (e) {
    return reject(error)
  }
} 

module.exports.getWeather = getWeather