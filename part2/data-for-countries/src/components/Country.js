const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
      <img
        alt="flag"
        src={country.flag}
        style={({ width: '200' }, { height: '300' })}
      />
    </div>
  );
};

export default Country;
