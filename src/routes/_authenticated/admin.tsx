import { createFileRoute } from "@tanstack/react-router";
import { Users, GraduationCap, Bot, BarChart3, Building2, Briefcase } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { CAREERS, INSTITUTIONS, MENTORS } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/admin")({
  component: Admin,
});

const ANALYTICS = [
  { name: "Jan", users: 120, diag: 80 },
  { name: "Fév", users: 220, diag: 160 },
  { name: "Mar", users: 380, diag: 290 },
  { name: "Avr", users: 520, diag: 410 },
  { name: "Mai", users: 730, diag: 590 },
  { name: "Juin", users: 980, diag: 820 },
];

function Admin() {
  const kpis = [
    { icon: Users, label: "Utilisateurs actifs", value: "2 184", trend: "+18%" },
    { icon: GraduationCap, label: "Diagnostics terminés", value: "1 612", trend: "+22%" },
    { icon: Bot, label: "Conversations IA", value: "8 932", trend: "+34%" },
    { icon: BarChart3, label: "Conversion onboarding", value: "74%", trend: "+5pts" },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Admin — Vue d'ensemble</h1>
        <p className="text-muted-foreground mt-1">Performance globale de la plateforme ALITCHÉ.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card rounded-3xl p-5 border border-border">
            <div className="flex items-start justify-between">
              <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center text-primary-foreground"><k.icon className="h-5 w-5" /></div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success/15 text-success">{k.trend}</span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground uppercase tracking-wider">{k.label}</div>
            <div className="text-2xl font-display font-extrabold">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card rounded-3xl p-6 border border-border">
          <h2 className="font-display font-bold">Croissance mensuelle</h2>
          <div className="mt-3 h-64">
            <ResponsiveContainer>
              <BarChart data={ANALYTICS}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="users" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="diag" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card rounded-3xl p-6 border border-border">
          <h2 className="font-display font-bold flex items-center gap-2"><Briefcase className="h-4 w-4" /> Top métiers</h2>
          <ul className="mt-3 space-y-2.5">
            {CAREERS.slice(0, 6).map((c, i) => (
              <li key={c.slug} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40">
                <span className="text-sm truncate">{c.emoji} {c.title}</span>
                <span className="text-xs font-semibold text-primary">{900 - i * 110}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card rounded-3xl p-6 border border-border">
          <h2 className="font-display font-bold flex items-center gap-2"><Building2 className="h-4 w-4" /> Institutions partenaires</h2>
          <table className="mt-3 w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr><th className="text-left py-2">Nom</th><th className="text-left">Ville</th><th className="text-right">Filières</th></tr>
            </thead>
            <tbody>
              {INSTITUTIONS.map((i) => (
                <tr key={i.name} className="border-t border-border">
                  <td className="py-2.5 font-medium">{i.name}</td>
                  <td>{i.city}</td>
                  <td className="text-right">{i.programs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-card rounded-3xl p-6 border border-border">
          <h2 className="font-display font-bold">Mentors actifs</h2>
          <ul className="mt-3 space-y-2.5">
            {MENTORS.map((m) => (
              <li key={m.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40">
                <div className="text-2xl">{m.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{m.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{m.role}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${m.available ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                  {m.available ? "Actif" : "Occupé"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
