import { useMemo, useState } from "react";
import { GeneratorPanel } from "@/components/GeneratorPanel";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  evaluateNumber,
  formatNumber,
  generateSuggestedNumbers,
  normalizeInput,
  type GeneratedNumber
} from "@/lib/lottery";
import { useFavorites } from "@/lib/favorites-store";

const STAT_BLOCKS = [
  {
    title: "Campana global",
    value: "0-45",
    detail: "Suma de cinco cifras"
  },
  {
    title: "Zona ideal",
    value: "22-23",
    detail: "Pico de la distribucion"
  },
  {
    title: "Nucleo",
    value: "6.000",
    detail: "Centro interno por varianza"
  }
];

export function HomePage() {
  const [input, setInput] = useState("");
  const [useHistory, setUseHistory] = useState(false);
  const [generated, setGenerated] = useState<GeneratedNumber[]>([]);
  const { addFavorite, favorites } = useFavorites();

  const evaluation = useMemo(
    () => evaluateNumber(input, { useHistory }),
    [input, useHistory]
  );

  const formattedInput = useMemo(
    () => (input.length === 5 ? formatNumber(input) : ""),
    [input]
  );
  const isFavorite = formattedInput
    ? favorites.includes(formattedInput)
    : false;

  const handleChange = (value: string) => {
    setInput(normalizeInput(value));
  };

  const handleGenerate = () => {
    setGenerated(generateSuggestedNumbers(5, { useHistory }));
  };

  return (
    <>
      <header className="mb-10 grid gap-6">
        <h1 className="font-display text-3xl font-semibold sm:text-5xl animate-fade-up">
          Radar de probabilidad para el numero perfecto
        </h1>
        <p
          className="max-w-2xl text-base text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Introduce un numero de cinco cifras y descubre si cae en el corazon de la
          campana estadistica. Activa el filtro historico para sumar la experiencia de
          los sorteos pasados.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {STAT_BLOCKS.map((stat) => (
          <Card
            key={stat.title}
            className="glass-panel animate-fade-up transition-transform duration-300 hover:-translate-y-1 hover:border-primary/60"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-2xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="glass-panel animate-fade-up">
          <CardHeader>
            <CardTitle className="font-display text-xl">Analiza tu decimo</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <NumberInput
              value={input}
              onChange={handleChange}
              useHistory={useHistory}
              onToggleHistory={setUseHistory}
            />
            <ResultCard
              evaluation={evaluation}
              numberValue={formattedInput}
              onSaveFavorite={addFavorite}
              isFavorite={isFavorite}
            />
          </CardContent>
        </Card>

        <GeneratorPanel
          generated={generated}
          useHistory={useHistory}
          onGenerate={handleGenerate}
          onAddFavorite={addFavorite}
          favoriteValues={favorites}
        />
      </section>

      <section className="mt-10 rounded-2xl border border-border/60 bg-slate-950/40 p-6 text-sm text-muted-foreground shadow-lg animate-fade-up">
        <p className="font-medium text-foreground">Nota importante</p>
        <p>
          Todos los numeros tienen la misma probabilidad de salir. Este radar solo indica
          que tan centrado esta un numero dentro de las distribuciones descritas en la
          conversacion.
        </p>
      </section>
    </>
  );
}
