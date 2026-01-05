
import { SemesterData, ModuleType, Track } from './types';

// Helper to define colors for competencies
const COLORS = [
  '#3b82f6', // blue-500 (Comprendre)
  '#10b981', // emerald-500 (Concevoir)
  '#8b5cf6', // violet-500 (Exprimer)
  '#f59e0b', // amber-500 (Développer)
  '#ef4444', // red-500 (Entreprendre)
];

// --- SEMESTRE 1 (COMMUN) ---
const S1: SemesterData = {
  id: 'S1',
  name: 'Semestre 1',
  competencies: [
    { id: 'C1.1', name: 'Comprendre', color: COLORS[0], ects: 5, resourceCoefficient: 12.5, saeCoefficient: 9 },
    { id: 'C1.2', name: 'Concevoir', color: COLORS[1], ects: 6, resourceCoefficient: 7.5, saeCoefficient: 6 },
    { id: 'C1.3', name: 'Exprimer', color: COLORS[2], ects: 8, resourceCoefficient: 17.5, saeCoefficient: 14 },
    { id: 'C1.4', name: 'Développer', color: COLORS[3], ects: 8, resourceCoefficient: 12.5, saeCoefficient: 12 },
    { id: 'C1.5', name: 'Entreprendre', color: COLORS[4], ects: 3, resourceCoefficient: 12, saeCoefficient: 10 },
  ],
  modules: [
    { id: 'S1-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 1 }, { competenceId: 'C1.2', coefficient: 1 }, { competenceId: 'C1.3', coefficient: 1 }, { competenceId: 'C1.5', coefficient: 1 }] },
    { id: 'S1-R1b', name: 'Anglais renforcé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.3', coefficient: 1 }, { competenceId: 'C1.5', coefficient: 1 }] },
    { id: 'S1-R2', name: 'Ergonomie et accessibilité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 3 }] },
    { id: 'S1-R3', name: 'Culture numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 3 }] },
    { id: 'S1-R4', name: 'Stratégie de communication', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 2 }, { competenceId: 'C1.2', coefficient: 3 }] },
    { id: 'S1-R5', name: 'Expression, communication et rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.2', coefficient: 2 }, { competenceId: 'C1.5', coefficient: 2 }] },
    { id: 'S1-R6', name: 'Écriture multimédia et narration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.3', coefficient: 3 }] },
    { id: 'S1-R7', name: 'Production graphique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.3', coefficient: 4 }] },
    { id: 'S1-R8', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 1 }, { competenceId: 'C1.2', coefficient: 2 }] },
    { id: 'S1-R9', name: 'Production audio et vidéo', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.3', coefficient: 4 }] },
    { id: 'S1-R10', name: 'Intégration web', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.4', coefficient: 5 }] },
    { id: 'S1-R11', name: 'Développement web', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.4', coefficient: 4 }] },
    { id: 'S1-R12', name: 'Hébergement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.4', coefficient: 3 }] },
    { id: 'S1-R13', name: 'Représentation et traitement de l\'information', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 1 }, { competenceId: 'C1.3', coefficient: 3 }] },
    { id: 'S1-R14', name: 'Gestion de projet', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.5', coefficient: 3 }] },
    { id: 'S1-R15', name: 'Économie et droit du numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 2 }, { competenceId: 'C1.5', coefficient: 1 }] },
    { id: 'S1-R16', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 0.5 }, { competenceId: 'C1.2', coefficient: 0.5 }, { competenceId: 'C1.3', coefficient: 0.5 }, { competenceId: 'C1.4', coefficient: 0.5 }, { competenceId: 'C1.5', coefficient: 4 }] },
    // SAE
    { id: 'S1-SAE1', name: 'Audit de communication numérique', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.1', coefficient: 9 }] },
    { id: 'S1-SAE2', name: 'Recommandation de communication numérique', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.2', coefficient: 6 }] },
    { id: 'S1-SAE3', name: 'Design graphique', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.3', coefficient: 7 }] },
    { id: 'S1-SAE4', name: 'Production audio et vidéo', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.3', coefficient: 7 }] },
    { id: 'S1-SAE5', name: 'Produire un site web', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.4', coefficient: 12 }] },
    { id: 'S1-SAE6', name: 'Gestion de projet pour une communication numérique', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.5', coefficient: 10 }] },
  ]
};

// --- SEMESTRE 2 (COMMUN) ---
const S2: SemesterData = {
  id: 'S2',
  name: 'Semestre 2',
  competencies: [
    { id: 'C2.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 7.5, saeCoefficient: 5 },
    { id: 'C2.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 8.5, saeCoefficient: 6 },
    { id: 'C2.3', name: 'Exprimer', color: COLORS[2], ects: 9, resourceCoefficient: 18.5, saeCoefficient: 13 },
    { id: 'C2.4', name: 'Développer', color: COLORS[3], ects: 9, resourceCoefficient: 16.5, saeCoefficient: 13 },
    { id: 'C2.5', name: 'Entreprendre', color: COLORS[4], ects: 4, resourceCoefficient: 14, saeCoefficient: 10 },
  ],
  modules: [
    { id: 'S2-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.2', coefficient: 3 }, { competenceId: 'C2.3', coefficient: 1 }, { competenceId: 'C2.5', coefficient: 1 }] },
    { id: 'S2-R1b', name: 'Anglais renforcé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.2', coefficient: 2 }, { competenceId: 'C2.3', coefficient: 1 }] },
    { id: 'S2-R2', name: 'Ergonomie et accessibilité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.1', coefficient: 3 }] },
    { id: 'S2-R3', name: 'Culture numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.1', coefficient: 3 }] },
    { id: 'S2-R4', name: 'Stratégie de communication', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.2', coefficient: 3 }] },
    { id: 'S2-R5', name: 'Expression, communication et rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.5', coefficient: 3 }] },
    { id: 'S2-R6', name: 'Écriture multimédia et narration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.3', coefficient: 3 }] },
    { id: 'S2-R7', name: 'Production graphique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.3', coefficient: 4 }] },
    { id: 'S2-R8', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.3', coefficient: 3 }] },
    { id: 'S2-R9', name: 'Production audio et vidéo', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.3', coefficient: 4 }] },
    { id: 'S2-R10', name: 'Gestion de contenus', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 2 }] },
    { id: 'S2-R11', name: 'Intégration web', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 4 }] },
    { id: 'S2-R12', name: 'Développement web', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 4 }] },
    { id: 'S2-R13', name: 'Système d\'information', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 3 }] },
    { id: 'S2-R14', name: 'Hébergement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 3 }] },
    { id: 'S2-R15', name: 'Représentation et traitement de l\'information', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.1', coefficient: 1 }, { competenceId: 'C2.3', coefficient: 2 }] },
    { id: 'S2-R16', name: 'Gestion de projet', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.5', coefficient: 3 }] },
    { id: 'S2-R17', name: 'Économie et droit du numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.5', coefficient: 3 }] },
    { id: 'S2-R18', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.1', coefficient: 0.5 }, { competenceId: 'C2.2', coefficient: 0.5 }, { competenceId: 'C2.3', coefficient: 0.5 }, { competenceId: 'C2.4', coefficient: 0.5 }, { competenceId: 'C2.5', coefficient: 4 }] },
    // SAE
    { id: 'S2-SAE1', name: 'Exploration des usages', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.1', coefficient: 4 }] },
    { id: 'S2-SAE2', name: 'Concevoir un produit ou un service et sa communication', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.2', coefficient: 5 }, { competenceId: 'C2.3', coefficient: 12 }, { competenceId: 'C2.4', coefficient: 2 }, { competenceId: 'C2.5', coefficient: 3 }] },
    { id: 'S2-SAE3', name: 'Site web et bases de données', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.4', coefficient: 10 }] },
    { id: 'S2-SAE4', name: 'Construire sa présence en ligne', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.5', coefficient: 6 }] },
    { id: 'S2-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.1', coefficient: 1 }, { competenceId: 'C2.2', coefficient: 1 }, { competenceId: 'C2.3', coefficient: 1 }, { competenceId: 'C2.4', coefficient: 1 }, { competenceId: 'C2.5', coefficient: 1 }] },
  ]
};

// --- CRÉATION NUMÉRIQUE S3 ---
const S3_CN: SemesterData = {
  id: 'S3-CN',
  name: 'Semestre 3 (Créa)',
  competencies: [
    { id: 'C3.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 7.5, saeCoefficient: 6 },
    { id: 'C3.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 7.5, saeCoefficient: 5 },
    { id: 'C3.3', name: 'Exprimer', color: COLORS[2], ects: 8, resourceCoefficient: 19.5, saeCoefficient: 12 },
    { id: 'C3.4', name: 'Développer', color: COLORS[3], ects: 8, resourceCoefficient: 16.5, saeCoefficient: 12 },
    { id: 'C3.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 12, saeCoefficient: 10 },
  ],
  modules: [
    { id: 'S3-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 1 }, { competenceId: 'C3.5', coefficient: 2 }] },
    { id: 'S3-R1b', name: 'Anglais renforcé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 1 }, { competenceId: 'C3.5', coefficient: 1 }] },
    { id: 'S3-R2', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 1 }] },
    { id: 'S3-R3', name: 'Culture numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-R4', name: 'Stratégie de communication et marketing', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-R5', name: 'Référencement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-R6', name: 'Expression, communication et rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.5', coefficient: 3 }] },
    { id: 'S3-R7', name: 'Écriture multimédia et narration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 2 }] },
    { id: 'S3-R8', name: 'Création et design interactif', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 3 }] },
    { id: 'S3-R9', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 4 }] },
    { id: 'S3-R10', name: 'Audiovisuel et motion design', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 6 }] },
    { id: 'S3-R11', name: 'Développement front et intégration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 7 }] },
    { id: 'S3-R12', name: 'Gestion de contenus avancée', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 4 }] },
    { id: 'S3-R13', name: 'Déploiement de services', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 4 }] },
    { id: 'S3-R14', name: 'Représentation et traitement de l\'information', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 2 }] },
    { id: 'S3-R15', name: 'Gestion de projets', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 1 }, { competenceId: 'C3.5', coefficient: 2 }] },
    { id: 'S3-R16', name: 'Économie, gestion et droit du numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.5', coefficient: 3 }] },
    { id: 'S3-R17', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 0.5 }, { competenceId: 'C3.2', coefficient: 0.5 }, { competenceId: 'C3.3', coefficient: 0.5 }, { competenceId: 'C3.4', coefficient: 0.5 }, { competenceId: 'C3.5', coefficient: 1 }] },
    // SAE
    { id: 'S3-SAE1', name: 'Concevoir et développer une expérience utilisateur', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 2 }, { competenceId: 'C3.4', coefficient: 8 }, { competenceId: 'C3.5', coefficient: 5 }] },
    { id: 'S3-SAE2', name: 'Produire des contenus pour une communication plurimédia', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 7 }, { competenceId: 'C3.2', coefficient: 3 }, { competenceId: 'C3.5', coefficient: 5 }] },
    { id: 'S3-SAE3', name: 'Concevoir des visualisations de données', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 5 }, { competenceId: 'C3.4', coefficient: 4 }] },
  ]
};

