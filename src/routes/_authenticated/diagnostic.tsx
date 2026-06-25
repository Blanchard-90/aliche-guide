import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { QUIZ, PROFILES, type ProfileKey, recommendCareers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/diagnostic")({
  component: Diag,
});

function Diag() {
  const { user } = Route.useRouteContext();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<ProfileKey, number>>({
    Analytique: 0, Créatif: 0, Social: 0, Entrepreneurial: 0, Pratique: 0,
  });
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const total = QUIZ.length;
  const current = QUIZ[step];

  function pick(opt: typeof QUIZ[0]["options"][0]) {
    setScores((s) => {
      const next = { ...s };
      for (const k of Object.keys(opt.weights) as ProfileKey[]) {
        next[k] = (next[k] ?? 0) + (opt.weights[k] ?? 0);
      }
      return next;
    });
    if (step + 1 < total) setStep(step + 1);
    else finish();
  }

  async function finish() {
    setDone(true);
    setSaving(true);
    const sorted = (Object.entries(scores) as [ProfileKey, number][]).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0][0];
    const secondary = sorted[1][0];
    const recs = recommendCareers(scores);
    const { error } = await supabase.from("diagnostic_results").insert({
      user_id: user.id,
      dominant_profile: dominant,
      secondary_profile: secondary,
      scores: scores as never,
      strengths: [dominant, secondary],
      recommendations: recs.map((r) => r.slug) as never,
    });
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Diagnostic enregistré !");
  }

  function restart() {
    setStep(0);
    setScores({ Analytique: 0, Créatif: 0, Social: 0, Entrepreneurial: 0, Pratique: 0 });
    setDone(false);
  }

  if (done) {
    const sorted = (Object.entries(scores) as [ProfileKey, number][]).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0][0];
    const secondary = sorted[1][0];
    const chartData = PROFILES.map((p) => ({ profile: p, value: scores[p] }));
    return (
      <div className="p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto">
        <div className="rounded-3xl gradient-primary p-8 text-primary-foreground shadow-elevated relative overflow-hidden">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-white/20"><Sparkles className="h-3 w-3" /> Diagnostic terminé</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold">Ton profil dominant : {dominant}</h1>
          <p className="mt-2 opacity-90">Profil secondaire : <strong>{secondary}</strong> {saving && "• enregistrement..."}</p>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <div className="bg-card rounded-3xl p-6 border border-border">
            <h3 className="font-display font-bold">Radar de personnalité</h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <RadarChart data={chartData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="profile" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-card rounded-3xl p-6 border border-border">
            <h3 className="font-display font-bold">Tes forces</h3>
            <div className="mt-3 space-y-2.5">
              {sorted.map(([p, v]) => (
                <div key={p}>
                  <div className="flex justify-between text-sm mb-1"><span>{p}</span><span className="font-semibold text-primary">{Math.min(100, v * 8)}%</span></div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${Math.min(100, v * 8)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/recommendations"><Button className="gradient-primary text-primary-foreground border-0">Voir mes recommandations <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
              <Button variant="outline" onClick={restart}><RotateCcw className="mr-1.5 h-4 w-4" /> Refaire</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Diagnostic d'orientation</h1>
          <p className="text-sm text-muted-foreground">Question {step + 1} sur {total}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground">~10 minutes</span>
      </div>
      <Progress value={((step) / total) * 100} className="h-2" />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="mt-8 bg-card rounded-3xl p-7 border border-border shadow-soft"
        >
          <h2 className="text-xl font-display font-bold">{current.q}</h2>
          <div className="mt-5 grid gap-3">
            {current.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => pick(opt)}
                className="text-left p-4 rounded-2xl border border-border hover:border-primary hover:bg-accent transition group"
              >
                <span className="font-medium group-hover:text-primary">{opt.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      {step > 0 && (
        <Button variant="ghost" className="mt-4" onClick={() => setStep((s) => s - 1)}>← Précédent</Button>
      )}
    </div>
  );
}
