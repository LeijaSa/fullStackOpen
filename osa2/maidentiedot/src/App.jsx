import { useEffect, useState } from "react";
import axios from "axios";
import RenderCountries from "./components/renderCountries";

const App = () => {
  const [searchWord, setSearchWord] = useState("");
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowOneCountry = (name) => {
    const country = filteredCountries.find(
      (country) => country.name.common.toLowerCase() === name.toLowerCase()
    );
    setSelectedCountry(country);
  };

  const handleSearch = (event) => {
    setSearchWord(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (searchWord) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredCountries(filtered);
      setSelectedCountry(null);
    } else {
      setFilteredCountries([]);
      setSelectedCountry(null);
    }
  }, [searchWord, countries]);

  return (
    <div>
      <div>
        find countries
        <input
          style={{ margin: "5px" }}
          value={searchWord}
          onChange={handleSearch}
        />
      </div>
      <RenderCountries
        filteredCountries={filteredCountries}
        selectedCountry={selectedCountry}
        handleShowOneCountry={handleShowOneCountry}
      />
    </div>
  );
};

export default App;
