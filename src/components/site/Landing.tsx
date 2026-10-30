import { useState } from "react";
import ArenaScene from "@/components/ArenaScene";
import logoAsset from "@/assets/trench-brawl-logo.jpg.asset.json";
import dogeImg from "@/assets/fighter-doge.png.asset.json";
import pepeImg from "@/assets/fighter-pepe.png.asset.json";
import bonkImg from "@/assets/fighter-bonk.png.asset.json";
import flokiImg from "@/assets/fighter-floki.png.asset.json";
import wifImg from "@/assets/fighter-wif.png.asset.json";
import penguImg from "@/assets/fighter-pengu.png.asset.json";
import cashcatImg from "@/assets/fighter-cashcat.png.asset.json";
import zcatImg from "@/assets/fighter-zcat.png.asset.json";
import pnutImg from "@/assets/fighter-pnut.png.asset.json";
import shibaImg from "@/assets/fighter-shiba.png.asset.json";
import superinuImg from "@/assets/fighter-superinu.png.asset.json";
import purrImg from "@/assets/fighter-purr.png.asset.json";
import mogImg from "@/assets/fighter-mog.png.asset.json";
import turboImg from "@/assets/fighter-turbo.png.asset.json";

const LOGO_URL = logoAsset.url;
const FIGHTERS_URL = fightersAsset.url;

const NAV_LINKS = [
  { label: "Fighters", href: "#fighters" },
  { label: "XP Program", href: "#xp" },
  { label: "Battle Board", href: "#battle-board" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: "14", label: "Launch fighters" },
  { value: "10 XP", label: "Per CPU win" },
  { value: "1,000 XP", label: "Per activation batch" },
  { value: "24h", label: "Claim window" },
];

const FIGHTERS: { name: string; note: string; tag: string; img: string }[] = [
  { name: "DOGE", note: "Boxer-inspired doge", tag: "Alpha Howl", img: dogeImg.url },
  { name: "PEPE", note: "Frog, agile ninja-inspired", tag: "Pond Pounce", img: pepeImg.url },
  { name: "BONK", note: "Dog-themed brawler with bat", tag: "Fetch & Rekt", img: bonkImg.url },
  { name: "FLOKI", note: "Viking-themed warrior", tag: "Pack Fury", img: flokiImg.url },
  { name: "WIF", note: "Pink beanie, streetwear", tag: "Hat Trick", img: wifImg.url },
  { name: "PENGU", note: "Penguin fighter", tag: "Deep Freeze", img: penguImg.url },
  { name: "CASHCAT", note: "Pale-fur, watery-eye features", tag: "Cash Flow", img: cashcatImg.url },
  { name: "ZCAT", note: "Cat fighter with paper-bag mask", tag: "Bag Guard", img: zcatImg.url },
  { name: "PNUT", note: "Squirrel with adventurer hat", tag: "Nut Storm", img: pnutImg.url },
  { name: "SHIBA", note: "Shiba Inu-inspired fighter", tag: "Shib Flash", img: shibaImg.url },
  { name: "SUPER INU", note: "Superhero-inspired inu", tag: "Cyber Hunt", img: superinuImg.url },
  { name: "PURR", note: "Cat fighter", tag: "Silent Strike", img: purrImg.url },
  { name: "MOG", note: "Black-and-gold streetwear cat", tag: "Nine Lives", img: mogImg.url },
  { name: "TURBO", note: "Frog racing-inspired fighter", tag: "Toad Overdrive", img: turboImg.url },
];

const XP_TABLE = [
  { action: "CPU win", amount: "10 XP" },
  { action: "CPU loss", amount: "0 XP" },
  { action: "Token conversion", amount: "1 XP = 0.5 $TRENCH" },
  { action: "Complete activation batch", amount: "1,000 XP" },
  { action: "Wins needed per batch", amount: "100 wins" },
  { action: "Activation payment per batch", amount: "0.1 SOL" },
  { action: "$TRENCH allocated per activated batch", amount: "500 $TRENCH at TGE" },
];

const CLOCK_STATES = [
  { title: "Accumulating", desc: "e.g. 450/1,000 — claim disabled, no claim window started yet." },
  { title: "Ready", desc: "1,000/1,000 — claim enabled, the 24-hour timer is running." },
  { title: "Claimed", desc: "Activation confirmed — 500 $TRENCH added to your recorded TGE balance." },
  { title: "Expired", desc: "24 hours passed without a claim — that batch can no longer be activated." },
];

const BOARD_ROWS = [
  { rank: 1, handle: "@example_alpha", fights: "2,500", losses: "700", wins: "1,800", xp: "18,000", trench: "9,000" },
  { rank: 2, handle: "@example_beta", fights: "1,800", losses: "550", wins: "1,250", xp: "12,000", trench: "6,000" },
  { rank: 3, handle: "@example_gamma", fights: "600", losses: "200", wins: "400", xp: "4,000", trench: "2,000" },
];

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

