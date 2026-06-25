import { createFileRoute } from "@tanstack/react-router";
import { CAREERS } from "@/lib/data";
import { useState } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rocket, TrendingUp, Trophy, GraduationCap, Briefcase, Crown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/_authenticated/simulator")({
  validateSearch: (s: Record<string, unknown>) => ({ career: typeof s.career === "string" ? s.career : "data-scientist" }),
  component: Simulator,
});

const HORIZONS = [3, 5, 10] as const;

function makeTimeline(c: (typeof CAREERS)[number]) {
  const baseSalary = c.salaryMin;
  const top = c.salaryMax;
  return [
    { year: 0, label: "Bac", role: `Bac ${c.field.includes("Tech") ? "D / C" : "Général"}`, salary: 0, icon: GraduationCap },
    { year: 1, label: "Licence", role: c.programs[0], salary: 0, icon: GraduationCap },
    { year: 4, label: "Junior", role: `${c.title} Junior`, salary: baseSalary, icon: Briefcase },
    { year: 7, label: "Confirmé", role: `${c.title} Confirmé`, salary: Math.round((baseSalary + top) / 2), icon: TrendingUp },
    { year: 10, label: "Senior / Lead", role: `${c.title} Senior`, salary: top, icon: Trophy },
    { year: 14, label: "Direction", role: `Head of / Entrepreneur`, salary: Math.round(top * 1.4), icon: Crown },
  ];
}

function Simulator() {
  const { career } = Route.useSearch();
  const nav = Route.useNavigate();
  const [horizon, setHorizon] = useState<3 | 5 | 10>(10);
  const selected = CAREERS.find((c) => c.slug === career) ?? CAREERS[0];
  const timeline = makeTimeline(selected).filter((s) => s.year <= horizon + 4);
  const chart = timeline.filter((t) => t.salary > 0).map((t) => ({ year: `An ${t.year}`, salaire: t.salary }));

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto">
      <div className="rounded-3xl gradient-primary p-7 text-primary-foreground shadow-elevated relative overflow-hidden">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-white/20"><Rocket className="h-3 w-3" /> Simulateur de carrière</span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-display font-extrabold">Visualise ton avenir : {selected.title}</h1>
            <p className="mt-1 opacity-90 text-sm">Roadmap interactive, projections salariales et milestones clés.</p>
          </div>
          <div className="flex gap-3">
            <Select value={selected.slug} onValueChange={(v) => nav({ search: { career: v } })}>
              <SelectTrigger className="w-56 bg-white/15 border-white/20 text-primary-foreground"><SelectValue /></SelectTrigger>
              <SelectContent>{CAREERS.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.emoji} {c.title}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={String(horizon)} onValueChange={(v) => setHorizon(Number(v) as 3 | 5 | 10)}>
              <SelectTrigger className="w-32 bg-white/15 border-white/20 text-primary-foreground"><SelectValue /></SelectTrigger>
              <SelectContent>{HORIZONS.map((h) => <SelectItem key={h} value={String(h)}>{h} ans</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-5">
        {/* Timeline */}
        <div className="bg-card rounded-3xl p-7 border border-border">
          <h2 className="font-display font-bold mb-5">Roadmap</h2>
          <div className="relative pl-8">
            <div className="absolute left-3 top-1 bottom-1 w-px bg-gradient-to-b from-primary via-secondary to-success" />
            <ol className="space-y-5">
              {timeline.map((s, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="relative"
                >
                  <div className="absolute -left-8 top-1 h-6 w-6 rounded-full gradient-primary border-4 border-background grid place-items-center text-primary-foreground">
                    <s.icon className="h-3 w-3" />
                  </div>
                  <div className="bg-muted/40 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">An {s.year} • {s.label}</div>
                      <div className="font-semibold truncate">{s.role}</div>
                    </div>
                    <div className="text-right shrink-0">
                      {s.salary > 0 ? (
                        <div className="text-sm font-display font-bold text-gradient">{Intl.NumberFormat("fr-FR").format(s.salary)} F</div>
                      ) : (
                        <div className="text-xs text-muted-foreground">Formation</div>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-card rounded-3xl p-6 border border-border">
            <h3 className="font-display font-bold">Projection salariale</h3>
            <div className="mt-3 h-48">
              <ResponsiveContainer>
                <LineChart data={chart}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="year" stroke="var(--color-muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickFormatter={(v) => `${(v as number) / 1000}k`} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} formatter={(v: number) => Intl.NumberFormat("fr-FR").format(v) + " F"} />
                  <Line type="monotone" dataKey="salaire" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-card rounded-3xl p-6 border border-border">
            <h3 className="font-display font-bold">Compétences acquises</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-medium">{s}</span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl p-6 gradient-primary text-primary-foreground">
            <Trophy className="h-6 w-6" />
            <h3 className="mt-2 font-display font-bold">Parcours alternatifs</h3>
            <ul className="mt-2 text-sm space-y-1.5 opacity-95">
              <li>• Spécialisation à l'international</li>
              <li>• Entrepreneuriat dans le {selected.field}</li>
              <li>• Recherche et enseignement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
