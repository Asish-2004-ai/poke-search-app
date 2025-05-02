import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
    }
    fetchDetails();
  }, [id]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>Stats:</h3>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
      <h3>Abilities:</h3>
      <ul>
        {pokemon.abilities.map((ab) => (
          <li key={ab.ability.name}>{ab.ability.name}</li>
        ))}
      </ul>
      <h3>Moves:</h3>
      <ul>
        {pokemon.moves.slice(0,10).map((move) => (
          <li key={move.move.name}>{move.move.name}</li>
        ))}
      </ul>
      {/* TODO: add evolution chain */}
    </div>
  );
}

export default Detail;
