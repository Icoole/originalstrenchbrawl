import { Link } from "@tanstack/react-router";
import ArenaScene from "@/components/ArenaScene";
import { Chip, NAV_LINKS } from "@/components/site/shared";

const STATS = [
  { value: "14", label: "Launch fighters" },
  { value: "10 XP", label: "Per CPU win" },
  { value: "1,000 XP", label: "Per activation batch" },
  { value: "24h", label: "Claim window" },
];

export function Hero() {
  return (
    <section id="top" className="arena-bg relative flex min-h-[100svh] flex-col overflow-hidden">
      <ArenaScene className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-abyss to-transparent" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-end px-4 pb-16 pt-40 text-center">
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2">
          <Chip>Official Brand Edition</Chip>
          <Chip>Version 1.2 · October 2026</Chip>
        </div>
        <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
          <span className="text-stroke-glow text-primary">Fight</span>
          <span className="text-foreground">.</span>{" "}
          <span className="text-foreground">Outplay</span>
          <span className="text-foreground">.</span>{" "}
          <span className="ember-glow text-ember">Dominate</span>
          <span className="text-foreground">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A Solana-native meme fighting game built around playable character identity, XP-based token
          activation and a progression that evolves from CPU battles in V1 to human PvP and $TRENCH
          wagering in V2.
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/xp-program"
            className="rounded-full bg-primary px-7 py-3 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
          >
            Earn XP Now
          </Link>
          <Link
            to="/roadmap"
            className="rounded-full border border-border bg-card/70 px-7 py-3 text-base font-extrabold text-foreground transition-colors hover:bg-accent"
          >
            See the Roadmap
          </Link>
        </div>
      </div>
    </section>
  );
}

export function StatsStrip() {
  return (
    <section className="relative z-10 -mt-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="card-glow rounded-2xl border border-border bg-card px-6 py-5 text-center">
            <p className="text-3xl font-black text-primary">{s.value}</p>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Menu grid linking to every page of the site. */
export function PageMenu() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Explore</p>
        <h2 className="mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">Step into the arena</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="card-glow group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/60"
          >
            <p className="text-xl font-black uppercase text-foreground">{l.label}</p>
            <p className="mt-2 text-sm font-extrabold uppercase tracking-widest text-ember transition-colors group-hover:text-primary">
              Open →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
