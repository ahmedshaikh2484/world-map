export const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
  country,
  setCountry,
}) => {
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };

  const sortCountries = (value) => {
    const sortCountry = [...country].sort((a, b) => {
      return value === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common);
    });
    setCountry(sortCountry); 
  };

  return (
    <section className="input-section">
      <input
        type="text"
        value={search}
        placeholder="search"
        onChange={handleInputChange}
      />

      <div>
        <button onClick={() => sortCountries("asc")}>ASC</button>
      </div>

      <div>
        <button onClick={() => sortCountries("dec")}>DEC</button>
      </div>

      <div>
        <select
          className="select-section"
          value={filter}
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};
