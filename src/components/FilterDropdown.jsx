function FilterDropdown({ types, selectedType, setSelectedType }) {
    return (
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="filter-dropdown"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    );
  }
  export default FilterDropdown;
  