const FAQS = [
  {
    q: "Do I need to wager to play Trench Brawl V1?",
    a: "No. V1 is CPU-only and non-wagered. Wagered PvP is reserved for V2 between human players using $TRENCH.",
  },
  {
    q: "How do I earn XP?",
    a: "Win a fight against the CPU. Each win earns 10 XP; losses earn 0 XP.",
  },
  {
    q: "Does earning 1,000 XP send $TRENCH to my wallet?",
    a: "No. A qualifying batch must be activated with 0.1 SOL within its 24-hour window. A confirmed activation establishes a planned 500-$TRENCH TGE allocation, not an immediate token transfer.",
  },
  {
    q: "What happens if I miss the deadline?",
    a: "That complete 1,000-XP batch is marked Expired and is not eligible for activation under the current rules. New XP is tracked in the next batch, which has its own claim clock.",
  },
  {
    q: "What counts for my Battle Board rank?",
    a: "Activated XP, not merely earned XP. The displayed $TRENCH amount is a projected allocation until delivery at TGE.",
  },
  {
    q: "How many $TRENCH can I earn?",
    a: "The individual cap is 1,000,000 eligible activated XP — equal to 500,000 $TRENCH at the pre-TGE conversion — subject to the overall program pool of 1,000,000,000 XP.",
  },
  {
    q: "Are NFTs part of the project?",
    a: "No. The NFT mint and NFT-based rewards have been removed from the plan.",
  },
  {
    q: "Where do XP activation deposits go?",
    a: "50% funds $TRENCH liquidity, buybacks and XP-program sustainability; 50% supports development, game features and distribution.",
  },
];

function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">{kicker}</p>
      <h2 className="mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">{title}</h2>
      {children ? <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</p> : null}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-semibold text-foreground/90">
      {children}
    </span>
  );
}

function FighterCard({ f }: { f: (typeof FIGHTERS)[number] }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const flipped = hovered || tapped;

  return (
    <div
      className="h-80 [perspective:1200px] sm:h-96"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setTapped((v) => !v)}
        className="relative block h-full w-full text-left transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front — fighter portrait */}
        <div className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary/10 transition-colors duration-300 group-hover:border-primary/60">
          <img src={f.img} alt={`${f.name} fighter art`} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/85 to-transparent px-4 pb-3 pt-10">
            <p className="text-lg font-black uppercase tracking-wide text-foreground">{f.name}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-ember">{f.tag}</p>
          </div>
        </div>
        {/* Back — fighter profile */}
        <div
          className="backface-hidden absolute inset-0 flex flex-col justify-end overflow-hidden rounded-2xl border border-primary/50 bg-card p-5"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent_60%)]" />
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{f.name}</p>
          <p className="mt-1 text-xl font-black uppercase text-ember">{f.tag}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            10 XP per CPU win
          </p>
        </div>
      </button>
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="panel-glass mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Trench Brawl logo" className="h-10 w-10 rounded-xl object-cover" />
          <span className="text-base font-black uppercase tracking-wide whitespace-nowrap text-foreground sm:text-lg">
            Trench <span className="text-primary">Brawl</span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#fighters"
          className="rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground transition-transform hover:scale-105 sm:px-5"
        >
          Enter the Trench
        </a>
      </div>
    </header>
  );
}

function Hero() {
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
          <a
            href="#xp"
            className="rounded-full bg-primary px-7 py-3 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
          >
            Earn XP Now
          </a>
          <a
            href="#roadmap"
            className="rounded-full border border-border bg-card/70 px-7 py-3 text-base font-extrabold text-foreground transition-colors hover:bg-accent"
          >
            See the Roadmap
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
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

function FightersSection() {
  return (
    <section id="fighters" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <SectionHeading kicker="Gameplay & Fighters" title="Choose your fighter">
        Players control the fighter directly — movement, punches, kicks, blocks, jumps and special
        moves. Fight the CPU, win, and build a public record of victories and activated XP.
      </SectionHeading>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {FIGHTERS.map((f) => (
          <FighterCard key={f.name} f={f} />
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        The fight loop: <span className="font-bold text-foreground">Select Fighter → Fight CPU → Win → Earn 10 XP → Accumulate → Activate 1,000-XP batches</span>
      </p>
    </section>
  );
}

function XpSection() {
  const flow = ["100 CPU wins", "1,000 XP", "0.1 SOL activation", "500 $TRENCH at TGE"];
  return (
    <section id="xp" className="scroll-mt-24 bg-abyss/60 py-24">
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
      </div>
    </section>
  );
}

function BattleBoardSection() {
  return (
    <section id="battle-board" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
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

function RoadmapSection() {
  return (
    <section id="roadmap" className="scroll-mt-24 bg-abyss/60 py-24">
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

function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-24">
      <SectionHeading kicker="Answers" title="Frequently asked questions" />
      <div className="space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-border bg-card px-6 py-4 open:border-primary/50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold text-foreground">
              {f.q}
              <span className="text-2xl font-black text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-abyss py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <img src={LOGO_URL} alt="Trench Brawl logo" className="h-14 w-14 rounded-2xl object-cover" />
          <p className="text-lg font-black uppercase tracking-wide text-foreground">
            Trench <span className="text-primary">Brawl</span>
          </p>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Fight · Outplay · Dominate
          </p>
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            This is a description of the planned Trench Brawl product. Features and mechanisms are
            subject to deployment, technical validation, market conditions, applicable law and the
            publication of binding terms. XP is a game score, not a transferable token. Until TGE and
            actual token delivery, displayed $TRENCH values are future token allocations, not current
            wallet balances. Nothing here is a price or profit promise.
          </p>
          <p className="text-xs text-muted-foreground">Official Product Documentation & Roadmap · Version 1.2 · October 2026</p>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <FightersSection />
        <XpSection />
        <BattleBoardSection />
        <RoadmapSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
