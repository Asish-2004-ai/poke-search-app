import { Link } from "react-router-dom";
import { useContext } from "react";
// import { PokemonContext } from "../context/PokemonContext";
import { FavoritesContext } from "../context/FavoritesContext";



function PokemonCard({ pokemon }) {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const handleFavorite = () => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>ID: {pokemon.id}</p>
        <div className="types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </Link>
      <button onClick={handleFavorite}>
        {isFavorite(pokemon.id) ? "★ Unfavorite" : "☆ Favorite"}
      </button>
    </div>
  );
}

export default PokemonCard;
  