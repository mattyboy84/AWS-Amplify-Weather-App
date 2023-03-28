const fetch = require('node-fetch');
const { JSONresponse } = require('./utils/Response');

async function getWeather(event, context) {
  console.log(event);
  console.log(context);

  const { location } = event.queryStringParameters;

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric`, {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.WEATHER_API_TOKEN,
    },
  });

  const responseData = await res.json();

  const response = await JSONresponse(
    200,
    {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
    },
    responseData,
  );

  return response;
}

module.exports = {
  getWeather,
};
