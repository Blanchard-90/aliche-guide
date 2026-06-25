// Shared mock data used by careers explorer, simulator, recommendations.
export type Career = {
  slug: string;
  title: string;
  field: string;
  description: string;
  missions: string[];
  skills: string[];
  salaryMin: number;
  salaryMax: number;
  growth: "Élevée" | "Forte" | "Stable";
  programs: string[];
  institutions: string[];
  emoji: string;
};

export const CAREERS: Career[] = [
  {
    slug: "data-scientist",
    title: "Data Scientist",
    field: "Tech & Data",
    description: "Analyse de grands volumes de données pour aider les entreprises à décider.",
    missions: ["Collecter et nettoyer la donnée", "Construire des modèles prédictifs", "Visualiser et présenter les insights"],
    skills: ["Python", "Statistiques", "Machine Learning", "SQL", "Communication"],
    salaryMin: 350_000, salaryMax: 1_500_000, growth: "Élevée",
    programs: ["Informatique", "Mathématiques appliquées", "Data Science"],
    institutions: ["IFRI", "EPAC", "INSTI"],
    emoji: "📊",
  },
  {
    slug: "developpeur-logiciel",
    title: "Développeur Logiciel",
    field: "Tech",
    description: "Conception et développement d'applications web, mobiles et systèmes.",
    missions: ["Coder des fonctionnalités", "Tester et déployer", "Collaborer en équipe agile"],
    skills: ["JavaScript", "Algorithmie", "Git", "Bases de données"],
    salaryMin: 250_000, salaryMax: 1_200_000, growth: "Élevée",
    programs: ["Génie Logiciel", "Informatique"],
    institutions: ["IFRI", "EPAC"],
    emoji: "💻",
  },
  {
    slug: "ingenieur-civil",
    title: "Ingénieur Civil",
    field: "BTP & Infrastructure",
    description: "Conception et supervision de projets de construction et d'infrastructure.",
    missions: ["Études techniques", "Suivi de chantier", "Contrôle qualité"],
    skills: ["AutoCAD", "Calcul structure", "Gestion de projet"],
    salaryMin: 300_000, salaryMax: 1_300_000, growth: "Forte",
    programs: ["Génie Civil"],
    institutions: ["EPAC", "INSTI"],
    emoji: "🏗",
  },
  {
    slug: "medecin-generaliste",
    title: "Médecin Généraliste",
    field: "Santé",
    description: "Diagnostic et traitement des pathologies courantes.",
    missions: ["Consultations", "Prescriptions", "Prévention"],
    skills: ["Anatomie", "Empathie", "Diagnostic clinique"],
    salaryMin: 400_000, salaryMax: 1_800_000, growth: "Stable",
    programs: ["Médecine"],
    institutions: ["FSS / UAC"],
    emoji: "🩺",
  },
  {
    slug: "marketing-digital",
    title: "Spécialiste Marketing Digital",
    field: "Business & Communication",
    description: "Stratégies en ligne pour acquérir et fidéliser les clients.",
    missions: ["SEO/SEA", "Réseaux sociaux", "Analytics & contenu"],
    skills: ["Storytelling", "Analytics", "Créativité"],
    salaryMin: 200_000, salaryMax: 900_000, growth: "Élevée",
    programs: ["Marketing", "Communication", "Gestion"],
    institutions: ["ENEAM", "UAC"],
    emoji: "📣",
  },
  {
    slug: "agronome",
    title: "Ingénieur Agronome",
    field: "Agriculture",
    description: "Optimisation des cultures et accompagnement des exploitations.",
    missions: ["Diagnostic agronomique", "Vulgarisation", "R&D semences"],
    skills: ["Biologie", "Terrain", "Données"],
    salaryMin: 220_000, salaryMax: 900_000, growth: "Forte",
    programs: ["Agronomie"],
    institutions: ["FSA / UAC"],
    emoji: "🌱",
  },
  {
    slug: "enseignant",
    title: "Enseignant",
    field: "Éducation",
    description: "Transmission du savoir aux nouvelles générations.",
    missions: ["Préparer les cours", "Évaluer", "Animer la classe"],
    skills: ["Pédagogie", "Communication", "Patience"],
    salaryMin: 150_000, salaryMax: 500_000, growth: "Stable",
    programs: ["Sciences de l'Éducation", "Lettres"],
    institutions: ["ENS", "UAC"],
    emoji: "📚",
  },
  {
    slug: "comptable",
    title: "Comptable",
    field: "Finance",
    description: "Tenue des comptes, fiscalité, et reporting.",
    missions: ["Saisie", "Bilan", "Conseil fiscal"],
    skills: ["Rigueur", "Excel", "SYSCOHADA"],
    salaryMin: 180_000, salaryMax: 800_000, growth: "Stable",
    programs: ["Comptabilité", "Gestion"],
    institutions: ["ENEAM", "UAC"],
    emoji: "💼",
  },
];

