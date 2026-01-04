import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GeneratedNumber, SuitabilityStatus } from "@/lib/lottery";

const statusBadge: Record<SuitabilityStatus, { label: string; variant: "success" | "warning" | "danger" }> = {
  verde: { label: "Optimo", variant: "success" },
  amarillo: { label: "Parcial", variant: "warning" },
  rojo: { label: "Bajo", variant: "danger" }
};

interface GeneratorPanelProps {
  generated: GeneratedNumber[];
  useHistory: boolean;
  onGenerate: () => void;
  onAddFavorite: (value: string) => void;
  favoriteValues: string[];
}

export function GeneratorPanel({
  generated,
  useHistory,
  onGenerate,
  onAddFavorite,
  favoriteValues
}: GeneratorPanelProps) {
  return (
    <Card className="glass-panel animate-fade-up">
      <CardHeader className="space-y-3">
        <CardTitle className="font-display text-xl">Generador de cinco numeros</CardTitle>
        <p className="text-sm text-muted-foreground">
          Muestra cinco candidatos con el mejor puntaje dentro de los criterios activos.
        </p>
        <Button onClick={onGenerate} className="w-full">
          Generar ahora
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>Premisas activas:</span>
          <Badge variant="secondary">Suma 22/23</Badge>
          <Badge variant="secondary">Centro 6.000</Badge>
          {useHistory ? <Badge variant="secondary">Historico</Badge> : null}
        </div>
        <div className="grid gap-3">
          {generated.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
              Todavia no hay numeros. Pulsa \"Generar ahora\".
            </div>
          ) : (
            generated.map((item) => {
              const isFavorite = favoriteValues.includes(item.value);

              return (
                <div
                  key={item.value}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-slate-950/40 px-4 py-3 text-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary/60"
                >
                  <div>
                    <p className="font-display text-lg tracking-[0.3em]">{item.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.satisfiedCount}/{item.totalPremises} premisas
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusBadge[item.status].variant}>
                      {statusBadge[item.status].label}
                    </Badge>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isFavorite}
                      onClick={() => onAddFavorite(item.value)}
                    >
                      {isFavorite ? "Guardado" : "Guardar"}
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
