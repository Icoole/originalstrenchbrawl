import { createFileRoute } from "@tanstack/react-router";
import FightersPage from "@/components/site/fighters";

export const Route = createFileRoute("/fighters")({
  head: () => ({
    meta: [
      { title: "Fighters — Choose Your Fighter | Trench Brawl" },
      {
        name: "description",
        content:
          "All 14 Trench Brawl launch fighters: Doge, Pepe, Bonk, Floki, WIF, Pengu, Cashcat, Zcat, Pnut, Shiba, Super Inu, Purr, Mog and Turbo. Flip each card for the fighter's profile.",
      },
      { property: "og:title", content: "Fighters — Choose Your Fighter | Trench Brawl" },
      {
        property: "og:description",
        content:
          "Every fighter has its own card: portrait on the front, tag and profile on the back. 10 XP per CPU win in V1.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FightersPage,
});
