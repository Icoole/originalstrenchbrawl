import { SectionHeading } from "@/components/site/shared";

const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Playable V1",
    points: [
      "14 fighters with their developed combat animations",
      "CPU-only battles — XP from wins, never from losses",
      "Guest practice plus persistent player accounts",
      "Public Battle Board with fights, XP and projected $TRENCH",
    ],
  },
  {
    phase: "Phase 2",
    title: "XP activation + Solana",
    points: [
      "1,000-XP batching with 24-hour claim windows",
      "Solana wallet connection for the 0.1 SOL activation",
      "Claimed / expired states, caps and the global XP budget",
      "Auditable 50% ecosystem / 50% development split of deposits",
    ],
  },
  {
    phase: "Phase 3",
    title: "Token preparation & TGE",
    points: [
      "Finalize the token contract and allocation",
      "Launch $TRENCH at TGE",
      "Deliver earned, activated and eligible allocations",
      "Enable $TRENCH-holder gameplay utilities",
    ],
  },
  {
    phase: "Phase 4",
    title: "V2 — PvP & wagering",
    points: [
      "Human-versus-human challenges and matching",
      "$TRENCH — not SOL — as the wager asset",
      "Secure settlement and independent match adjudication",
      "Battle fees: 50% marketing/XP, 50% to the Top 100 players",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <section className="bg-abyss/60 py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading kicker="Roadmap" title="Sequenced by capability">
          Milestones are ordered by what ships, not by promised calendar dates. Exact sequencing can
          change as engineering, audits and jurisdiction-specific requirements are resolved.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          {ROADMAP.map((p) => (
            <div key={p.phase} className="rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-ember px-3 py-1 text-sm font-black text-primary-foreground">{p.phase}</span>
                <h3 className="text-xl font-extrabold text-foreground">{p.title}</h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
