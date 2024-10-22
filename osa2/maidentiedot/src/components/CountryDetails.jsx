import Weather from "./Weather";

const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Languages: {Object.values(country.languages).join(", ")}</p>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "150px" }}
      />
      <Weather country={country} />
    </>
  );
};

export default CountryDetails;
