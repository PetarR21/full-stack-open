const Country = ({ country, show }) => {
  if (!show) {
    return (
      <div>
        {country.name} <button>show</button>
      </div>
    );
  } else {
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
        <img alt="flag" src={country.flag} />
      </div>
    );
  }
};

export default Country;
