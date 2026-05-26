import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getIndCountryData } from "../PostApi";
import { Vortex } from "react-loader-spinner";

export const CountryDetails = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    startTransition(async () => {
      const res = await getIndCountryData(params.id);
      if (res.status === 200) {
        setCountries(res.data[0]);
      }
    });
  }, []);

  if (isPending || !countries) {
    return (
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    );
  }

  return (
    <div className="country-details-container">
      {countries && (
        <div className="country-flag">
          <img
            src={countries.flags?.svg}
            alt={countries.flags?.alt || "Country Flag"}
            className="flag"
          />
          <div className="country-container">
            <h1>{countries.name?.official}</h1>

            <div className="country-info">
              <p>
                <span className="card-description">Native Names:</span>
                {Object.keys(countries.name?.nativeName ?? {})
                  .map((key) => countries.name.nativeName[key].common)
                  .join(", ")}
              </p>

              <p>
                <span className="class-description">Population: </span>
                {countries.population?.toLocaleString()}
              </p>

              <p>
                <span className="class-description">Region: </span>
                {countries.region}
              </p>

              <p>
                <span className="class-description">Sub Region: </span>
                {countries.subregion}
              </p>

              <p>
                <span className="class-description">Capital: </span>
                {countries.capital?.join(", ")}
              </p>

              <p>
                <span className="class-description">Top Level Domain: </span>
                {countries.tld?.[0]}
              </p>

              <p>
                <span className="card-description">Currencies: </span>
                {Object.keys(countries.currencies ?? {})
                  .map((curElem) => countries.currencies[curElem].name)
                  .join(", ")}
              </p>

              <p>
                <span className="card-description">Languages: </span>
                {Object.keys(countries.languages ?? {})
                  .map((key) => countries.languages[key])
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="country-back">
        <NavLink to="/" className="backBtn">Go Back</NavLink>
      </div>
    </div>
  );
};
