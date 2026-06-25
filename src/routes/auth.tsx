import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    tab: s.tab === "signup" ? "signup" : "signin",
  }),
  head: () => ({
    meta: [
      { title: "Connexion — ALITCHÉ" },
      { name: "description", content: "Connecte-toi ou crée ton compte ALITCHÉ pour démarrer ton parcours d'orientation." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const { tab } = Route.useSearch();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav({ to: "/dashboard" });
    });
  }, [nav]);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password"));
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Bienvenue !");
    nav({ to: "/dashboard" });
  }

  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const parsed = z.object({
      email: z.string().email("Email invalide"),
      password: z.string().min(6, "6 caractères minimum"),
      full_name: z.string().min(2, "Nom requis"),
    }).safeParse({ email: f.get("email"), password: f.get("password"), full_name: f.get("full_name") });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: { full_name: parsed.data.full_name },
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin + "/dashboard" : undefined,
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Compte créé ! Vérifie tes emails si nécessaire.");
    nav({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:block relative gradient-primary overflow-hidden">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative h-full flex flex-col p-12 text-primary-foreground">
          <Logo light />
          <div className="my-auto max-w-md">
            <h2 className="text-4xl font-display font-extrabold leading-tight">
              Choisis ton avenir avec confiance.
            </h2>
            <p className="mt-4 opacity-90">
              Diagnostic intelligent, recommandations IA, simulation de carrière et coaching personnalisé — tout ce qu'il te faut pour décider.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              {["Test d'orientation en 10 minutes", "Recommandations sur-mesure", "Simulation 3, 5 et 10 ans", "Coach IA 24/7"].map((s) => (
                <div key={s} className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs opacity-70">© ALITCHÉ — Cotonou, Bénin</div>
        </div>
      </div>
      <div className="flex flex-col p-6 sm:p-10">
        <div className="flex justify-between items-center">
          <div className="lg:hidden"><Logo /></div>
          <Link to="/" className="ml-auto text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </div>
        <div className="my-auto max-w-sm w-full mx-auto">
          <h1 className="text-3xl font-display font-extrabold">Bienvenue 👋</h1>
          <p className="mt-2 text-muted-foreground text-sm">Connecte-toi ou crée ton compte pour commencer.</p>
          <Tabs defaultValue={tab} className="mt-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-5">
              <form onSubmit={signIn} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" type="email" required className="mt-1.5 h-11" placeholder="toi@exemple.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Mot de passe</label>
                  <Input name="password" type="password" required className="mt-1.5 h-11" />
                </div>
                <Button type="submit" disabled={loading} size="lg" className="w-full gradient-primary text-primary-foreground border-0">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Se connecter"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="mt-5">
              <form onSubmit={signUp} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nom complet</label>
                  <Input name="full_name" required className="mt-1.5 h-11" placeholder="Aïcha K." />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" type="email" required className="mt-1.5 h-11" placeholder="toi@exemple.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Mot de passe</label>
                  <Input name="password" type="password" required minLength={6} className="mt-1.5 h-11" />
                </div>
                <Button type="submit" disabled={loading} size="lg" className="w-full gradient-primary text-primary-foreground border-0">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Créer mon compte"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
