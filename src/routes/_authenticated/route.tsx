import { createFileRoute, Outlet, redirect, Link, useRouter, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import {
  LayoutDashboard, Brain, Target, Compass, Rocket, Bot, Users, Settings, Shield,
  LogOut, Menu, X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthedLayout,
});

const NAV = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/diagnostic", label: "Mon Diagnostic", icon: Brain },
  { to: "/recommendations", label: "Recommandations", icon: Target },
  { to: "/explorer", label: "Métiers & Filières", icon: Compass },
  { to: "/simulator", label: "Simulateur", icon: Rocket },
  { to: "/coach", label: "IA Coach", icon: Bot },
  { to: "/mentors", label: "Conseillers", icon: Users },
  { to: "/settings", label: "Paramètres", icon: Settings },
  { to: "/admin", label: "Admin", icon: Shield },
] as const;

function AuthedLayout() {
  const { user } = Route.useRouteContext();
  const router = useRouter();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMobileOpen(false), [pathname]);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    toast.success("À bientôt !");
    router.navigate({ to: "/auth", replace: true });
  }

  const initials = (user.user_metadata?.full_name as string | undefined)?.split(" ").map((s) => s[0]).slice(0, 2).join("") ?? user.email?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 flex items-center justify-between">
          <Logo />
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-sidebar-accent">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV.map((i) => (
            <Link key={i.to} to={i.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition"
              activeProps={{ className: "gradient-primary text-primary-foreground shadow-soft" }}
            >
              <i.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{i.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-sidebar-accent/60">
            <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{user.user_metadata?.full_name || "Étudiant"}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut} aria-label="Déconnexion">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border h-14 flex items-center justify-between px-4">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-accent">
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
          <div className="w-8" />
        </header>
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
