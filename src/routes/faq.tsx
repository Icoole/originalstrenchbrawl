import { createFileRoute } from "@tanstack/react-router";
import FaqPage from "@/components/site/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Frequently Asked Questions | Trench Brawl" },
      {
        name: "description",
        content:
          "Answers on Trench Brawl XP, activation, the 24-hour claim window, Battle Board ranking, $TRENCH caps and where activation deposits go.",
      },
      { property: "og:title", content: "FAQ — Frequently Asked Questions | Trench Brawl" },
      {
        property: "og:description",
        content:
          "V1 is CPU-only and non-wagered. XP is earned per CPU win and activated in 1,000-XP batches. NFTs are not part of the plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});
