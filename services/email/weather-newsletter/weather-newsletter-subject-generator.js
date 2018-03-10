function determineSubject (weatherState) {
  if (weatherState === 'good') {
    return "It's nice out! Enjoy a discount on us.";
  } else if (weatherState === 'bad') {
    return "Not so nice out? That's okay, enjoy a discount on us.";
  }

  return "Enjoy a discount on us."
}

module.exports = determineSubject