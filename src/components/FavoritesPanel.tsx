import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FavoritesPanelProps {
  favorites: string[];
  onRemove: (value: string) => void;
}

export function FavoritesPanel({ favorites, onRemove }: FavoritesPanelProps) {
  return (
    <Card className="glass-panel animate-fade-up">
      <CardHeader>
        <CardTitle className="font-display text-xl">Tus favoritos</CardTitle>
        <p className="text-sm text-muted-foreground">
          Numeros guardados para comparar o compartir.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {favorites.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
            Todavia no hay favoritos. Guarda alguno desde el analisis o el generador.
          </div>
        ) : (
          favorites.map((value) => (
            <div
              key={value}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-slate-950/40 px-4 py-3 text-sm"
            >
              <p className="font-display text-lg tracking-[0.3em]">{value}</p>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                aria-label={`Eliminar ${value}`}
                onClick={() => onRemove(value)}
              >
                Eliminar
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