export const INSTITUTIONS = [
  { name: "UAC", full: "Université d'Abomey-Calavi", city: "Abomey-Calavi", programs: 80 },
  { name: "EPAC", full: "École Polytechnique d'Abomey-Calavi", city: "Abomey-Calavi", programs: 22 },
  { name: "INSTI", full: "Institut National Supérieur de Tech. Industrielle", city: "Lokossa", programs: 15 },
  { name: "ENEAM", full: "École Nat. d'Économie Appliquée & de Management", city: "Cotonou", programs: 18 },
  { name: "IFRI", full: "Institut de Formation et de Recherche en Informatique", city: "Abomey-Calavi", programs: 9 },
];

export const MENTORS = [
  { name: "Dr. Komla A.", role: "Data Scientist Senior", years: 8, available: true, emoji: "👨🏿‍💻" },
  { name: "Aïcha S.", role: "Architecte Logicielle", years: 10, available: true, emoji: "👩🏿‍💻" },
  { name: "Prof. Mensah", role: "Ingénieur Civil — Enseignant", years: 15, available: false, emoji: "👨🏿‍🏫" },
  { name: "Dr. Fatou B.", role: "Médecin & Mentor santé", years: 12, available: true, emoji: "👩🏿‍⚕" },
];

export const PROFILES = ["Analytique", "Créatif", "Social", "Entrepreneurial", "Pratique"] as const;
export type ProfileKey = (typeof PROFILES)[number];

