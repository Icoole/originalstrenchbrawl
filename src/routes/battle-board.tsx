import { createFileRoute } from "@tanstack/react-router";
import BattleBoardPage from "@/components/site/board";

export const Route = createFileRoute("/battle-board")({
  head: () => ({
    meta: [
      { title: "Battle Board — Rankings | Trench Brawl" },
      {
        name: "description",
        content:
          "The public Trench Brawl Battle Board ranks players by activated XP and shows fights, wins and projected $TRENCH allocation. Top 100 rewards arrive with wagered PvP in V2.",
      },
      { property: "og:title", content: "Battle Board — Rankings | Trench Brawl" },
      {
        property: "og:description",
        content:
          "Ranked by activated XP — never by merely earned XP. See match results and projected $TRENCH allocation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BattleBoardPage,
});
