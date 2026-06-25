import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ALITCHÉ" },
      { name: "description", content: "Une question ? Une suggestion ? Contacte l'équipe ALITCHÉ." },
      { property: "og:title", content: "Contact ALITCHÉ" },
      { property: "og:description", content: "Nous répondons sous 24h." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);
  return (
    <PublicLayout>
      <section className="gradient-hero py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold">Parlons de ton <span className="text-gradient">avenir.</span></h1>
          <p className="mt-4 text-muted-foreground">Une question, un partenariat, ou une suggestion ? On t'écoute.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 grid md:grid-cols-[1fr_1.4fr] gap-8">
          <div className="space-y-5">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-soft">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-muted-foreground">hello@alitche.com</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-3xl p-6 border border-border shadow-soft">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold">Téléphone</div>
                  <div className="text-sm text-muted-foreground">+229 01 00 00 00 00</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-3xl p-6 border border-border shadow-soft">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold">Adresse</div>
                  <div className="text-sm text-muted-foreground">Cotonou, Bénin</div>
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                toast.success("Message envoyé ! Nous revenons vers toi sous 24h.");
                (e.target as HTMLFormElement).reset();
              }, 700);
            }}
            className="bg-card rounded-3xl p-7 border border-border shadow-soft space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nom complet</label>
                <Input required className="mt-1.5 h-11" placeholder="Aïcha K." />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" required className="mt-1.5 h-11" placeholder="toi@exemple.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Sujet</label>
              <Input required className="mt-1.5 h-11" placeholder="Une question d'orientation..." />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea required rows={6} className="mt-1.5" placeholder="Dis-nous tout..." />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full gradient-primary text-primary-foreground border-0">
              {loading ? "Envoi..." : <>Envoyer <Send className="ml-1.5 h-4 w-4" /></>}
            </Button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
