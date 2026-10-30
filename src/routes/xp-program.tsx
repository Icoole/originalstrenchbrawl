import { createFileRoute } from "@tanstack/react-router";
import XpPage from "@/components/site/xp";

export const Route = createFileRoute("/xp-program")({
  head: () => ({
    meta: [
      { title: "XP Program — Earn. Activate. Claim. | Trench Brawl" },
      {
        name: "description",
        content:
          "How Trench Brawl XP works: 10 XP per CPU win, 1,000-XP activation batches, the 24-hour claim window, 0.1 SOL activation and 500 $TRENCH at TGE.",
      },
      { property: "og:title", content: "XP Program — Earn. Activate. Claim. | Trench Brawl" },
      {
        property: "og:description",
        content:
          "100 CPU wins → 1,000 XP → 0.1 SOL activation → 500 $TRENCH at TGE. XP earned is not XP activated is not $TRENCH delivered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: XpPage,
});
