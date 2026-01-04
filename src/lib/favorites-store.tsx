import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface FavoritesContextValue {
  favorites: string[];
  addFavorite: (value: string) => void;
  removeFavorite: (value: string) => void;
}

const FAVORITES_KEY = "lotery:favorites";
const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setFavorites(
          parsed.filter(
            (item) => typeof item === "string" && /^\d{5}$/.test(item)
          )
        );
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage failures and keep in-memory state.
    }
  }, [favorites]);

  const addFavorite = (value: string) => {
    if (!/^\d{5}$/.test(value)) return;
    setFavorites((prev) => (prev.includes(value) ? prev : [value, ...prev]));
  };

  const removeFavorite = (value: string) => {
    setFavorites((prev) => prev.filter((item) => item !== value));
  };

  const contextValue = useMemo(
    () => ({ favorites, addFavorite, removeFavorite }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
