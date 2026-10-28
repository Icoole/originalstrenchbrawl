import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Trench Brawl — Fight. Outplay. Dominate." },
      {
        name: "description",
        content:
          "Trench Brawl is a Solana-native meme fighting game: 14 fighters, CPU battles, XP activation and $TRENCH rewards at TGE. PvP and wagering arrive in V2.",
      },
      { property: "og:title", content: "Trench Brawl — Fight. Outplay. Dominate." },
      {
        property: "og:description",
        content:
          "Choose your fighter. Fight the CPU. Earn XP. Activate your rewards. V1 launches with 14 fighters; PvP wagering comes in V2.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});
