import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { BookOpen, FileText, Video, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Ressources — ALITCHÉ" },
      { name: "description", content: "Guides, articles et vidéos pour préparer ton orientation et ta vie étudiante." },
      { property: "og:title", content: "Ressources d'orientation ALITCHÉ" },
      { property: "og:description", content: "Tout pour préparer ta rentrée universitaire." },
    ],
  }),
  component: Resources,
});

const items = [
  { icon: BookOpen, t: "Guide du bachelier 2026", d: "Tout ce qu'il faut savoir avant de remplir ton dossier d'inscription.", tag: "Guide" },
  { icon: FileText, t: "Comprendre les filières scientifiques", d: "Maths, physique, biologie : quel parcours pour quel métier ?", tag: "Article" },
  { icon: Video, t: "Témoignage : 5 ans après mon BAC", d: "Komla raconte son parcours de l'IFRI à Tech Lead.", tag: "Vidéo" },
  { icon: Lightbulb, t: "10 erreurs d'orientation à éviter", d: "Apprends des erreurs des autres pour faire les bons choix.", tag: "Article" },
  { icon: BookOpen, t: "Réussir sa 1ère année à l'UAC", d: "Méthodes de travail, gestion du temps, et conseils pratiques.", tag: "Guide" },
  { icon: Video, t: "Visite virtuelle de l'EPAC", d: "Découvre les labs et le campus de l'École Polytechnique.", tag: "Vidéo" },
];

function Resources() {
  return (
    <PublicLayout>
      <section className="gradient-hero py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold">Apprends, prépare-toi, <span className="text-gradient">décide.</span></h1>
          <p className="mt-4 text-muted-foreground">Une bibliothèque de ressources sélectionnées pour les nouveaux bacheliers.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((r) => (
            <article key={r.t} className="bg-card rounded-3xl p-6 border border-border hover-lift cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl gradient-primary grid place-items-center text-primary-foreground">
                  <r.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{r.tag}</span>
              </div>
              <h3 className="mt-4 font-display font-bold">{r.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.d}</p>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
