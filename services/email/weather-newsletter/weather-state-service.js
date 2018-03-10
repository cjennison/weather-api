function weatherState (weatherData) {
  if (isNiceOut(weatherData)) {
    return 'good';
  } else if (isNotNiceOut(weatherData)) {
    return 'bad';
  } else {
    return null;
  }
}

function isNiceOut (weather) {
  //Weather is sunny
  return weather[1].weather === 'Clear' || tempDiffFromAvg(weather) >= 5;
}

function isNotNiceOut (weather) {
  //Hour precipitation is not 0
  return weather[1].precip_1hr_metric !== "0" || tempDiffFromAvg(weather) <= -5;
}

function tempDiffFromAvg(weather) {
  return weather[1].temp_f - parseFloat(weather[0].dailysummary[0].meantempi);
}

module.exports = weatherState