// --- CRÉATION NUMÉRIQUE S4 ---
const S4_CN: SemesterData = {
  id: 'S4-CN',
  name: 'Semestre 4 (Créa)',
  competencies: [
    { id: 'C4.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 8, saeCoefficient: 10 },
    { id: 'C4.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 8, saeCoefficient: 12 },
    { id: 'C4.3', name: 'Exprimer', color: COLORS[2], ects: 10, resourceCoefficient: 22, saeCoefficient: 28 },
    { id: 'C4.4', name: 'Développer', color: COLORS[3], ects: 6, resourceCoefficient: 8, saeCoefficient: 12 },
    { id: 'C4.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 12, saeCoefficient: 12 },
  ],
  modules: [
    { id: 'S4-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-R2', name: 'Économie, gestion et droit du numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-R3', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 8 }, { competenceId: 'C4.2', coefficient: 8 }, { competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-R4', name: 'Expression, communication et droit du numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-R5', name: 'Gestion de contenus spécialisée', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 8 }] },
    { id: 'S4-R6', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    { id: 'S4-R7', name: 'Audiovisuel - Motion design', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    { id: 'S4-R8', name: 'Écriture multimédia et narration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    // SAE
    { id: 'S4-SAE1', name: 'Créer pour une campagne de communication visuelle', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 6 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-SAE2', name: 'Produire du contenu multimédia', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 4 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 9 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 4 }] },
    { id: 'S4-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 4 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 9 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 4 }] },
  ]
};

// --- CRÉATION NUMÉRIQUE S5 ---
const S5_CN: SemesterData = {
  id: 'S5-CN',
  name: 'Semestre 5 (Créa)',
  competencies: [
    { id: 'C5.3', name: 'Exprimer', color: COLORS[2], ects: 20, resourceCoefficient: 10, saeCoefficient: 10 },
    { id: 'C5.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 4, saeCoefficient: 4 },
  ],
  modules: [
    { id: 'S5-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R2', name: 'Management et Assurance qualité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R3', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R4', name: 'Projet personnel et professionnel', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R5', name: 'Définir une direction artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 2 }] },
    { id: 'S5-R6', name: 'Création numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 3 }] },
    { id: 'S5-R7', name: 'Ecriture multimédia et Narration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 3 }] },
    // SAE
    { id: 'S5-SAE1', name: 'Créer par/pour le numérique', type: ModuleType.SAE, weightings: [{ competenceId: 'C5.3', coefficient: 10 }, { competenceId: 'C5.5', coefficient: 4 }] },
  ]
};

// --- CRÉATION NUMÉRIQUE S6 ---
const S6_CN: SemesterData = {
  id: 'S6-CN',
  name: 'Semestre 6 (Créa)',
  competencies: [
    { id: 'C6.3', name: 'Exprimer', color: COLORS[2], ects: 20, resourceCoefficient: 2, saeCoefficient: 2 },
    { id: 'C6.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 2, saeCoefficient: 2 },
  ],
  modules: [
    { id: 'S6-R1', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-R2', name: 'Création numérique interactive', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.3', coefficient: 2 }, { competenceId: 'C6.5', coefficient: 1 }] },
    // SAE
    { id: 'S6-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.3', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.3', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
  ]
};

export const TRACKS: Track[] = [
  {
    id: 'crea',
    name: 'Création Numérique',
    semesters: [S1, S2, S3_CN, S4_CN, S5_CN, S6_CN]
  },
  {
    id: 'dev',
    name: 'Développement Web',
    semesters: [S1, S2] // Incomplete for dev in this fix, focusing on Crea
  },
  {
    id: 'strat',
    name: 'Stratégie de Communication',
    semesters: [S1, S2] // Incomplete for strat in this fix, focusing on Crea
  },
];
