import { FavoritesPanel } from "@/components/FavoritesPanel";
import { useFavorites } from "@/lib/favorites-store";

export function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <section className="grid gap-6">
      <header className="grid gap-3">
        <h1 className="font-display text-3xl font-semibold">Favoritos</h1>
        <p className="text-sm text-muted-foreground">
          Guarda numeros para revisarlos luego. Se mantienen en este dispositivo.
        </p>
      </header>
      <FavoritesPanel favorites={favorites} onRemove={removeFavorite} />
    </section>
  );
}
