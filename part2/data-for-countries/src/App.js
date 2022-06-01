import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Country from './components/Country';

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState([]);

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
      setFilteredCountries(
        countries.filter((country) => {
          return country.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        })
      );
    }
  };

  const handleShowClick = (event) => {
    console.log(event.target);
  };



  let display = '';
  if (filteredCountries.length === 0) {
    display = '';
  } else if (filteredCountries.length > 10) {
    display = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    display = <Country country={filteredCountries[0]} />;
  } else if (filteredCountries.length < 10) {
    
    display = (
      <ul style={({ listStyle: 'none' }, { paddingLeft: '0' })}>
        {filteredCountries.map((country) => (
          <li key={country.name}>
            <Country
              country={country}
              show={false}
              onClick={handleButtonClick}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <Filter onChange={handleFilterChange} value={filter} />
      <button onClick={handleShowClick}>click me</button>
      {display}
    </div>
  );
}

export default App;
