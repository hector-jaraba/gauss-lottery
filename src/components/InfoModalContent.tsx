import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { HistoricalBias, HistoricalNeutral } from "@/lib/historical";
import DistribucionGaussiana from "@/assets/img/distribution.png";
import DistribucionHistorica from "@/assets/img/historic-distribution.png";
import Variance from "@/assets/img/variance.png";
interface InfoModalContentProps {
  biases: HistoricalBias[];
  neutrals: HistoricalNeutral[];
  requiredMatches: number;
}
export function InfoModalContent({
  biases,
  neutrals,
  requiredMatches,
}: InfoModalContentProps) {
  const positionCards = [...biases, ...neutrals].sort(
    (a, b) => a.position - b.position
  );
  const biasCount = biases.length;
  const sectionClass =
    "grid gap-4 rounded-2xl border border-border/60 bg-slate-950/40 p-5 shadow-lg";
  const sectionHeaderClass = "flex flex-wrap items-center gap-3";
  const panelClass =
    "grid gap-3 rounded-xl border border-border/60 bg-slate-950/60 p-4 text-sm shadow-inner";
  const imageClass = "w-full rounded-xl border border-border/60 shadow-lg";

  return (
    <>
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <Badge variant="secondary">Concepto base</Badge>
          <h3 className="text-lg font-semibold">
            La Cima de la Montaña: La distribución gaussiana
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          El matemático Carl Friedrich Gauss demostró que, en sistemas
          aleatorios, los resultados no se distribuyen de forma plana, sino que
          tienden a agruparse en el centro. Es el patrón más común cuando sumas
          muchos resultados aleatorios.
        </p>
        <div className="text-sm text-muted-foreground">
          <a
            className="underline"
            href="https://es.wikipedia.org/wiki/Distribuci%C3%B3n_normal"
            target="_blank"
            rel="noreferrer"
          >
            Wikipedia: distribución normal
          </a>
        </div>
      </section>
      <Separator />
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <Badge variant="secondary">Por qué aparece aquí</Badge>
          <h3 className="text-lg font-semibold">Suma de cinco bombos</h3>
        </div>
        <img
          src={DistribucionGaussiana}
          alt="distribución gaussiana lotería"
          className={imageClass}
        />
        <div className={panelClass}>
          <p className="font-semibold">Porcentaje sobre el total</p>
          <p className="text-sm text-muted-foreground">
            Cada bombo es uniforme (0 a 9). Al sumar cinco cifras
            independientes, la curva resultante se parece a una campana. El
            promedio es 22.5, por eso los picos son 22 y 23. Esto se explica por
            el teorema del límite central.
          </p>
          <a
            className="underline"
            href="https://es.wikipedia.org/wiki/Teorema_del_l%C3%ADmite_central"
            target="_blank"
            rel="noreferrer"
          >
            Wikipedia: teorema del límite central
          </a>
          <p>
            En un sorteo de 100.000 números (del 00000 al 99999) como el de la
            lotería, no todos los grupos se comportan igual. El azar tiende a
            buscar el equilibrio. Si sumas los 5 dígitos de un décimo, el
            resultado más frecuente en la historia es el 22 y el 23.
          </p>
          <p className="text-muted-foreground">
            Solo un 12% del total de los números suman 22 o 23.
          </p>
          <p className="text-muted-foreground">
            El centro interno son 6.000 números: 6% del total.
          </p>
        </div>
        <p>
          ¿Funciona esta teoría en la realidad? Hemos analizado el histórico
          real de premios (1941-2021) y los datos son contundentes. El azar
          "prefiere" la zona central:
        </p>
        <img
          src={DistribucionHistorica}
          alt="Distribución histórica lotería"
          className={imageClass}
        />
        <p>
          <b>Conclusión:</b> Más de 6 de cada 10 veces, el Gordo cae en la zona
          de centralidad que nuestra App analiza.
        </p>
      </section>
      <Separator />
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <Badge variant="secondary">El Segundo Nivel</Badge>
          <h3 className="text-lg font-semibold">El Atractor Fractal</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Una vez que estamos en la cima (<strong>Suma 22/23</strong>),
          aplicamos una lupa estadística. Buscamos el
          <span className="text-foreground font-medium"> Atractor</span>: el
          número que mejor representa el promedio real de los bombos.
        </p>
        <p className="text-sm text-muted-foreground">
          Cada bombo tiene bolas del 0 al 9, por lo que su valor medio es{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            4.5
          </code>
          . Nuestro algoritmo calcula la <strong>Varianza Interna</strong> para
          clasificar la "calidad" del número:
        </p>
        <div className={panelClass}>
          <div className="flex gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <p>
              <span className="font-semibold text-emerald-500">
                Números Equilibrados:
              </span>{" "}
              Dígitos cerca del 4.5 (como 4, 5 o 6). Son los "embajadores" del
              azar que habitan el centro de la campana.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
            <p>
              <span className="font-semibold text-rose-500">
                Números Tensos:
              </span>{" "}
              Utilizan valores extremos (0 o 9). Aunque sumen 22, su estructura
              interna es más inestable.
            </p>
          </div>
        </div>
        <div className="grid gap-2 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Cálculo del Índice de Centralidad
          </p>
          <div className="flex w-full items-center justify-center rounded-xl border border-border/40 bg-[#131314] py-6 text-center shadow-inner">
            <img src={Variance} alt="Fórmula de Varianza" />
          </div>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm shadow-lg">
          <p className="text-center font-medium">
            El sistema prioriza los números con{" "}
            <span className="underline decoration-primary/30 underline-offset-4">
              menor entropía
            </span>
            , seleccionando los que están situados en el{" "}
            <span className="font-bold">"centro del centro"</span>.
          </p>
        </div>
      </section>
      <Separator />
      <section className="grid gap-4 rounded-2xl border border-emerald-400/40 bg-slate-900/80 p-5 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <div className={sectionHeaderClass}>
          <Badge variant="secondary">Como se aplica</Badge>
          <h3 className="text-lg font-semibold text-foreground">Premisas</h3>
        </div>
        <p className="text-sm text-foreground">
          Cuando introduces un número el sistema evalúa tres capas:
        </p>
        <ul className="grid gap-3 text-sm text-foreground">
          <li className="rounded-xl border border-emerald-400/30 bg-slate-900/90 p-3">
            <b>Premisa 1 (Suma):</b> ¿Está el número en la cima de la campana de
            Gauss (Suma 22/23)?{" "}
          </li>
          <li className="rounded-xl border border-emerald-400/30 bg-slate-900/90 p-3">
            <b>Premisa 2 (Varianza):</b> ¿Es uno de los 6.000 números con mejor
            equilibrio interno?
          </li>
          <li className="rounded-xl border border-emerald-400/30 bg-slate-900/90 p-3">
            <b>
              Premisa 3 <small>opcional</small> (Historia):
            </b>{" "}
            ¿Coincide con los sesgos históricos de posición (como el 0 inicial o
            terminaciones frecuentes)?
          </li>
        </ul>
      </section>
      <Separator />
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <Badge variant="secondary">Filtro opcional</Badge>
          <h3 className="text-lg font-semibold">
            Sesgos históricos por posición
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Solo se evalúan las posiciones con sesgo claro. Las posiciones
          centrales se consideran neutras.
        </p>
        <div className={panelClass}>
          <p className="font-semibold">Por qué existe este filtro?</p>
          <p className="text-muted-foreground">
            En el historial hay posiciones con frecuencias desiguales por
            cambios en el sistema a lo largo de los años. El filtro permite
            marcar números que coinciden con esas tendencias históricas.
          </p>
          <p className="font-semibold">En que influye?</p>
          <p className="text-muted-foreground">
            {biasCount
              ? `Suma una premisa extra al radar. Si coincide con al menos ${requiredMatches} de ${biasCount} posiciones con sesgo, el número mejora su color. No cambia la probabilidad real del sorteo.`
              : "Con la muestra actual no se detectan sesgos claros, por eso el filtro no suma puntos."}
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
              { pos: "5a", label: "Unidades" },
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
        <div className={panelClass}>
          <p className="font-semibold">Muestra historica y campana</p>
          <p className="text-muted-foreground">
            Si tomas los números históricos completos y sumas sus cinco cifras,
            el histograma se concentra en 22 y 23. Es otra muestra de la campana
            de Gauss, aún con pocos datos. La historia no rompe la teoría, solo
            la ilustra.
          </p>
        </div>
        <div className="grid gap-3">
          {positionCards.map((item) => (
            <div
              key={item.position}
              className="rounded-xl border border-border/60 bg-slate-950/60 p-3 text-sm shadow-inner"
            >
              <p className="font-semibold">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.note}</p>
              {"favorites" in item ? (
                <p className="mt-2 text-xs">
                  Favoritos:{" "}
                  <span className="font-semibold">
                    {item.favorites.join(", ")}
                  </span>
                </p>
              ) : null}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {biasCount
            ? `El filtro se considera positivo si el número coincide con al menos ${requiredMatches} de ${biasCount} posiciones con sesgo claro.`
            : "El filtro no aplica porque la muestra no define sesgos."}
        </p>
      </section>
      <Separator />
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <Badge variant="secondary">Preguntas comunes</Badge>
          <h3 className="text-lg font-semibold">Respuestas rapidas</h3>
        </div>
        <div className="grid gap-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">
              Todo número es igual de probable?
            </span>{" "}
            Si. El sorteo es aleatorio. El radar solo mide si un número está en
            zonas estadísticamente más pobladas, no garantiza premios.
          </p>
          <p>
            <span className="font-semibold text-foreground">
              Si un número ya salió, influye?
            </span>{" "}
            No. Cada sorteo es independiente. El bombo no tiene memoria.
          </p>
          <p>
            <span className="font-semibold text-foreground">
              Por qué 22-23?
            </span>{" "}
            Son los valores más cercanos al promedio 22.5 y concentran más
            combinaciones.
          </p>
          <p>
            <span className="font-semibold text-foreground">
              Qué hace el generador?
            </span>{" "}
            Busca 5 números con el mejor puntaje según las premisas activas.
          </p>
        </div>
      </section>
    </>
  );
}
