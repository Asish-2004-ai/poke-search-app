import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import PokemonCard from "../components/PokemonCard";
import "../styles/App.css";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);

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

        // Set unique types for the filter dropdown
        const allTypes = [...new Set(pokemonDetails.flatMap(p => p.types))];
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

  const filteredPokemon = pokemonList.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === "" || pokemon.types.includes(selectedType))
    );
  });

  return (
    <div className="container">
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterDropdown types={types} selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      {loading && <p>Loading Pokémon...</p>}
      {error && <p>{error}</p>}
      {!loading && filteredPokemon.length === 0 && <p>No Pokémon found.</p>}

      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Home;
