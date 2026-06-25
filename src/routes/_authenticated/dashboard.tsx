import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Brain, Target, Compass, Rocket, Bot, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dash,
});

function Dash() {
  const { user } = Route.useRouteContext();
  const { data: diag } = useQuery({
    queryKey: ["diagnostic", user.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("diagnostic_results").select("*").eq("user_id", user.id)
        .order("created_at", { ascending: false }).limit(1).maybeSingle();
      return data;
    },
  });

  const completed = !!diag;
  const score = completed ? 100 : 0;
  const name = (user.user_metadata?.full_name as string)?.split(" ")[0] || "Étudiant";

  const widgets = [
    { icon: Brain, label: "Diagnostic", value: completed ? "Terminé" : "À faire", to: "/diagnostic", accent: completed ? "success" : "warning" },
    { icon: Target, label: "Recommandations", value: completed ? "Voir" : "—", to: "/recommendations", accent: "primary" },
    { icon: Compass, label: "Métiers explorés", value: "8+", to: "/explorer", accent: "secondary" },
    { icon: Rocket, label: "Simulations", value: "0", to: "/simulator", accent: "primary" },
  ] as const;

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8">
      <div className="rounded-3xl gradient-primary p-8 text-primary-foreground relative overflow-hidden shadow-elevated">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-white/20"><Sparkles className="h-3 w-3" /> Bienvenue</span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold">Bon retour, {name} 👋</h1>
            <p className="mt-2 opacity-90 max-w-xl">Voici un aperçu de ton parcours d'orientation. Continue ta progression pour débloquer des recommandations sur-mesure.</p>
            <div className="mt-5 max-w-md">
              <div className="flex items-center justify-between text-xs mb-1.5"><span>Progression</span><span>{score}%</span></div>
              <Progress value={score} className="h-2 bg-white/20" />
            </div>
          </div>
          {!completed && (
            <Link to="/diagnostic">
              <Button size="lg" variant="secondary" className="font-semibold">Démarrer le diagnostic <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((w) => (
          <Link key={w.label} to={w.to} className="bg-card rounded-3xl p-5 border border-border hover-lift">
            <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center text-primary-foreground mb-3"><w.icon className="h-5 w-5" /></div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{w.label}</div>
            <div className="mt-1 text-xl font-display font-bold">{w.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card rounded-3xl p-6 border border-border">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-display font-bold">Ton parcours ALITCHÉ</h2>
            <Link to="/coach" className="text-sm text-primary inline-flex items-center gap-1">Demander à l'IA <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <ol className="space-y-3">
            {[
              { t: "Diagnostic", to: "/diagnostic", done: completed },
              { t: "Recommandations", to: "/recommendations", done: completed },
              { t: "Exploration", to: "/explorer", done: false },
              { t: "Simulation", to: "/simulator", done: false },
              { t: "Coaching", to: "/coach", done: false },
            ].map((s, i) => (
              <li key={s.t} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40">
                <div className={`h-8 w-8 rounded-full grid place-items-center text-xs font-bold ${s.done ? "bg-success text-success-foreground" : "bg-card border border-border text-muted-foreground"}`}>
                  {i + 1}
                </div>
                <div className="flex-1 font-medium">{s.t}</div>
                <Link to={s.to} className="text-sm text-primary">Ouvrir →</Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-card rounded-3xl p-6 border border-border">
          <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center text-primary-foreground mb-3"><Bot className="h-5 w-5" /></div>
          <h3 className="font-display font-bold">Coach IA ALITCHÉ</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">Pose-lui toutes tes questions d'orientation, à tout moment.</p>
          <Link to="/coach"><Button className="mt-4 w-full gradient-primary text-primary-foreground border-0">Démarrer une conversation</Button></Link>
        </div>
      </div>
    </div>
  );
}
