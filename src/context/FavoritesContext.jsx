import { createContext, useState, useEffect, useContext } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    setFavorites((prev) => [...prev, pokemon]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
export const useFavorites = () => useContext(FavoritesContext);