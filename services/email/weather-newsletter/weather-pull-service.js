const path = require('path');
const request = require('request');
const moment = require('moment');
const stateToAbbreviation = require('../../state-to-abbreviation');

const config = require(path.join(__dirname, '/../../../config/wunderground.json'));

function returnParsedResponse(resolve, reject, error, response, body, key) {
  if (error) {
    return reject(error);
  }
  try {
    const parsedBody = JSON.parse(body);
    resolve(parsedBody[key]);
  } catch (e) {
    console.log('error', e);
    return reject(error);
  }

  return null;
}

function getWeather(subscriber) {
  const dateFormatted = moment().format('YYYYMMDD');

  const historicPromise = new Promise((resolve, reject) => {
    request(`http://api.wunderground.com/api/${config.key}/history_${dateFormatted}/q/${stateToAbbreviation(subscriber.state, 'abbr')}/${subscriber.city}.json`, (error, response, body) => {
      returnParsedResponse(resolve, reject, error, response, body, 'history');
    });
  });

  const currentConditionsPromise = new Promise((resolve, reject) => {
    request(`http://api.wunderground.com/api/${config.key}/conditions/q/${stateToAbbreviation(subscriber.state, 'abbr')}/${subscriber.city}.json`, (error, response, body) => {
      returnParsedResponse(resolve, reject, error, response, body, 'current_observation');
    });
  });

  return Promise.all([historicPromise, currentConditionsPromise]);
}

module.exports.getWeather = getWeather;
