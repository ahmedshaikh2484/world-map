import { useEffect, useState } from "react";
import { useTransition } from "react";
import { getCountryData } from "./PostApi";
import { CountryCard } from "./AppLayout/CountryCard";
import { Vortex } from "react-loader-spinner";
import { SearchFilter } from "./UI/SearchFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState([]);

  const [search, setSearch] = useState();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    console.log(country);
    startTransition(async () => {
      const res = await getCountryData();
      console.log(res);
      setCountry(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
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

  // console.log(search, filter);

  const searchCountries = (countries) => {
    if (search) {
      return countries.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return countries;
  };

  const filterRegion = (countries) => {
    if (filter === "all") return countries;
    return countries.region === filter;
  };

  const filterCountries = country.filter(
    (countries) => searchCountries(countries) && filterRegion(countries)
  );

  return (
    <section className="country-wrapper">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        country={country}
        setCountry={setCountry}
      />

      <ul className="country-list">
        {filterCountries.map((curElem, index) => {
          return <CountryCard key={index} curData={curElem} />;
        })}
      </ul>
    </section>
  );
};
