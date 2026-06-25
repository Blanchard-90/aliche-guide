import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({
  component: Settings,
});

function Settings() {
  const { user } = Route.useRouteContext();
  const { data: profile, refetch } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });
  const [form, setForm] = useState({ full_name: "", bac_series: "", bac_year: "", city: "" });
  useEffect(() => {
    if (profile) setForm({
      full_name: profile.full_name ?? "",
      bac_series: profile.bac_series ?? "",
      bac_year: String(profile.bac_year ?? ""),
      city: profile.city ?? "",
    });
  }, [profile]);

  async function save() {
    const { error } = await supabase.from("profiles").update({
      full_name: form.full_name,
      bac_series: form.bac_series,
      bac_year: form.bac_year ? Number(form.bac_year) : null,
      city: form.city,
      updated_at: new Date().toISOString(),
    }).eq("id", user.id);
    if (error) toast.error(error.message);
    else { toast.success("Profil mis à jour"); refetch(); }
  }

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Paramètres</h1>
      <p className="text-muted-foreground mt-1">Complète ton profil pour des recommandations encore plus précises.</p>
      <div className="mt-6 bg-card rounded-3xl p-7 border border-border shadow-soft space-y-5">
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input value={user.email ?? ""} disabled className="mt-1.5 h-11" />
        </div>
        <div>
          <label className="text-sm font-medium">Nom complet</label>
          <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1.5 h-11" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Série du BAC</label>
            <Select value={form.bac_series} onValueChange={(v) => setForm({ ...form, bac_series: v })}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Choisir..." /></SelectTrigger>
              <SelectContent>
                {["A", "B", "C", "D", "E", "F", "G", "STT"].map((s) => <SelectItem key={s} value={s}>BAC {s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Année</label>
            <Input type="number" value={form.bac_year} onChange={(e) => setForm({ ...form, bac_year: e.target.value })} className="mt-1.5 h-11" placeholder="2026" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Ville</label>
          <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1.5 h-11" placeholder="Cotonou" />
        </div>
        <Button onClick={save} className="gradient-primary text-primary-foreground border-0">Enregistrer</Button>
      </div>
    </div>
  );
}