// 12 question quiz mapping answers to profile increments
export const QUIZ: { q: string; options: { label: string; weights: Partial<Record<ProfileKey, number>> }[] }[] = [
  { q: "Devant un problème complexe, tu préfères :", options: [
    { label: "Décomposer logiquement", weights: { Analytique: 2 } },
    { label: "Imaginer une nouvelle approche", weights: { Créatif: 2 } },
    { label: "En discuter avec d'autres", weights: { Social: 2 } },
    { label: "Tester rapidement sur le terrain", weights: { Pratique: 2 } },
  ]},
  { q: "Ton activité préférée le week-end :", options: [
    { label: "Lire / résoudre des énigmes", weights: { Analytique: 2 } },
    { label: "Dessiner, jouer de la musique", weights: { Créatif: 2 } },
    { label: "Sortir entre amis", weights: { Social: 2 } },
    { label: "Lancer un mini-projet", weights: { Entrepreneurial: 2 } },
  ]},
  { q: "À l'école, ta matière la plus stimulante était :", options: [
    { label: "Mathématiques", weights: { Analytique: 2 } },
    { label: "Arts / Littérature", weights: { Créatif: 2 } },
    { label: "SVT / Sciences humaines", weights: { Social: 1, Analytique: 1 } },
    { label: "Technologie / pratique", weights: { Pratique: 2 } },
  ]},
  { q: "Ton rêve professionnel ressemble à :", options: [
    { label: "Résoudre des problèmes du monde", weights: { Analytique: 1, Social: 1 } },
    { label: "Créer une œuvre marquante", weights: { Créatif: 2 } },
    { label: "Diriger ma propre entreprise", weights: { Entrepreneurial: 2 } },
    { label: "Construire des choses concrètes", weights: { Pratique: 2 } },
  ]},
  { q: "Dans un groupe tu es plutôt :", options: [
    { label: "Le stratège", weights: { Analytique: 2 } },
    { label: "L'idéateur", weights: { Créatif: 2 } },
    { label: "Le médiateur", weights: { Social: 2 } },
    { label: "Le leader d'action", weights: { Entrepreneurial: 2 } },
  ]},
  { q: "Tu préfères travailler :", options: [
    { label: "Seul, concentré", weights: { Analytique: 2 } },
    { label: "En équipe créative", weights: { Créatif: 1, Social: 1 } },
    { label: "Au contact des gens", weights: { Social: 2 } },
    { label: "Sur le terrain", weights: { Pratique: 2 } },
  ]},
  { q: "Une bonne journée pour toi c'est :", options: [
    { label: "Comprendre quelque chose de nouveau", weights: { Analytique: 2 } },
    { label: "Produire une création originale", weights: { Créatif: 2 } },
    { label: "Aider quelqu'un", weights: { Social: 2 } },
    { label: "Lancer une nouvelle initiative", weights: { Entrepreneurial: 2 } },
  ]},
  { q: "Tu choisirais plutôt un job où :", options: [
    { label: "On t'évalue sur ton expertise", weights: { Analytique: 2 } },
    { label: "On t'évalue sur ton originalité", weights: { Créatif: 2 } },
    { label: "On t'évalue sur ton impact humain", weights: { Social: 2 } },
    { label: "On t'évalue sur tes résultats business", weights: { Entrepreneurial: 2 } },
  ]},
  { q: "Tu apprends mieux :", options: [
    { label: "En théorie & cours", weights: { Analytique: 2 } },
    { label: "En expérimentant librement", weights: { Créatif: 2 } },
    { label: "En discutant avec d'autres", weights: { Social: 2 } },
    { label: "En faisant", weights: { Pratique: 2 } },
  ]},
  { q: "Tu te décris comme :", options: [
    { label: "Logique et précis", weights: { Analytique: 2 } },
    { label: "Imaginatif et expressif", weights: { Créatif: 2 } },
    { label: "Empathique et collaboratif", weights: { Social: 2 } },
    { label: "Ambitieux et autonome", weights: { Entrepreneurial: 2 } },
  ]},
  { q: "Ton environnement de travail idéal :", options: [
    { label: "Laboratoire / bureau calme", weights: { Analytique: 2 } },
    { label: "Studio / espace créatif", weights: { Créatif: 2 } },
    { label: "Hôpital, école, ONG", weights: { Social: 2 } },
    { label: "Atelier / chantier", weights: { Pratique: 2 } },
  ]},
  { q: "Le succès se mesure pour toi par :", options: [
    { label: "La maîtrise d'une discipline", weights: { Analytique: 2 } },
    { label: "L'impact créatif", weights: { Créatif: 2 } },
    { label: "Le bien-être des autres", weights: { Social: 2 } },
    { label: "L'indépendance et la richesse", weights: { Entrepreneurial: 2 } },
  ]},
];

// Recommendation engine: map dominant profile -> careers
export function recommendCareers(scores: Record<string, number>): Career[] {
  const dominant = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Analytique") as ProfileKey;
  const order: Record<ProfileKey, string[]> = {
    Analytique: ["data-scientist", "developpeur-logiciel", "ingenieur-civil", "comptable"],
    Créatif: ["marketing-digital", "developpeur-logiciel", "enseignant"],
    Social: ["medecin-generaliste", "enseignant", "marketing-digital"],
    Entrepreneurial: ["marketing-digital", "data-scientist", "comptable", "developpeur-logiciel"],
    Pratique: ["ingenieur-civil", "agronome", "developpeur-logiciel"],
  };
  const slugs = order[dominant] ?? [];
  return slugs.map((s) => CAREERS.find((c) => c.slug === s)!).filter(Boolean);
}
