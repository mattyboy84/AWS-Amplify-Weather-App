import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function weatherPage({ weatherData }) {
  const [weather, setWeather] = useState(weatherData);
  const [location, setLocation] = useState('London');
  const router = useRouter();
  //
  const submitLocation = async () => {
    const response = await fetch(`/api/weather?location=${location}`);
    const responseData = await response.json();
    setWeather(responseData);
    router.push(`?location=${location}`);
  };
  //
  if (weather.cod === 200) {
    return (
      <>
        <div>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          <button onClick={submitLocation}>Update location info</button>
          <h2>Weather Information for {weather.name}</h2>
          <p>Temperature: {weather.main.temp_min} &deg;C - {weather.main.temp_max} &deg;C</p>
          <p>Feels like: {weather.main.feels_like} &deg;C</p>
          <p>Weather Description: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} mph</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Visibility: {weather.visibility / 1000} km</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
      </>
    );
  }
  return (
    <>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button onClick={submitLocation}>Update location info</button>
      <h2>{weather.cod} | {weather.message}</h2>
    </>
  );
}

export default weatherPage;

export async function getServerSideProps(context) {
  const { query } = context;
  const location = query.location || 'London';
  console.log(query);
  console.log(location);
  // const queryString = category ? 'category=sports' : '';
  // const rawCategory = category || '';
  const res = await fetch(`http://localhost:3000/api/weather?location=${location},uk`, {
    method: 'GET',
  });
  const responseData = await res.json();
  responseData.cod = Number(responseData.cod);
  //
  if (responseData.cod === 200) { // only returns what needed
    return {
      props: {
        weatherData: responseData,
      },
    };
  }
  return { // only returns what needed
    props: {
      weatherData: responseData,
    },
  };
}
