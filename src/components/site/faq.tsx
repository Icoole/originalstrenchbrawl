import { SectionHeading } from "@/components/site/shared";

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

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-28">
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
