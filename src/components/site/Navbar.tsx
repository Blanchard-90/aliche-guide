import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const items = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/how-it-works", label: t("nav.how") },
    { to: "/careers", label: t("nav.careers") },
    { to: "/resources", label: t("nav.resources") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              activeProps={{ className: "text-primary bg-accent" }}
              activeOptions={{ exact: i.to === "/" }}
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase text-muted-foreground hover:text-foreground hover:bg-accent transition"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang}
          </button>
          <Link to="/auth" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">{t("nav.login")}</Button>
          </Link>
          <Link to="/auth" search={{ tab: "signup" } as never}>
            <Button size="sm" className="gradient-primary shadow-soft text-primary-foreground border-0">
              {t("nav.register")}
            </Button>
          </Link>
          <button onClick={() => setOpen((s) => !s)} className="lg:hidden p-2 rounded-lg hover:bg-accent">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {items.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent"
                activeProps={{ className: "bg-accent text-primary" }}
                activeOptions={{ exact: i.to === "/" }}
              >
                {i.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="mt-2 px-3 py-2.5 text-left rounded-lg text-sm font-medium hover:bg-accent flex items-center gap-2"
            >
              <Globe className="h-4 w-4" /> {lang === "fr" ? "English" : "Français"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
