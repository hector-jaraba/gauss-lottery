import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SuitabilityResult, SuitabilityStatus } from "@/lib/lottery";

const statusStyles: Record<
  SuitabilityStatus,
  { ring: string; badge: "success" | "warning" | "danger" }
> = {
  verde: { ring: "border-emerald-400/70 bg-emerald-500/10", badge: "success" },
  amarillo: { ring: "border-amber-400/70 bg-amber-500/10", badge: "warning" },
  rojo: { ring: "border-rose-400/70 bg-rose-500/10", badge: "danger" }
};

const statusLabel: Record<SuitabilityStatus, string> = {
  verde: "Verde",
  amarillo: "Amarillo",
  rojo: "Rojo"
};

interface ResultCardProps {
  evaluation: SuitabilityResult | null;
  numberValue: string;
  onSaveFavorite: (value: string) => void;
  isFavorite: boolean;
}

export function ResultCard({
  evaluation,
  numberValue,
  onSaveFavorite,
  isFavorite
}: ResultCardProps) {
  if (!evaluation) {
    return (
      <Card className="glass-panel animate-fade-up">
        <CardHeader>
          <CardTitle className="font-display text-xl">Tu radar aun espera</CardTitle>
          <p className="text-sm text-muted-foreground">
            Escribe un numero de cinco cifras para activar el analisis.
          </p>
        </CardHeader>
      </Card>
    );
  }

  const styles = statusStyles[evaluation.status];

  return (
    <Card
      className={cn(
        "glass-panel animate-fade-up border-2 shadow-xl transition-transform duration-300 hover:-translate-y-1",
        styles.ring
      )}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-xl">Resultado</CardTitle>
          <Badge variant={styles.badge}>
            {statusLabel[evaluation.status]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{evaluation.message}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 rounded-lg bg-slate-950/40 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">Suma</span>
            <span>{evaluation.sum}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Varianza interna</span>
            <span>{evaluation.variance.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Umbral central</span>
            <span>{evaluation.centralThreshold?.toFixed(2) ?? "-"}</span>
          </div>
        </div>
        <div className="space-y-3">
          {evaluation.premises.map((premise) => (
            <div
              key={premise.key}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-slate-950/40 px-3 py-2 text-sm transition-colors duration-300 hover:border-primary/60"
            >
              <div>
                <p className="font-semibold">{premise.label}</p>
                <p className="text-xs text-muted-foreground">{premise.detail}</p>
              </div>
              <div
                className={cn(
                  "h-3 w-3 rounded-full",
                  premise.satisfied ? "bg-emerald-500" : "bg-rose-400"
                )}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Premisas cumplidas: {evaluation.satisfiedCount}/{evaluation.totalPremises}
        </p>
        <Button
          type="button"
          className="w-full"
          disabled={!numberValue || isFavorite}
          onClick={() => onSaveFavorite(numberValue)}
        >
          {isFavorite ? "Guardado en favoritos" : "Guardar en favoritos"}
        </Button>
      </CardContent>
    </Card>
  );
}
