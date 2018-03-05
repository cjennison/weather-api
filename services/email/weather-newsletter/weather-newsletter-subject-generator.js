function determineSubject (weatherData) {
  console.log(weatherData)
  if (isNiceOut(weatherData)) {
    return "It's nice out! Enjoy a discount on us.";
  } else if (isNotNiceOut(weather)) {
    return "Not so nice out? That's okay, enjoy a discount on us.";
  }

  return "Enjoy a discount on us."
}

function isNiceOut (weather) {
  //Weather is sunny
  return weather.weather === 'Sunny'
}

function isNotNiceOut (weather) {
  //Hour precipitation is not 0
  return weather.precip_1hr_metric !== "0"
}

module.exports = determineSubject 

/*
{ image: 
  { url: 'http://icons.wxug.com/graphics/wu2/logo_130x80.png',
    title: 'Weather Underground',
    link: 'http://www.wunderground.com' },
 display_location: 
  { full: 'Philadelphia, PA',
    city: 'Philadelphia',
    state: 'PA',
    state_name: 'Pennsylvania',
    country: 'US',
    country_iso3166: 'US',
    zip: '19019',
    magic: '1',
    wmo: '99999',
    latitude: '39.95000076',
    longitude: '-75.16000366',
    elevation: '7.9' },
 observation_location: 
  { full: 'Society Hill, Philadelphia, Philadelphia, Pennsylvania',
    city: 'Society Hill, Philadelphia, Philadelphia',
    state: 'Pennsylvania',
    country: 'US',
    country_iso3166: 'US',
    latitude: '39.943699',
    longitude: '-75.150902',
    elevation: '43 ft' },
 estimated: {},
 station_id: 'KPAPHILA99',
 observation_time: 'Last Updated on March 5, 6:47 AM EST',
 observation_time_rfc822: 'Mon, 05 Mar 2018 06:47:24 -0500',
 observation_epoch: '1520250444',
 local_time_rfc822: 'Mon, 05 Mar 2018 07:02:03 -0500',
 local_epoch: '1520251323',
 local_tz_short: 'EST',
 local_tz_long: 'America/New_York',
 local_tz_offset: '-0500',
 weather: 'Partly Cloudy',
 temperature_string: '31.3 F (-0.4 C)',
 temp_f: 31.3,
 temp_c: -0.4,
 relative_humidity: '59%',
 wind_string: 'From the NW at 1.0 MPH Gusting to 14.0 MPH',
 wind_dir: 'NW',
 wind_degrees: 314,
 wind_mph: 1,
 wind_gust_mph: '14.0',
 wind_kph: 1.6,
 wind_gust_kph: '22.5',
 pressure_mb: '1019',
 pressure_in: '30.09',
 pressure_trend: '-',
 dewpoint_string: '18 F (-8 C)',
 dewpoint_f: 18,
 dewpoint_c: -8,
 heat_index_string: 'NA',
 heat_index_f: 'NA',
 heat_index_c: 'NA',
 windchill_string: '31 F (0 C)',
 windchill_f: '31',
 windchill_c: '0',
 feelslike_string: '31 F (0 C)',
 feelslike_f: '31',
 feelslike_c: '0',
 visibility_mi: '10.0',
 visibility_km: '16.1',
 solarradiation: '12',
 UV: '0.0',
 precip_1hr_string: '0.00 in ( 0 mm)',
 precip_1hr_in: '0.00',
 precip_1hr_metric: ' 0',
 precip_today_string: '0.00 in (0 mm)',
 precip_today_in: '0.00',
 precip_today_metric: '0',
 icon: 'partlycloudy',
 icon_url: 'http://icons.wxug.com/i/c/k/partlycloudy.gif',
 forecast_url: 'http://www.wunderground.com/US/PA/Philadelphia.html',
 history_url: 'http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KPAPHILA99',
 ob_url: 'http://www.wunderground.com/cgi-bin/findweather/getForecast?query=39.943699,-75.150902',
 nowcast: '' }

 */