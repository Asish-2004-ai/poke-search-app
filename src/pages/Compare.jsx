import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
// import { Link } from "react-router-dom";

function Compare() {
  const { favorites } = useFavorites();
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
    return <p>No favorites available to compare</p>;
  }

  const handleSelect = (pokemon, type) => {
    if (type === "pokemon1") {
      setPokemon1(pokemon);
    } else if (type === "pokemon2") {
      setPokemon2(pokemon);
    }
  };

  const hasStats = (pokemon) => pokemon && pokemon.stats && Array.isArray(pokemon.stats);

  return (
    <div>
      <h1>Compare Pokémon</h1>
      <div>
        <h3>Select Pokémon to Compare:</h3>
        <div>
          <select
            onChange={(e) =>
              handleSelect(
                favorites.find((fav) => fav.id === parseInt(e.target.value)),
                "pokemon1"
              )
            }
          >
            <option value="">Select Pokémon 1</option>
            {favorites.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) =>
              handleSelect(
                favorites.find((fav) => fav.id === parseInt(e.target.value)),
                "pokemon2"
              )
            }
          >
            <option value="">Select Pokémon 2</option>
            {favorites.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {pokemon1 && pokemon2 ? (
        <div>
          <h2>Comparison:</h2>
          <div>
            <h3>
              {pokemon1.name} vs {pokemon2.name}
            </h3>
            <div>
              <h4>Stats Comparison:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>{pokemon1.name}</th>
                    <th>{pokemon2.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {hasStats(pokemon1) && hasStats(pokemon2) ? (
                    pokemon1.stats.map((stat1, index) => (
                      <tr key={stat1.stat.name}>
                        <td>{stat1.stat.name}</td>
                        <td>{stat1.base_stat}</td>
                        <td>{pokemon2.stats[index]?.base_stat || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No stats available for comparison</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>Please select two Pokémon to compare</p>
      )}
    </div>
  );
}

export default Compare;
