function determineSubject (weatherData) {
  if (isNiceOut(weatherData)) {
    return "It's nice out! Enjoy a discount on us.";
  } else if (isNotNiceOut(weatherData)) {
    return "Not so nice out? That's okay, enjoy a discount on us.";
  }

  return "Enjoy a discount on us."
}

function isNiceOut (weather) {
  //Weather is sunny
  console.log(weather[1].weather, tempDiffFromAvg(weather))
  return weather[1].weather === 'Clear' || tempDiffFromAvg(weather) >= 5;
}

function isNotNiceOut (weather) {
  //Hour precipitation is not 0
  console.log(weather[1].precip_1hr_metric, tempDiffFromAvg(weather))
  return weather[1].precip_1hr_metric !== "0" || tempDiffFromAvg(weather) <= -5;
}

function tempDiffFromAvg(weather) {
  return weather[1].temp_f - parseFloat(weather[0].dailysummary[0].meantempi);
}

module.exports = determineSubject;