function tempDiffFromAvg(weather) {
  return weather[1].temp_f - parseFloat(weather[0].dailysummary[0].meantempi);
}

function isNiceOut(weather) {
  //  Weather is sunny
  return weather[1].weather === 'Clear' || tempDiffFromAvg(weather) >= 5;
}

function isNotNiceOut(weather) {
  //  Hour precipitation is not 0
  return weather[1].precip_1hr_metric !== '0' || tempDiffFromAvg(weather) <= -5;
}

function weatherState(weatherData) {
  if (isNiceOut(weatherData)) {
    return 'good';
  } else if (isNotNiceOut(weatherData)) {
    return 'bad';
  }

  return null;
}


module.exports = weatherState;
