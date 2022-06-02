import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Country from './components/Country';

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(
        response.data.map((data) => {
          return {
            name: data.name.common,
            capital: data.capital === undefined ? '' : data.capital[0],
            area: data.area,
            languages: data.languages,
            flag: data.flags.svg,
          };
        })
      );
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

    if (event.target.value.trim() === '') {
      setFilteredCountries([]);
    } else {
      let arr = countries.filter((country) => {
        return country.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredCountries(arr);
      setShowCountries(
        arr.map((country) => {
          return { name: country.name, show: false };
        })
      );
    }
  };

  console.log(weather);
  const handleButtonClick = (event) => {
    const clikedID = event.target.id;
    const arr = [...showCountries];
    arr[clikedID].show = true;
    setShowCountries(arr);
  };

  filteredCountries.map((country) => {
    return { name: country.name, showBool: false };
  });

  let display = '';
  if (filteredCountries.length === 0) {
    display = '';
  } else if (filteredCountries.length > 10) {
    display = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    console.log(weather);
    display = <Country country={filteredCountries[0]} show={true} />;
  } else if (filteredCountries.length < 10) {
    display = (
      <ul style={({ listStyle: 'none' }, { paddingLeft: '0' })}>
        {filteredCountries.map((country, i) => (
          <li key={country.name}>
            <Country
              country={country}
              onClick={handleButtonClick}
              show={showCountries[i].show}
              id={i}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <Filter
        onChange={(event) => {
          handleFilterChange(event);
        }}
        value={filter}
      />

      {display}
    </div>
  );
}

export default App;
