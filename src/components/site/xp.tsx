import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/shared";

const XP_TABLE = [
  { action: "CPU win", amount: "10 XP" },
  { action: "CPU loss", amount: "0 XP" },
  { action: "Token conversion", amount: "1 XP = 0.5 $TRENCH" },
  { action: "Complete activation batch", amount: "1,000 XP" },
  { action: "Wins needed per batch", amount: "100 wins" },
  { action: "$TRENCH allocated per activated batch", amount: "500 $TRENCH at TGE" },
];

const CLOCK_STATES = [
  { title: "Accumulating", desc: "e.g. 450/1,000 — claim disabled, no claim window started yet." },
  { title: "Ready", desc: "1,000/1,000 — claim enabled, the 24-hour timer is running." },
  { title: "Claimed", desc: "Activation confirmed — 500 $TRENCH added to your recorded TGE balance." },
  { title: "Expired", desc: "24 hours passed without a claim — that batch can no longer be activated." },
];

export default function XpPage() {
  const flow = ["100 CPU wins", "1,000 XP", "0.1 SOL activation", "500 $TRENCH at TGE"];
  return (
    <section className="bg-abyss/60 py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading kicker="XP Program" title="Earn. Activate. Claim.">
          XP is earned through successful CPU fights in Version 1. It is not a cryptocurrency — and
          earning XP alone never delivers $TRENCH to a wallet.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-4">
          {flow.map((step, i) => (
            <div key={step} className="relative">
              <div className="card-glow flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </span>
                <p className="mt-2 text-lg font-extrabold text-foreground">{step}</p>
              </div>
              {i < flow.length - 1 ? (
                <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-2xl font-black text-ember sm:block">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="self-start overflow-hidden rounded-3xl border border-border bg-card">
            <div className="bg-secondary px-6 py-4">
              <p className="text-sm font-black uppercase tracking-widest text-foreground">The exchange ratio</p>
            </div>
            <table className="w-full text-left text-sm">
              <tbody>
                {XP_TABLE.map((row, i) => (
                  <tr key={row.action} className={i % 2 === 0 ? "bg-background/40" : ""}>
                    <td className="px-6 py-3 font-semibold text-muted-foreground">{row.action}</td>
                    <td className="px-6 py-3 text-right font-extrabold text-primary">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-lg font-extrabold text-foreground">The 24-hour clock</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The claim window opens only when an individual batch reaches 1,000 XP. You then have
                24 hours to activate it by completing the required 0.1 SOL payment. Every batch has
                its own claim clock and status.
              </p>
              <ul className="mt-4 space-y-3">
                {CLOCK_STATES.map((s) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-ember" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-extrabold text-foreground">{s.title}:</span> {s.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-primary/40 bg-card p-6 card-glow">
              <p className="text-sm font-black uppercase tracking-widest text-primary">Important distinction</p>
              <p className="mt-2 text-lg font-extrabold text-foreground">
                XP earned ≠ XP activated ≠ $TRENCH delivered
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Caps: 1,000,000 eligible activated XP per player/wallet (500,000 $TRENCH). Initial
                program pool: 1,000,000,000 XP — 500,000,000 $TRENCH reserved for TGE distribution.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center">
          <Link
            to="/battle-board"
            className="rounded-full bg-primary px-7 py-3 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
          >
            View the Battle Board
          </Link>
        </p>
      </div>
    </section>
  );
}
