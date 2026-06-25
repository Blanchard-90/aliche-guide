import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { Brain, Target, Compass, Rocket, Bot, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "Comment ça marche — ALITCHÉ" },
      { name: "description", content: "Découvre les 5 étapes du parcours d'orientation ALITCHÉ : diagnostic, recommandations, exploration, simulation et coaching." },
      { property: "og:title", content: "Comment ALITCHÉ vous accompagne" },
      { property: "og:description", content: "Un parcours guidé en 5 étapes." },
    ],
  }),
  component: How,
});

const steps = [
  { icon: Brain, t: "Diagnostic intelligent", d: "30 questions sur tes intérêts, motivations, aptitudes et personnalité. Notre IA dresse ton profil dominant et secondaire.", bullets: ["~10 minutes", "Profil radar", "Forces & motivations"] },
  { icon: Target, t: "Recommandations sur-mesure", d: "Notre moteur d'IA croise ton profil avec 150+ filières et te propose celles où tu réussiras le mieux.", bullets: ["Score d'affinité", "Employabilité", "Justification claire"] },
  { icon: Compass, t: "Exploration approfondie", d: "Métiers, programmes, institutions (UAC, EPAC, INSTI, ENEAM, IFRI), salaires et débouchés réels.", bullets: ["Fiches métiers", "Filières détaillées", "Institutions du Bénin"] },
  { icon: Rocket, t: "Simulation du futur", d: "Visualise ton parcours sur 3, 5 et 10 ans avec une timeline interactive.", bullets: ["Roadmap animée", "Projections salariales", "Parcours alternatifs"] },
  { icon: Bot, t: "Coach IA + Mentors", d: "Pose tes questions à notre coach IA 24/7 et discute avec des conseillers experts via WhatsApp.", bullets: ["Chat illimité", "Mentors humains", "Réponses personnalisées"] },
];

function How() {
  return (
    <PublicLayout>
      <section className="gradient-hero py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold">Un parcours clair, du test à la <span className="text-gradient">décision</span>.</h1>
          <p className="mt-4 text-lg text-muted-foreground">5 étapes pensées pour t'amener du doute à la confiance.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 space-y-6">
          {steps.map((s, i) => (
            <div key={s.t} className="relative bg-card rounded-3xl p-8 border border-border shadow-soft grid md:grid-cols-[80px_1fr_auto] gap-6 items-center hover-lift">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl gradient-primary grid place-items-center text-primary-foreground">
                  <s.icon className="h-7 w-7" />
                </div>
                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-card border-2 border-primary grid place-items-center text-xs font-bold text-primary">{i + 1}</div>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">{s.t}</h3>
                <p className="mt-1.5 text-muted-foreground">{s.d}</p>
              </div>
              <ul className="space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-success shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/auth" search={{ tab: "signup" } as never}>
            <Button size="lg" className="gradient-primary text-primary-foreground border-0 h-12 px-7">
              Démarrer mon diagnostic <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
