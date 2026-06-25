import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Building2, MapPin, TrendingUp, GraduationCap } from "lucide-react";
import { useState } from "react";
import { CAREERS, INSTITUTIONS } from "@/lib/data";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Métiers & Filières — ALITCHÉ" },
      { name: "description", content: "Explore les métiers, les filières et les institutions du Bénin : UAC, EPAC, INSTI, ENEAM, IFRI." },
      { property: "og:title", content: "Métiers & Filières" },
      { property: "og:description", content: "Découvre 8+ métiers, 150+ filières, 5 institutions de référence." },
    ],
  }),
  component: Careers,
});

function Careers() {
  const [q, setQ] = useState("");
  const filtered = CAREERS.filter((c) =>
    [c.title, c.field, c.description].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <PublicLayout>
      <section className="gradient-hero py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold">Explore <span className="text-gradient">métiers, filières & institutions</span></h1>
          <p className="mt-4 text-muted-foreground">Tout ce qu'il faut savoir pour décider en connaissance de cause.</p>
          <div className="mt-7 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un métier, une filière, un domaine..."
              className="h-12 pl-11 rounded-2xl bg-card shadow-soft border-border"
            />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Métiers populaires</h2>
            <span className="text-sm text-muted-foreground">{filtered.length} résultats</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <div key={c.slug} className="group bg-card rounded-3xl p-6 border border-border hover-lift">
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{c.emoji}</div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{c.field}</span>
                </div>
                <h3 className="mt-4 text-lg font-display font-bold">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-success" /> {c.growth}</span>
                  <span className="inline-flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" /> {c.programs.length} filières</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">{Intl.NumberFormat("fr-FR").format(c.salaryMin)} – {Intl.NumberFormat("fr-FR").format(c.salaryMax)} F</span>
                  <Link to="/auth" search={{ tab: "signup" } as never} className="text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Voir plus <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-display font-bold">Institutions du Bénin</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {INSTITUTIONS.map((i) => (
              <div key={i.name} className="bg-card rounded-2xl p-5 border border-border hover-lift">
                <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground mb-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="font-display font-bold">{i.name}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{i.full}</div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{i.city}</span>
                  <span>•</span>
                  <span>{i.programs} filières</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">Veux-tu des recommandations personnalisées ?</h2>
          <p className="mt-3 text-muted-foreground">Lance ton diagnostic en 10 minutes et reçois les métiers parfaitement alignés avec ton profil.</p>
          <Link to="/auth" search={{ tab: "signup" } as never}>
            <Button size="lg" className="mt-6 gradient-primary text-primary-foreground border-0">
              Démarrer mon diagnostic <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
