import { NavLink, Outlet } from "react-router-dom";
import { InfoModal } from "@/components/InfoModal";
import { useFavorites } from "@/lib/favorites-store";
import { cn } from "@/lib/utils";

const linkBase =
  "text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground";

export function AppLayout() {
  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl animate-float"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="pointer-events-none absolute right-16 top-1/2 h-40 w-40 rounded-full bg-rose-400/20 blur-3xl animate-float"
        style={{ animationDelay: "-2s" }}
      />

      <main className="container relative z-10 pb-16 pt-8">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Loteria del Nino
            </p>
            <nav className="flex items-center gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(linkBase, isActive && "text-foreground")
                }
                end
              >
                Inicio
              </NavLink>
              <NavLink
                to="/favoritos"
                className={({ isActive }) =>
                  cn(linkBase, isActive && "text-foreground")
                }
              >
                Favoritos{favoritesCount ? ` (${favoritesCount})` : ""}
              </NavLink>
            </nav>
          </div>
          <InfoModal />
        </header>

        <Outlet />
      </main>
    </div>
  );
}
