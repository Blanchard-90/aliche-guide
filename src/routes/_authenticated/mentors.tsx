import { createFileRoute } from "@tanstack/react-router";
import { MENTORS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award, Clock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/mentors")({
  component: Mentors,
});

function Mentors() {
  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      <div className="rounded-3xl gradient-primary p-7 text-primary-foreground shadow-elevated">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Parler à un conseiller</h1>
        <p className="mt-1.5 opacity-90 text-sm">Des mentors humains, joignables sur WhatsApp, prêts à t'accompagner.</p>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        {MENTORS.map((m) => (
          <div key={m.name} className="bg-card rounded-3xl p-6 border border-border hover-lift">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl gradient-primary grid place-items-center text-3xl shrink-0">{m.emoji}</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />{m.years} ans d'expérience</span>
                  <span className={`inline-flex items-center gap-1 ${m.available ? "text-success" : "text-warning"}`}>
                    <Clock className="h-3 w-3" /> {m.available ? "Disponible" : "Occupé"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <a href={`https://wa.me/22900000000?text=Bonjour%20${encodeURIComponent(m.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full text-white border-0" style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="mr-1.5 h-4 w-4" /> WhatsApp
                </Button>
              </a>
              <Button variant="outline" className="flex-1">Voir profil</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
