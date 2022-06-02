import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country, show, onClick, id }) => {
  const [weather, setWeather] = [''];

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  if (!show) {
    return (
      <div>
        {country.name}{' '}
        <button id={id} onClick={onClick}>
          show
        </button>
      </div>
    );
  } else {
    const weather = '';

    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img alt='flag' src={country.flag} />
        <h1>Weather in {country.capital}</h1>
        <p>temperature {weather.main.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        ></img>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  }
};

export default Country;
