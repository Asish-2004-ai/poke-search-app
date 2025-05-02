import { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]); 
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const itemsPerPage = 20;

  const toggleType = (type) => {
    setSelectedTypes([type]); 
  };

  const sortedFilteredPokemon = useMemo(() => {
    let list = [...pokemonList];

    if (selectedTypes.length > 0) {
      list = list.filter((p) =>
        selectedTypes.every((type) => p.types.includes(type))
      );
    }

    if (searchTerm) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "id-asc") list.sort((a, b) => a.id - b.id);
    if (sortOption === "id-desc") list.sort((a, b) => b.id - a.id);
    if (sortOption === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOption === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [pokemonList, selectedTypes, searchTerm, sortOption]);

  const paginatedPokemon = sortedFilteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map((t) => t.type.name),
            };
          })
        );
        setPokemonList(pokemonDetails);

        const allTypes = [...new Set(pokemonDetails.flatMap((p) => p.types))];
        setTypes(allTypes);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch Pokémon. Try again later.");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <Header />
      <button
        onClick={() => navigate("/favorites")}
        style={{ margin: "1rem", padding: "0.5rem 1rem" }}
      >
        View Favorites
      </button>
      <button
        onClick={() => navigate("/compare")}
        style={{ margin: "1rem", padding: "0.5rem 1rem" }}
      >
        Compare
      </button>

      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="type-filters">
          {types.map((type) => (
            <label key={type} style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />
              {type}
            </label>
          ))}
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ padding: "0.5rem", marginLeft: "1rem" }}
        >
          <option value="">Sort By</option>
          <option value="id-asc">ID ↑</option>
          <option value="id-desc">ID ↓</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>

      {loading && <p>Loading Pokémon...</p>}
      {error && <p>{error}</p>}
      {!loading && paginatedPokemon.length === 0 && <p>No Pokémon found.</p>}

      <div className="pokemon-grid">
        {paginatedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          disabled={currentPage === Math.ceil(sortedFilteredPokemon.length / itemsPerPage)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
