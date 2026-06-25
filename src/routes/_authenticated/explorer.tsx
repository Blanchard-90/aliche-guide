import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CAREERS, INSTITUTIONS } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search, Building2, MapPin, TrendingUp, ArrowRight, Briefcase } from "lucide-react";

export const Route = createFileRoute("/_authenticated/explorer")({
  component: Explorer,
});

function Explorer() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(CAREERS[0]);
  const filtered = CAREERS.filter((c) => [c.title, c.field].join(" ").toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Métiers, Filières & Institutions</h1>
      <p className="mt-1 text-muted-foreground">Explore plus de {CAREERS.length} métiers et leurs débouchés réels au Bénin.</p>

      <div className="mt-6 grid lg:grid-cols-[360px_1fr] gap-5">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher..." className="h-11 pl-10 rounded-2xl" />
          </div>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {filtered.map((c) => (
              <button key={c.slug} onClick={() => setSelected(c)}
                className={`w-full text-left p-4 rounded-2xl border transition ${selected.slug === c.slug ? "border-primary bg-accent" : "border-border bg-card hover:border-primary/40"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.field}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-5xl">{selected.emoji}</div>
              <h2 className="mt-3 text-2xl font-display font-extrabold">{selected.title}</h2>
              <span className="mt-1 inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{selected.field}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Salaire moyen</div>
              <div className="text-lg font-display font-bold text-gradient">
                {Intl.NumberFormat("fr-FR").format(selected.salaryMin)} – {Intl.NumberFormat("fr-FR").format(selected.salaryMax)} F
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-success mt-1"><TrendingUp className="h-3 w-3" /> {selected.growth}</span>
            </div>
          </div>

          <p className="mt-5 text-muted-foreground">{selected.description}</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="font-display font-semibold mb-2">Missions</h3>
              <ul className="space-y-1.5 text-sm">
                {selected.missions.map((m) => (
                  <li key={m} className="flex gap-2"><span className="text-primary">•</span> {m}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2">Compétences clés</h3>
              <div className="flex flex-wrap gap-2">
                {selected.skills.map((s) => (
                  <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Briefcase className="h-4 w-4" /> Filières recommandées</h3>
            <div className="flex flex-wrap gap-2">
              {selected.programs.map((p) => (
                <span key={p} className="text-sm px-3 py-1.5 rounded-xl bg-accent text-accent-foreground font-medium">{p}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Building2 className="h-4 w-4" /> Institutions au Bénin</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {INSTITUTIONS.filter((i) => selected.institutions.some((x) => i.name.includes(x.replace(/.*\//, ""))) ).map((i) => (
                <div key={i.name} className="rounded-2xl p-4 border border-border flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground"><Building2 className="h-5 w-5" /></div>
                  <div className="min-w-0">
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{i.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Link to="/simulator" search={{ career: selected.slug } as never} className="text-primary font-medium inline-flex items-center gap-1.5">
              Simuler mon parcours <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
