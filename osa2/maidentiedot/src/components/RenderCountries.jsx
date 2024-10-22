import CountryDetails from "./CountryDetails";

const RenderCountries = ({
  filteredCountries,
  selectedCountry,
  handleShowOneCountry,
}) => {
  const render = () => {
    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} />;
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return <CountryDetails country={country} />;
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return (
        <>
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.cca3}>
                {country.name.common}{" "}
                <button
                  style={{ margin: "5px" }}
                  onClick={() => handleShowOneCountry(country.name.common)}
                >
                  show
                </button>
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      return <p>No matches</p>;
    }
  };

  return <div>{render()}</div>;
};

export default RenderCountries;
