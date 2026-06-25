import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-md">{t("footer.tagline")} ALITCHÉ — la plateforme d'orientation intelligente pour la nouvelle génération africaine.</p>
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Cotonou, Bénin</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@alitche.com</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +229 01 00 00 00 00</div>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Plateforme</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-primary">Comment ça marche</Link></li>
            <li><Link to="/careers" className="hover:text-primary">Métiers & Filières</Link></li>
            <li><Link to="/resources" className="hover:text-primary">Ressources</Link></li>
            <li><Link to="/auth" className="hover:text-primary">Commencer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Entreprise</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} ALITCHÉ. {t("footer.rights")}</span>
          <span>Made with ❤ in Cotonou</span>
        </div>
      </div>
    </footer>
  );
}
