import { useContext } from "react";
import { FavoritesContext  } from "../context/FavoritesContext";
import PokemonCard from "../components/PokemonCard";

function Favorites() {
    const { favorites } = useContext(FavoritesContext);
  
    if (favorites.length === 0) return <p>No favorite Pokémon yet.</p>;
  
    return (
      <div className="pokemon-grid">
        {favorites.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }
  
  export default Favorites;
