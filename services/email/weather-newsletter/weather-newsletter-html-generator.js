const request = require('request');
const giphy = require('giphy')('HTGCduC4qtvNYIZu6ntQqCgiBOfOfvMD');

module.exports = function (weatherData, subscriber, weatherState) {
  const locationString = `${subscriber.city}, ${subscriber.state}`

  let weatherTitleString = "";
  switch (weatherState) {
    case 'good':
      weatherTitleString = "It is a nice day out!";
      break;
    case 'bad':
      weatherTitleString = "It isn't so great outside!";
      break;
    default:
      weatherTitleString = "Let's make today great!";
      break;
  }

  return new Promise((resolve, reject) => {
    giphy.search({ 
        q: `weather,${weatherData[1].weather}`, 
        limit: 50,
        rating: 'g'
    }, function (err, res) { 
      var gifs = res.data;
      var gif = gifs[Math.floor(Math.random()*gifs.length)]
      resolve (`
        <div style='text-align:center'>
          <div>
            Weather for <h2>${locationString}</h2>
          </div>
          <h3>${weatherData[1].weather}</h3>
          <h5>${weatherData[1].temp_f}&#176; F, ${weatherData[1].temp_c}&#176; C</h5>

          <img src="${gif.images.downsized_medium.url}">

          <div>
            <p>
              ${weatherTitleString}
            </p>
            <p>
              Enjoy a discount on us! <br />
              <a href='http://lmgtfy.com/?q=discount+on+stuff' target='_blank'>Click here to get your discount</a>
            </p>
          </div>
        </div>
      `)
    }) 
  })
}
