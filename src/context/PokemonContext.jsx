import { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    if (!favorites.some((fav) => fav.id === pokemon.id)) {
      setFavorites((prev) => [...prev, pokemon]);
    }
  };

  const removeFavorite = (pokemonId) => {
    setFavorites((prev) => prev.filter((p) => p.id !== pokemonId));
  };

  return (
    <PokemonContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
