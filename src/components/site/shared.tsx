import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/trench-brawl-logo.jpg.asset.json";

const LOGO_URL = logoAsset.url;

export const NAV_LINKS = [
  { label: "Fighters", to: "/fighters" },
  { label: "XP Program", to: "/xp-program" },
  { label: "Battle Board", to: "/battle-board" },
  { label: "Roadmap", to: "/roadmap" },
  { label: "FAQ", to: "/faq" },
] as const;

export function SectionHeading({
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

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-semibold text-foreground/90">
      {children}
    </span>
  );
}

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="panel-glass mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Trench Brawl logo" className="h-10 w-10 rounded-xl object-cover" />
          <span className="text-base font-black uppercase tracking-wide whitespace-nowrap text-foreground sm:text-lg">
            Trench <span className="text-primary">Brawl</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-sm font-bold transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/fighters"
          className="rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground transition-transform hover:scale-105 sm:px-5"
        >
          Enter the Trench
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
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
          <nav className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="text-sm font-bold transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
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
