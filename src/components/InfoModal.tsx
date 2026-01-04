import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { InfoModalContent } from "@/components/InfoModalContent";
import { getHistoricalInsights } from "@/lib/historical";

export function InfoModal() {
  const { biases, neutrals, requiredMatches } = getHistoricalInsights();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full sm:w-auto border border-primary bg-primary text-primary-foreground shadow-xl shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-emerald-500/50"
        >
          Explicación y ayuda
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border border-border/70 bg-slate-950/90 shadow-2xl">
        <DialogHeader className="space-y-3 border-b border-border/40 pb-4">
          <DialogTitle className="font-display text-2xl">
            Como funciona el radar
          </DialogTitle>
          <DialogDescription>
            ¿Alguna vez has sentido que hay números que "se ven" más de lotería
            que otros? No es solo intuición, es matemática.
          </DialogDescription>
        </DialogHeader>

        <InfoModalContent
          biases={biases}
          neutrals={neutrals}
          requiredMatches={requiredMatches}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button>Entendido</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
