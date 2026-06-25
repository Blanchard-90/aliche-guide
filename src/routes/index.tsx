import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Brain, Target, Compass, Rocket, Bot, Check,
  TrendingDown, Clock, GraduationCap, Briefcase, Star, Quote, Play,
} from "lucide-react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ALITCHÉ — Choisis ton avenir avec confiance" },
      { name: "description", content: "Test d'orientation intelligent, recommandations IA, simulateur de carrière et coach personnel pour les bacheliers d'Afrique de l'Ouest." },
      { property: "og:title", content: "ALITCHÉ — Orientation intelligente" },
      { property: "og:description", content: "Découvre, explore, simule et choisis avec confiance." },
    ],
  }),
  component: Home,
});

function FloatingCard({ icon: Icon, label, value, delay = 0, className = "" }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute bg-card rounded-2xl shadow-elevated border border-border p-3 flex items-center gap-3 ${className}`}
    >
      <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold truncate">{value}</div>
      </div>
    </motion.div>
  );
}

function Home() {
  const { t } = useI18n();

  const problems = [
    { icon: Compass, t: t("problem.s1.t"), d: t("problem.s1.d"), stat: "67%", color: "text-destructive" },
    { icon: TrendingDown, t: t("problem.s2.t"), d: t("problem.s2.d"), stat: "33%", color: "text-warning" },
    { icon: Clock, t: t("problem.s3.t"), d: t("problem.s3.d"), stat: "2 ans", color: "text-warning" },
    { icon: Briefcase, t: t("problem.s4.t"), d: t("problem.s4.d"), stat: "55%", color: "text-destructive" },
  ];

  const features = [
    { icon: Brain, t: t("feat.1.t"), d: t("feat.1.d") },
    { icon: Target, t: t("feat.2.t"), d: t("feat.2.d") },
    { icon: Compass, t: t("feat.3.t"), d: t("feat.3.d") },
    { icon: Rocket, t: t("feat.4.t"), d: t("feat.4.d") },
    { icon: Bot, t: t("feat.5.t"), d: t("feat.5.d") },
  ];

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05]">
              {t("hero.title").split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-gradient">{t("hero.title").split(" ").slice(-2).join(" ")}</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth" search={{ tab: "signup" } as never}>
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-soft h-12 px-6 text-base">
                  {t("hero.cta.primary")} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="h-12 px-6 text-base">
                  <Play className="mr-1.5 h-4 w-4" /> {t("hero.cta.secondary")}
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full gradient-primary border-2 border-background grid place-items-center text-[10px] font-bold text-primary-foreground">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-warning">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <div className="text-xs">+2 000 bacheliers accompagnés</div>
              </div>
            </div>
          </motion.div>

          {/* Hero illustration */}
          <div className="relative h-[460px] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
              className="absolute inset-0 rounded-3xl gradient-primary p-8 shadow-elevated overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="relative h-full grid place-items-center">
                <div className="bg-white/95 rounded-2xl p-6 w-72 shadow-elevated">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full gradient-primary grid place-items-center text-primary-foreground font-bold">AK</div>
                    <div>
                      <div className="font-semibold text-foreground">Aïcha K.</div>
                      <div className="text-xs text-muted-foreground">BAC D • Cotonou</div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {["Analytique", "Créative", "Sociale"].map((p, i) => (
                      <div key={p}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground">{p}</span>
                          <span className="font-semibold text-primary">{[92, 78, 65][i]}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }} animate={{ width: `${[92, 78, 65][i]}%` }}
                            transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                            className="h-full gradient-primary rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <FloatingCard icon={Brain} label={t("card.profile")} value="Analytique" delay={0.4} className="-top-3 -left-3 w-52" />
            <FloatingCard icon={GraduationCap} label={t("card.field")} value="Informatique" delay={0.6} className="top-32 -right-6 w-52" />
            <FloatingCard icon={Briefcase} label={t("card.career")} value="Data Scientist" delay={0.8} className="bottom-20 -left-8 w-56" />
            <FloatingCard icon={Sparkles} label={t("card.score")} value="95% Match" delay={1} className="-bottom-3 right-4 w-44" />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold">{t("problem.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("problem.subtitle")}</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problems.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-3xl p-6 border border-border hover-lift"
              >
                <div className={`h-12 w-12 rounded-2xl bg-muted grid place-items-center mb-4 ${p.color}`}>
                  <p.icon className="h-6 w-6" />
                </div>
                <div className={`text-3xl font-display font-extrabold ${p.color}`}>{p.stat}</div>
                <h3 className="mt-2 font-semibold">{p.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Notre méthode
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold">{t("solution.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("solution.subtitle")}</p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {features.map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-card rounded-3xl p-6 border border-border hover-lift"
              >
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full gradient-primary grid place-items-center text-xs font-bold text-primary-foreground shadow-soft">
                  {i + 1}
                </div>
                <div className="h-12 w-12 rounded-2xl gradient-primary grid place-items-center text-primary-foreground mb-4">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold">{f.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social proof */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl gradient-primary p-10 sm:p-14 text-primary-foreground relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <Quote className="h-10 w-10 opacity-60" />
            <p className="mt-4 text-xl sm:text-2xl font-display leading-snug max-w-3xl">
              « Grâce à ALITCHÉ, j'ai découvert que j'étais faite pour la Data Science. Aujourd'hui je suis en 2ème année à l'IFRI et passionnée. »
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 grid place-items-center font-bold">FH</div>
              <div>
                <div className="font-semibold">Fatou H.</div>
                <div className="text-sm opacity-80">Étudiante IFRI — Cotonou</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Prêt à découvrir ton avenir ?</h2>
          <p className="mt-3 text-muted-foreground">Crée ton compte gratuitement et lance ton diagnostic en moins de 10 minutes.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/auth" search={{ tab: "signup" } as never}>
              <Button size="lg" className="gradient-primary text-primary-foreground border-0 h-12 px-7">
                {t("cta.start")} <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/careers">
              <Button size="lg" variant="outline" className="h-12 px-7">{t("cta.explore")}</Button>
            </Link>
          </div>
          <div className="mt-6 text-sm text-muted-foreground flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> 100% gratuit</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> Sans engagement</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> Données protégées</span>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
