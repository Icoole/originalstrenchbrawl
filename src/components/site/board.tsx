import { SectionHeading } from "@/components/site/shared";

const BOARD_ROWS = [
  { rank: 1, handle: "@example_alpha", fights: "2,500", losses: "700", wins: "1,800", xp: "18,000", trench: "9,000" },
  { rank: 2, handle: "@example_beta", fights: "1,800", losses: "550", wins: "1,250", xp: "12,000", trench: "6,000" },
  { rank: 3, handle: "@example_gamma", fights: "600", losses: "200", wins: "400", xp: "4,000", trench: "2,000" },
];

export default function BattleBoardPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading kicker="Rankings" title="The Battle Board">
        The public Battle Board recognizes players for activated XP and shows match results and
        projected $TRENCH allocation. Ranked by activated XP — never by merely earned XP.
      </SectionHeading>
      <div className="card-glow overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="bg-secondary text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4 font-black">Rank</th>
                <th className="px-6 py-4 font-black">X Handle</th>
                <th className="px-6 py-4 text-right font-black">Fights</th>
                <th className="px-6 py-4 text-right font-black">Losses</th>
                <th className="px-6 py-4 text-right font-black">Wins</th>
                <th className="px-6 py-4 text-right font-black">Activated XP</th>
                <th className="px-6 py-4 text-right font-black">$TRENCH</th>
              </tr>
            </thead>
            <tbody>
              {BOARD_ROWS.map((r, i) => (
                <tr key={r.rank} className={i % 2 === 0 ? "bg-background/40" : ""}>
                  <td className="px-6 py-4 text-xl font-black text-ember">{r.rank}</td>
                  <td className="px-6 py-4 font-bold text-foreground">{r.handle}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{r.fights}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{r.losses}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{r.wins}</td>
                  <td className="px-6 py-4 text-right font-extrabold text-primary">{r.xp}</td>
                  <td className="px-6 py-4 text-right font-extrabold text-foreground">{r.trench}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">Illustrative figures only, not real player statistics.</p>
      <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-border bg-card p-6 text-center">
        <p className="text-sm font-black uppercase tracking-widest text-ember">Top 100 rewards · V2 only</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          When wagered PvP launches, 50% of all battle fees are designated for the Top 100 Battle
          Board players, distributed proportionally to each player's share of the Top 100's total
          activated XP. In V1 there are no wagered battle fees — CPU battles stay free of wagers.
        </p>
      </div>
    </section>
  );
}
