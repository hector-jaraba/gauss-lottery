import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  useHistory: boolean;
  onToggleHistory: (checked: boolean) => void;
}

export function NumberInput({ value, onChange, useHistory, onToggleHistory }: NumberInputProps) {
  const previewDigits = value.padEnd(5, "_").split("");

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="lottery-number">Tu numero de 5 cifras</Label>
        <Input
          id="lottery-number"
          value={value}
          inputMode="numeric"
          placeholder="00000"
          maxLength={5}
          onChange={(event) => onChange(event.target.value)}
          className="font-display text-lg tracking-[0.4em]"
        />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Vista previa:</span>
          <div className="flex gap-2">
            {previewDigits.map((digit, index) => (
              <span
                key={`${digit}-${index}`}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-slate-950/40 font-semibold transition-transform duration-300 hover:-translate-y-1"
              >
                {digit}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-slate-900/50 p-4">
        <Checkbox
          id="history"
          checked={useHistory}
          onCheckedChange={(checked) => onToggleHistory(Boolean(checked))}
        />
        <div className="space-y-1">
          <Label htmlFor="history" className="text-sm">
            Considerar sesgos historicos por posicion
          </Label>
          <p className="text-xs text-muted-foreground">
            Anade un filtro extra basado en el comportamiento de sorteos pasados.
          </p>
        </div>
      </div>

    </div>
  );
}
