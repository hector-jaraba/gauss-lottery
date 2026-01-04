import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { HISTORICAL_BIASES, HISTORICAL_NEUTRALS } from "@/lib/lottery";

export function InfoModal() {
  const positionCards = [...HISTORICAL_BIASES, ...HISTORICAL_NEUTRALS].sort(
    (a, b) => a.position - b.position
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto hover:animate-glow">
          Explicacion y ayuda
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Como funciona el radar</DialogTitle>
          <DialogDescription>
            Una guia clara y corta para entender el criterio sin dudas.
          </DialogDescription>
        </DialogHeader>

        <section className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Concepto base</Badge>
            <h3 className="text-lg font-semibold">Que es la distribucion gaussiana</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Es la famosa campana donde los valores cercanos al promedio aparecen mas y los
            extremos menos. Es el patron mas comun cuando sumas muchos resultados aleatorios.
          </p>
          <div className="text-sm text-muted-foreground">
            <a
              className="underline"
              href="https://es.wikipedia.org/wiki/Distribuci%C3%B3n_normal"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia: distribucion normal
            </a>
          </div>
          <div className="grid gap-2 rounded-lg border border-border/60 bg-slate-950/40 p-4 text-sm">
            <p className="font-semibold">Porcentaje sobre el total</p>
            <p className="text-muted-foreground">
              Hay 100.000 numeros posibles (00000 a 99999). Los 12.000 que suman 22 o 23
              representan el 12% del total.
            </p>
            <p className="text-muted-foreground">
              El centro interno son 6.000 numeros: 6% del total y 50% de esos 12.000.
            </p>
          </div>
          <svg viewBox="0 0 320 120" className="w-full">
            <defs>
              <linearGradient id="sumCurve" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FCA5A5" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
            <rect x="140" y="0" width="40" height="120" fill="#FDE68A" opacity="0.5" />
            <path
              d="M10 110 C 80 20, 240 20, 310 110 L 310 120 L 10 120 Z"
              fill="url(#sumCurve)"
              opacity="0.8"
            />
            <text x="150" y="20" fontSize="12" fill="#92400E">
              22-23
            </text>
          </svg>
        </section>

        <Separator />

        <section className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Por que aparece aqui</Badge>
            <h3 className="text-lg font-semibold">Suma de cinco bombos</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Cada bombo es uniforme (0 a 9). Al sumar cinco cifras independientes, la curva
            resultante se parece a una campana. El promedio es 22.5, por eso los picos son 22
            y 23. Esto se explica por el teorema del limite central.
          </p>
          <div className="text-sm text-muted-foreground">
            <a
              className="underline"
              href="https://es.wikipedia.org/wiki/Teorema_del_l%C3%ADmite_central"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia: teorema del limite central
            </a>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground">
            <p>
              De los 100.000 numeros posibles, hay 12.000 que suman 22 o 23. Esa es la zona
              con mas combinaciones, por eso es la premisa 1.
            </p>
            <p>
              Luego ordenamos esos 12.000 por equilibrio interno (varianza). Los 6.000 mas
              equilibrados son el centro interno, y esa es la premisa 2.
            </p>
            <p>
              Teoricamente, elegir dentro de un grupo mas poblado aumenta la probabilidad de
              que la suma del numero caiga en esa zona, pero no aumenta la probabilidad de un
              numero especifico. Todos los numeros individuales siguen siendo igual de raros.
            </p>
          </div>
          <svg viewBox="0 0 320 120" className="w-full">
            <defs>
              <linearGradient id="variance" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#A5B4FC" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <path
              d="M10 110 C 80 25, 240 25, 310 110"
              stroke="#1F2937"
              strokeWidth="3"
              fill="none"
            />
            <rect x="120" y="25" width="80" height="85" fill="url(#variance)" opacity="0.6" />
            <text x="135" y="45" fontSize="12" fill="#1F2937">
              Centro 6.000
            </text>
          </svg>
        </section>

        <Separator />

        <section className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Filtro opcional</Badge>
            <h3 className="text-lg font-semibold">Sesgos historicos por posicion</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Solo se evaluan las posiciones con sesgo claro. Las posiciones centrales se
            consideran neutras.
          </p>
          <div className="grid gap-3 rounded-lg border border-border/60 bg-slate-950/40 p-4 text-sm">
            <p className="font-semibold">Por que existe este filtro?</p>
            <p className="text-muted-foreground">
              En el historial hay posiciones con frecuencias desiguales por cambios en el
              sistema a lo largo de los anos. El filtro permite marcar numeros que coinciden
              con esas tendencias historicas.
            </p>
            <p className="font-semibold">En que influye?</p>
            <p className="text-muted-foreground">
              Suma una premisa extra al radar. Si coincide con al menos 2 de las 3 posiciones
              con sesgo, el numero mejora su color. No cambia la probabilidad real del sorteo.
            </p>
          </div>
          <div className="grid gap-3">
            <p className="text-sm font-semibold">Mapa de posiciones (1 a 5)</p>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {[
                { pos: "1a", label: "Decena de millar" },
                { pos: "2a", label: "Unidad de millar" },
                { pos: "3a", label: "Centenas" },
                { pos: "4a", label: "Decenas" },
                { pos: "5a", label: "Unidades" }
              ].map((item) => (
                <div
                  key={item.pos}
                  className="rounded-md border border-border/60 bg-slate-900/60 p-2"
                >
                  <p className="font-semibold text-foreground">{item.pos}</p>
                  <p className="text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2 rounded-lg border border-border/60 bg-slate-950/40 p-4 text-sm">
            <p className="font-semibold">Muestra historica y campana</p>
            <p className="text-muted-foreground">
              Si tomas los numeros historicos completos y sumas sus cinco cifras, el
              histograma se concentra en 22 y 23. Es otra muestra de la campana de Gauss, aun
              con pocos datos. La historia no rompe la teoria, solo la ilustra.
            </p>
          </div>
          <div className="grid gap-3">
            {positionCards.map((item) => (
              <div
                key={item.position}
                className="rounded-lg border border-border/60 bg-slate-950/40 p-3 text-sm"
              >
                <p className="font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
                {"favorites" in item ? (
                  <p className="mt-2 text-xs">
                    Favoritos:{" "}
                    <span className="font-semibold">{item.favorites.join(", ")}</span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            El filtro se considera positivo si el numero coincide con al menos 2 de las 3
            posiciones con sesgo claro.
          </p>
        </section>

        <Separator />

        <section className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Preguntas comunes</Badge>
            <h3 className="text-lg font-semibold">Respuestas rapidas</h3>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Todo numero es igual de probable?</span>{" "}
              Si. El sorteo es aleatorio. El radar solo mide si un numero esta en zonas
              estadisticamente mas pobladas, no garantiza premios.
            </p>
            <p>
              <span className="font-semibold text-foreground">Si un numero ya salio, influye?</span>{" "}
              No. Cada sorteo es independiente. El bombo no tiene memoria.
            </p>
            <p>
              <span className="font-semibold text-foreground">Por que 22-23?</span>{" "}
              Son los valores mas cercanos al promedio 22.5 y concentran mas combinaciones.
            </p>
            <p>
              <span className="font-semibold text-foreground">Que hace el generador?</span>{" "}
              Busca 5 numeros con el mejor puntaje segun las premisas activas.
            </p>
          </div>
        </section>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Entendido</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
