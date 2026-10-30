import { createFileRoute } from "@tanstack/react-router";
import RoadmapPage from "@/components/site/roadmap";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — Sequenced by Capability | Trench Brawl" },
      {
        name: "description",
        content:
          "The four Trench Brawl phases: playable V1, XP activation with Solana, token preparation and TGE, and V2 PvP with $TRENCH wagering.",
      },
      { property: "og:title", content: "Roadmap — Sequenced by Capability | Trench Brawl" },
      {
        property: "og:description",
        content:
          "Milestones ordered by what ships: playable V1, XP activation + Solana, $TRENCH at TGE, and V2 PvP wagering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoadmapPage,
});
