import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/shared";
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

export default function FightersPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-28">
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
      <p className="mt-8 text-center">
        <Link
          to="/xp-program"
          className="rounded-full bg-primary px-7 py-3 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
        >
          See how XP becomes $TRENCH
        </Link>
      </p>
    </section>
  );
}
