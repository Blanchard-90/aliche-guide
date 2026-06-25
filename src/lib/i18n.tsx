import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, string>;

const fr: Dict = {
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.how": "Comment ça marche",
  "nav.careers": "Métiers & Filières",
  "nav.resources": "Ressources",
  "nav.contact": "Contact",
  "nav.login": "Connexion",
  "nav.register": "Commencer",
  "hero.title": "Ton avenir mérite plus qu'un choix au hasard.",
  "hero.subtitle":
    "ALITCHÉ aide les nouveaux bacheliers à découvrir leurs aptitudes, explorer les métiers et choisir un parcours académique aligné avec leur potentiel.",
  "hero.cta.primary": "Commencer gratuitement",
  "hero.cta.secondary": "Voir une démonstration",
  "hero.badge": "Plateforme d'orientation intelligente",
  "card.profile": "Profil détecté",
  "card.field": "Filière recommandée",
  "card.career": "Métier compatible",
  "card.score": "Score d'affinité",
  "problem.title": "Pourquoi tant de bacheliers regrettent leur choix ?",
  "problem.subtitle": "Des milliers de jeunes en Afrique de l'Ouest font face aux mêmes obstacles.",
  "problem.s1.t": "Mauvaise orientation",
  "problem.s1.d": "67% des étudiants choisissent sans connaître leur profil.",
  "problem.s2.t": "Réorientation tardive",
  "problem.s2.d": "1 étudiant sur 3 change de filière après la 1ère année.",
  "problem.s3.t": "Perte de temps",
  "problem.s3.d": "2 années perdues en moyenne sur un mauvais parcours.",
  "problem.s4.t": "Insertion difficile",
  "problem.s4.d": "55% des diplômés peinent à trouver un emploi aligné.",
  "solution.title": "Comment ALITCHÉ vous accompagne",
  "solution.subtitle": "Un parcours guidé en 5 étapes pour décider en toute confiance.",
  "feat.1.t": "Découverte de soi",
  "feat.1.d": "Un test d'orientation intelligent qui révèle ton profil unique.",
  "feat.2.t": "Recommandations",
  "feat.2.d": "Des filières sélectionnées par notre moteur d'IA pour ton profil.",
  "feat.3.t": "Exploration",
  "feat.3.d": "Métiers, filières, institutions et débouchés réels.",
  "feat.4.t": "Simulation",
  "feat.4.d": "Visualise ton parcours sur 3, 5 et 10 ans.",
  "feat.5.t": "Accompagnement",
  "feat.5.d": "Coach IA + conseillers experts par WhatsApp.",
  "cta.start": "Démarrer mon diagnostic",
  "cta.explore": "Explorer les filières",
  "footer.tagline": "Choisis ton avenir avec confiance.",
  "footer.rights": "Tous droits réservés.",
  "auth.welcome": "Bienvenue sur ALITCHÉ",
  "auth.welcomeSub": "Crée ton compte ou connecte-toi pour démarrer ton diagnostic.",
  "auth.signin": "Connexion",
  "auth.signup": "Inscription",
  "auth.email": "Email",
  "auth.password": "Mot de passe",
  "auth.name": "Nom complet",
  "auth.submitSignin": "Se connecter",
  "auth.submitSignup": "Créer mon compte",
  "auth.google": "Continuer avec Google",
  "dash.welcome": "Bon retour",
  "dash.subtitle": "Voici un aperçu de ton parcours d'orientation.",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.how": "How it works",
  "nav.careers": "Careers & Programs",
  "nav.resources": "Resources",
  "nav.contact": "Contact",
  "nav.login": "Sign in",
  "nav.register": "Get started",
  "hero.title": "Your future deserves more than a random choice.",
  "hero.subtitle":
    "ALITCHÉ helps new high-school graduates discover their aptitudes, explore careers and choose an academic path aligned with their potential.",
  "hero.cta.primary": "Start for free",
  "hero.cta.secondary": "Watch a demo",
  "hero.badge": "Intelligent orientation platform",
  "card.profile": "Profile detected",
  "card.field": "Recommended program",
  "card.career": "Compatible career",
  "card.score": "Match score",
  "problem.title": "Why do so many graduates regret their choice?",
  "problem.subtitle": "Thousands of West African students face the same obstacles.",
  "problem.s1.t": "Poor orientation",
  "problem.s1.d": "67% of students choose without knowing their profile.",
  "problem.s2.t": "Late reorientation",
  "problem.s2.d": "1 in 3 students switch programs after year one.",
  "problem.s3.t": "Lost time",
  "problem.s3.d": "An average of 2 years lost on the wrong path.",
  "problem.s4.t": "Hard to land a job",
  "problem.s4.d": "55% of graduates struggle to find aligned employment.",
  "solution.title": "How ALITCHÉ guides you",
  "solution.subtitle": "A 5-step journey to decide with confidence.",
  "feat.1.t": "Self-discovery",
  "feat.1.d": "A smart orientation test that reveals your unique profile.",
  "feat.2.t": "Recommendations",
  "feat.2.d": "Programs hand-picked by our AI engine for you.",
  "feat.3.t": "Exploration",
  "feat.3.d": "Careers, programs, institutions and real outlooks.",
  "feat.4.t": "Simulation",
  "feat.4.d": "Visualize your path over 3, 5 and 10 years.",
  "feat.5.t": "Guidance",
  "feat.5.d": "AI coach + expert mentors via WhatsApp.",
  "cta.start": "Start my assessment",
  "cta.explore": "Explore programs",
  "footer.tagline": "Choose your future with confidence.",
  "footer.rights": "All rights reserved.",
  "auth.welcome": "Welcome to ALITCHÉ",
  "auth.welcomeSub": "Create your account or sign in to start your assessment.",
  "auth.signin": "Sign in",
  "auth.signup": "Sign up",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.name": "Full name",
  "auth.submitSignin": "Sign in",
  "auth.submitSignup": "Create my account",
  "auth.google": "Continue with Google",
  "dash.welcome": "Welcome back",
  "dash.subtitle": "Here's an overview of your orientation journey.",
};

const DICTS: Record<Lang, Dict> = { fr, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nCtx = createContext<Ctx>({ lang: "fr", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem("alitche.lang") as Lang | null) ?? "fr";
    setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("alitche.lang", l);
  };
  const t = (k: string) => DICTS[lang][k] ?? k;
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
