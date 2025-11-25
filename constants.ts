
import { SemesterData, ModuleType, Track } from './types';

// Helper to define colors for competencies
const COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#ec4899', // pink-500
];

// --- SEMESTRE 1 (COMMON) ---
const S1: SemesterData = {
  id: 'S1',
  name: 'Semestre 1 (Tronc Commun)',
  competencies: [
    { id: 'C1.1', name: 'Comprendre', color: COLORS[0], ects: 5, resourceCoefficient: 12.5, saeCoefficient: 9 },
    { id: 'C1.2', name: 'Concevoir', color: COLORS[1], ects: 6, resourceCoefficient: 7.5, saeCoefficient: 6 },
    { id: 'C1.3', name: 'Exprimer', color: COLORS[2], ects: 8, resourceCoefficient: 17.5, saeCoefficient: 14 },
    { id: 'C1.4', name: 'Développer', color: COLORS[3], ects: 8, resourceCoefficient: 12.5, saeCoefficient: 12 },
    { id: 'C1.5', name: 'Entreprendre', color: COLORS[4], ects: 3, resourceCoefficient: 12, saeCoefficient: 10 },
  ],
  modules: [
    {
      id: 'S1-R1', name: 'Anglais', type: ModuleType.RESOURCE,
      weightings: [
        { competenceId: 'C1.1', coefficient: 1 },
        { competenceId: 'C1.2', coefficient: 1 },
        { competenceId: 'C1.3', coefficient: 1 },
        { competenceId: 'C1.5', coefficient: 1 },
      ]
    },
    {
      id: 'S1-R1-bis', name: 'Anglais renforcé', type: ModuleType.RESOURCE,
      weightings: [
        { competenceId: 'C1.3', coefficient: 1 },
        { competenceId: 'C1.5', coefficient: 1 },
      ]
    },
    {
      id: 'S1-R2', name: 'Ergonomie et accessibilité', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.1', coefficient: 3 }]
    },
    {
      id: 'S1-R3', name: 'Culture numérique', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.1', coefficient: 3 }]
    },
    {
      id: 'S1-R4', name: 'Stratégie de communication', type: ModuleType.RESOURCE,
      weightings: [
        { competenceId: 'C1.1', coefficient: 2 },
        { competenceId: 'C1.2', coefficient: 3 },
      ]
    },
    {
      id: 'S1-R5', name: 'Expression, comm. et rhétorique', type: ModuleType.RESOURCE,
      weightings: [
        { competenceId: 'C1.2', coefficient: 2 },
        { competenceId: 'C1.5', coefficient: 2 },
      ]
    },
    {
      id: 'S1-R6', name: 'Écriture multimédia et narration', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.3', coefficient: 3 }]
    },
    {
      id: 'S1-R7', name: 'Production graphique', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.3', coefficient: 4 }]
    },
    {
      id: 'S1-R8', name: 'Culture artistique', type: ModuleType.RESOURCE,
      weightings: [
        { competenceId: 'C1.1', coefficient: 1 },
        { competenceId: 'C1.2', coefficient: 2 },
      ]
    },
    {
      id: 'S1-R9', name: 'Production audio et vidéo', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.3', coefficient: 4 }]
    },
    {
      id: 'S1-R10', name: 'Intégration web', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.4', coefficient: 5 }]
    },
    {
      id: 'S1-R11', name: 'Développement web', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.4', coefficient: 4 }]
    },
    {
      id: 'S1-R12', name: 'Hébergement', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.4', coefficient: 3 }]
    },
    {
      id: 'S1-R13', name: 'Représentation et traitement info', type: ModuleType.RESOURCE,
      weightings: [
        { competenceId: 'C1.1', coefficient: 1 },
        { competenceId: 'C1.3', coefficient: 3 },
      ]
    },
    {
      id: 'S1-R14', name: 'Gestion de projet', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C1.5', coefficient: 3 }]
    },
    {
      id: 'S1-R15', name: 'Économie et droit du numérique', type: ModuleType.RESOURCE,
      weightings: [
        { competenceId: 'C1.1', coefficient: 2 },
        { competenceId: 'C1.5', coefficient: 1 },
      ]
    },
    {
      id: 'S1-R16', name: 'PPP', type: ModuleType.RESOURCE,
      weightings: [
        { competenceId: 'C1.1', coefficient: 0.5 },
        { competenceId: 'C1.2', coefficient: 0.5 },
        { competenceId: 'C1.3', coefficient: 0.5 },
        { competenceId: 'C1.4', coefficient: 0.5 },
        { competenceId: 'C1.5', coefficient: 4 },
      ]
    },
    // SAÉ
    {
      id: 'S1-SAE1', name: 'Audit de communication numérique', type: ModuleType.SAE,
      weightings: [{ competenceId: 'C1.1', coefficient: 9 }]
    },
    {
      id: 'S1-SAE2', name: 'Recommandation de com. num.', type: ModuleType.SAE,
      weightings: [{ competenceId: 'C1.2', coefficient: 6 }]
    },
    {
      id: 'S1-SAE3', name: 'Design graphique', type: ModuleType.SAE,
      weightings: [{ competenceId: 'C1.3', coefficient: 7 }]
    },
    {
      id: 'S1-SAE4', name: 'Production audio et vidéo', type: ModuleType.SAE,
      weightings: [{ competenceId: 'C1.3', coefficient: 7 }]
    },
    {
      id: 'S1-SAE5', name: 'Produire un site web', type: ModuleType.SAE,
      weightings: [{ competenceId: 'C1.4', coefficient: 12 }]
    },
    {
      id: 'S1-SAE6', name: 'Gestion de projet', type: ModuleType.SAE,
      weightings: [{ competenceId: 'C1.5', coefficient: 10 }]
    },
    {
      id: 'S1-PORT', name: 'Portfolio', type: ModuleType.SAE,
      weightings: []
    },
  ]
};

// --- SEMESTRE 2 (COMMON) ---
const S2: SemesterData = {
  id: 'S2',
  name: 'Semestre 2 (Tronc Commun)',
  competencies: [
    { id: 'C2.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 7.5, saeCoefficient: 5 },
    { id: 'C2.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 8.5, saeCoefficient: 6 },
    { id: 'C2.3', name: 'Exprimer', color: COLORS[2], ects: 9, resourceCoefficient: 18.5, saeCoefficient: 13 },
    { id: 'C2.4', name: 'Développer', color: COLORS[3], ects: 9, resourceCoefficient: 16.5, saeCoefficient: 13 },
    { id: 'C2.5', name: 'Entreprendre', color: COLORS[4], ects: 4, resourceCoefficient: 14, saeCoefficient: 10 },
  ],
  modules: [
    {
        id: 'S2-R1', name: 'Anglais', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.1', coefficient: 3 }, { competenceId: 'C2.2', coefficient: 1 }, { competenceId: 'C2.5', coefficient: 1 }]
    },
    {
      id: 'S2-R1-bis', name: 'Anglais renforcé', type: ModuleType.RESOURCE,
      weightings: [{ competenceId: 'C2.1', coefficient: 2 }, { competenceId: 'C2.2', coefficient: 1 }]
    },
    {
        id: 'S2-R2', name: 'Ergonomie', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.1', coefficient: 3 }]
    },
    {
        id: 'S2-R3', name: 'Culture numérique', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.1', coefficient: 3 }]
    },
    {
        id: 'S2-R4', name: 'Stratégie de comm.', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.2', coefficient: 3 }]
    },
    {
        id: 'S2-R5', name: 'Expression & Rhétorique', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.5', coefficient: 3 }]
    },
    {
        id: 'S2-R6', name: 'Écriture multimédia', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.3', coefficient: 3 }]
    },
    {
        id: 'S2-R7', name: 'Production graphique', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.3', coefficient: 4 }]
    },
    {
        id: 'S2-R8', name: 'Culture artistique', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.3', coefficient: 3 }]
    },
    {
        id: 'S2-R9', name: 'Production AV', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.3', coefficient: 4 }]
    },
    {
        id: 'S2-R10', name: 'Gestion de contenus', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.4', coefficient: 2 }]
    },
    {
        id: 'S2-R11', name: 'Intégration web', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.4', coefficient: 4 }]
    },
    {
        id: 'S2-R12', name: 'Développement web', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.4', coefficient: 4 }]
    },
    {
        id: 'S2-R13', name: 'Système d\'information', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.4', coefficient: 3 }]
    },
    {
        id: 'S2-R14', name: 'Hébergement', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.4', coefficient: 3 }]
    },
    {
        id: 'S2-R15', name: 'Représentation info', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.1', coefficient: 1 }, { competenceId: 'C2.3', coefficient: 2 }]
    },
    {
        id: 'S2-R16', name: 'Gestion de projet', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.5', coefficient: 3 }]
    },
    {
        id: 'S2-R17', name: 'Droit numérique', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.5', coefficient: 3 }]
    },
    {
        id: 'S2-R18', name: 'PPP', type: ModuleType.RESOURCE,
        weightings: [{ competenceId: 'C2.1', coefficient: 0.5 }, { competenceId: 'C2.2', coefficient: 0.5 }, { competenceId: 'C2.3', coefficient: 0.5 }, { competenceId: 'C2.4', coefficient: 0.5 }, { competenceId: 'C2.5', coefficient: 4 }]
    },
    // SAE S2
    {
        id: 'S2-SAE1', name: 'Exploration des usages', type: ModuleType.SAE,
        weightings: [{ competenceId: 'C2.1', coefficient: 4 }]
    },
    {
        id: 'S2-SAE2', name: 'Concevoir un produit', type: ModuleType.SAE,
        weightings: [{ competenceId: 'C2.2', coefficient: 5 }, { competenceId: 'C2.3', coefficient: 12 }, { competenceId: 'C2.4', coefficient: 2 }, { competenceId: 'C2.5', coefficient: 3 }]
    },
    {
        id: 'S2-SAE3', name: 'Site web et bases de données', type: ModuleType.SAE,
        weightings: [{ competenceId: 'C2.4', coefficient: 10 }]
    },
    {
        id: 'S2-SAE4', name: 'Présence en ligne', type: ModuleType.SAE,
        weightings: [{ competenceId: 'C2.5', coefficient: 6 }]
    },
    {
        id: 'S2-PORT', name: 'Portfolio', type: ModuleType.SAE,
        weightings: [{ competenceId: 'C2.1', coefficient: 1 }, { competenceId: 'C2.2', coefficient: 1 }, { competenceId: 'C2.3', coefficient: 1 }, { competenceId: 'C2.4', coefficient: 1 }, { competenceId: 'C2.5', coefficient: 1 }]
    }
  ]
};

// ==========================================
// PARCOURS: DÉVELOPPEMENT WEB
// ==========================================

const S3_DEV: SemesterData = {
  id: 'S3-DEV',
  name: 'Semestre 3 (Dev)',
  competencies: [
    { id: 'C3.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 7.5, saeCoefficient: 6 },
    { id: 'C3.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 7.5, saeCoefficient: 5 },
    { id: 'C3.3', name: 'Exprimer', color: COLORS[2], ects: 8, resourceCoefficient: 19.5, saeCoefficient: 12 },
    { id: 'C3.4', name: 'Développer', color: COLORS[3], ects: 8, resourceCoefficient: 16.5, saeCoefficient: 12 },
    { id: 'C3.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 12, saeCoefficient: 10 },
  ],
  modules: [
    { id: 'S3-DEV-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 1 }, { competenceId: 'C3.4', coefficient: 2 }] },
    { id: 'S3-DEV-R1bis', name: 'Anglais renforcé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 1 }, { competenceId: 'C3.4', coefficient: 1 }] },
    { id: 'S3-DEV-R2', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 1 }] },
    { id: 'S3-DEV-R3', name: 'Culture numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-DEV-R4', name: 'Stratégie Com & Marketing', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-DEV-R5', name: 'Référencement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-DEV-R6', name: 'Expression & Rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.5', coefficient: 3 }] },
    { id: 'S3-DEV-R7', name: 'Ecriture Multimédia', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 2 }] },
    { id: 'S3-DEV-R8', name: 'Création & Design Interactif', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 3 }] },
    { id: 'S3-DEV-R9', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 4 }] },
    { id: 'S3-DEV-R10', name: 'Audiovisuel & Motion', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 6 }] },
    { id: 'S3-DEV-R11', name: 'Dev Front & Intégration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 7 }] },
    { id: 'S3-DEV-R12', name: 'Dev Back', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 4 }] },
    { id: 'S3-DEV-R13', name: 'Déploiement services', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 4 }] },
    { id: 'S3-DEV-R14', name: 'Représentation de l\'info', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 2 }] },
    { id: 'S3-DEV-R15', name: 'Gestion de projets', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 1 }, { competenceId: 'C3.5', coefficient: 2 }] },
    { id: 'S3-DEV-R16', name: 'Eco, gestion, droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.5', coefficient: 3 }] },
    { id: 'S3-DEV-R17', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 0.5 }, { competenceId: 'C3.2', coefficient: 0.5 }, { competenceId: 'C3.3', coefficient: 0.5 }, { competenceId: 'C3.4', coefficient: 0.5 }, { competenceId: 'C3.5', coefficient: 1 }] },
    // SAE S3
    { id: 'S3-DEV-SAE1', name: 'Expérience utilisateur', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 2 }, { competenceId: 'C3.4', coefficient: 8 }, { competenceId: 'C3.5', coefficient: 5 }] },
    { id: 'S3-DEV-SAE2', name: 'Prod. contenus plurimédia', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 3 }, { competenceId: 'C3.3', coefficient: 7 }, { competenceId: 'C3.5', coefficient: 5 }] },
    { id: 'S3-DEV-SAE3', name: 'Visualisation de données', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 5 }, { competenceId: 'C3.4', coefficient: 4 }] }
  ]
};

const S4_DEV: SemesterData = {
  id: 'S4-DEV',
  name: 'Semestre 4 (Dev)',
  competencies: [
    { id: 'C4.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 4, saeCoefficient: 6 },
    { id: 'C4.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 4, saeCoefficient: 6 },
    { id: 'C4.3', name: 'Exprimer', color: COLORS[2], ects: 6, resourceCoefficient: 8, saeCoefficient: 12 },
    { id: 'C4.4', name: 'Développer', color: COLORS[3], ects: 10, resourceCoefficient: 16, saeCoefficient: 24 },
    { id: 'C4.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 6, saeCoefficient: 8 },
  ],
  modules: [
    { id: 'S4-DEV-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.2', coefficient: 1 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-DEV-R2', name: 'Eco, gestion, droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-DEV-R3', name: 'Design expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 4 }, { competenceId: 'C4.2', coefficient: 3 }] },
    { id: 'S4-DEV-R4', name: 'Expr. Com. Rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-DEV-R5', name: 'Création & Design Interactif', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 8 }] },
    { id: 'S4-DEV-R6', name: 'Développement Front', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 6 }] },
    { id: 'S4-DEV-R7', name: 'Développement Back', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 6 }] },
    { id: 'S4-DEV-R8', name: 'Déploiement de services', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 4 }] },
    // SAE
    { id: 'S4-DEV-SAE1', name: 'Développer pour le web', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.4', coefficient: 6 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-DEV-SAE2', name: 'Dispositif Interactif', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 2 }] },
    { id: 'S4-DEV-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 8 }, { competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-DEV-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 8 }, { competenceId: 'C4.5', coefficient: 3 }] }
  ]
};

const S5_DEV: SemesterData = {
  id: 'S5-DEV',
  name: 'Semestre 5 (Dev)',
  competencies: [
    { id: 'C5.4', name: 'Développer', color: COLORS[3], ects: 20, resourceCoefficient: 10, saeCoefficient: 10 },
    { id: 'C5.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 4, saeCoefficient: 4 },
  ],
  modules: [
    { id: 'S5-DEV-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-DEV-R2', name: 'Mgmt et Assurance Qualité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-DEV-R3', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-DEV-R4', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-DEV-R5', name: 'Dev Front Avancé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 2 }] },
    { id: 'S5-DEV-R6', name: 'Dev Back Avancé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 2 }] },
    { id: 'S5-DEV-R7', name: 'Dispositifs Interactifs', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 2 }] },
    { id: 'S5-DEV-R8', name: 'Hébergement & Cybersécurité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 2 }] },
    // SAE
    { id: 'S5-DEV-SAE1', name: 'Dev Web ou Dispositif Interactif', type: ModuleType.SAE, weightings: [{ competenceId: 'C5.4', coefficient: 10 }, { competenceId: 'C5.5', coefficient: 4 }] },
  ]
};

const S6_DEV: SemesterData = {
  id: 'S6-DEV',
  name: 'Semestre 6 (Dev)',
  competencies: [
    { id: 'C6.4', name: 'Développer', color: COLORS[3], ects: 20, resourceCoefficient: 2, saeCoefficient: 2 },
    { id: 'C6.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 2, saeCoefficient: 2 },
  ],
  modules: [
    { id: 'S6-DEV-R1', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-DEV-R2', name: 'Dev Web et Dispositif Interactif', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.4', coefficient: 2 }, { competenceId: 'C6.5', coefficient: 1 }] },
    // SAE
    { id: 'S6-DEV-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.4', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-DEV-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.4', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
  ]
};

// ==========================================
// PARCOURS: CRÉATION NUMÉRIQUE
// ==========================================

const S3_CN_STRAT: SemesterData = {
  id: 'S3-CN',
  name: 'Semestre 3',
  competencies: [
    { id: 'C3.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 7.5, saeCoefficient: 6 },
    { id: 'C3.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 7.5, saeCoefficient: 5 },
    { id: 'C3.3', name: 'Exprimer', color: COLORS[2], ects: 8, resourceCoefficient: 19.5, saeCoefficient: 12 },
    { id: 'C3.4', name: 'Développer', color: COLORS[3], ects: 8, resourceCoefficient: 16.5, saeCoefficient: 12 },
    { id: 'C3.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 12, saeCoefficient: 10 },
  ],
  modules: [
    { id: 'S3-CN-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 1 }, { competenceId: 'C3.5', coefficient: 2 }] },
    { id: 'S3-CN-R1bis', name: 'Anglais renforcé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 1 }, { competenceId: 'C3.5', coefficient: 1 }] },
    { id: 'S3-CN-R2', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 1 }] },
    { id: 'S3-CN-R3', name: 'Culture numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-CN-R4', name: 'Stratégie Com & Marketing', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-CN-R5', name: 'Référencement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-CN-R6', name: 'Expression & Rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.5', coefficient: 3 }] },
    { id: 'S3-CN-R7', name: 'Ecriture Multimédia', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 2 }] },
    { id: 'S3-CN-R8', name: 'Création & Design Interactif', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 3 }] },
    { id: 'S3-CN-R9', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 4 }] },
    { id: 'S3-CN-R10', name: 'Audiovisuel & Motion', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 6 }] },
    { id: 'S3-CN-R11', name: 'Dev Front & Intégration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 7 }] },
    { id: 'S3-CN-R12', name: 'Gestion de contenus avancée', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 4 }] },
    { id: 'S3-CN-R13', name: 'Déploiement services', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 4 }] },
    { id: 'S3-CN-R14', name: 'Représentation de l\'info', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 2 }] },
    { id: 'S3-CN-R15', name: 'Gestion de projets', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 1 }, { competenceId: 'C3.5', coefficient: 2 }] },
    { id: 'S3-CN-R16', name: 'Eco, gestion, droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.5', coefficient: 3 }] },
    { id: 'S3-CN-R17', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 0.5 }, { competenceId: 'C3.2', coefficient: 0.5 }, { competenceId: 'C3.3', coefficient: 0.5 }, { competenceId: 'C3.4', coefficient: 0.5 }, { competenceId: 'C3.5', coefficient: 1 }] },
    // SAE
    { id: 'S3-CN-SAE1', name: 'Expérience utilisateur', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 2 }, { competenceId: 'C3.4', coefficient: 8 }, { competenceId: 'C3.5', coefficient: 5 }] },
    { id: 'S3-CN-SAE2', name: 'Prod. contenus plurimédia', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 3 }, { competenceId: 'C3.3', coefficient: 7 }, { competenceId: 'C3.5', coefficient: 5 }] },
    { id: 'S3-CN-SAE3', name: 'Visualisation de données', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 5 }, { competenceId: 'C3.4', coefficient: 4 }] }
  ]
};

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
    { id: 'S4-CN-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-CN-R2', name: 'Eco, gestion, droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-CN-R3', name: 'Design expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 8 }, { competenceId: 'C4.2', coefficient: 8 }, { competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-CN-R4', name: 'Expr. Com. Rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-CN-R5', name: 'Gestion de contenus spécialisée', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 8 }] },
    { id: 'S4-CN-R6', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    { id: 'S4-CN-R7', name: 'Audiovisuel - Motion design', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    { id: 'S4-CN-R8', name: 'Écriture multimédia', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    // SAE
    { id: 'S4-CN-SAE1', name: 'Créer pour une campagne', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 6 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-CN-SAE2', name: 'Produire du contenu', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-CN-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 4 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 9 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 4 }] },
    { id: 'S4-CN-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 4 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 9 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 4 }] }
  ]
};

const S5_CN: SemesterData = {
  id: 'S5-CN',
  name: 'Semestre 5 (Créa)',
  competencies: [
    { id: 'C5.3', name: 'Exprimer', color: COLORS[2], ects: 20, resourceCoefficient: 10, saeCoefficient: 10 },
    { id: 'C5.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 4, saeCoefficient: 4 },
  ],
  modules: [
    { id: 'S5-CN-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-CN-R2', name: 'Mgmt et Assurance Qualité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-CN-R3', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-CN-R4', name: 'Projet personnel', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-CN-R5', name: 'Définir une direction artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 2 }] },
    { id: 'S5-CN-R6', name: 'Création numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 3 }] },
    { id: 'S5-CN-R7', name: 'Ecriture multimédia', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 3 }] },
    // SAE
    { id: 'S5-CN-SAE1', name: 'Créer par/pour le numérique', type: ModuleType.SAE, weightings: [{ competenceId: 'C5.3', coefficient: 10 }, { competenceId: 'C5.5', coefficient: 4 }] },
  ]
};

const S6_CN: SemesterData = {
  id: 'S6-CN',
  name: 'Semestre 6 (Créa)',
  competencies: [
    { id: 'C6.3', name: 'Exprimer', color: COLORS[2], ects: 20, resourceCoefficient: 2, saeCoefficient: 2 },
    { id: 'C6.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 2, saeCoefficient: 2 },
  ],
  modules: [
    { id: 'S6-CN-R1', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-CN-R2', name: 'Création numérique interactive', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.3', coefficient: 2 }, { competenceId: 'C6.5', coefficient: 1 }] },
    // SAE
    { id: 'S6-CN-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.3', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-CN-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.3', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
  ]
};

// ==========================================
// PARCOURS: STRATÉGIE DE COMMUNICATION
// ==========================================

// Re-using S3_CN_STRAT for S3 Strategy as they share the same structure in the official reference
const S3_STRAT = { ...S3_CN_STRAT, id: 'S3-STRAT', name: 'Semestre 3 (Strat)' };

const S4_STRAT: SemesterData = {
  id: 'S4-STRAT',
  name: 'Semestre 4 (Strat)',
  competencies: [
    { id: 'C4.1', name: 'Comprendre', color: COLORS[0], ects: 6, resourceCoefficient: 5, saeCoefficient: 6 },
    { id: 'C4.2', name: 'Concevoir', color: COLORS[1], ects: 8, resourceCoefficient: 12, saeCoefficient: 12 },
    { id: 'C4.3', name: 'Exprimer', color: COLORS[2], ects: 5, resourceCoefficient: 4, saeCoefficient: 6 },
    { id: 'C4.4', name: 'Développer', color: COLORS[3], ects: 5, resourceCoefficient: 6, saeCoefficient: 6 },
    { id: 'C4.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 6, saeCoefficient: 6 },
  ],
  modules: [
    { id: 'S4-STRAT-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-STRAT-R2', name: 'Eco, gestion, droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-STRAT-R3', name: 'Design expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 3 }, { competenceId: 'C4.2', coefficient: 4 }] },
    { id: 'S4-STRAT-R4', name: 'Expr. Com. Rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-STRAT-R5', name: 'Stratégie de communication', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 6 }] },
    { id: 'S4-STRAT-R6', name: 'Storytelling', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 4 }] },
    { id: 'S4-STRAT-R7', name: 'Gestion de contenus spécialisée', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 6 }] },
    // SAE
    { id: 'S4-STRAT-SAE1', name: 'Solution ecommerce', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 1 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.4', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 1 }] },
    { id: 'S4-STRAT-SAE2', name: 'Communication médias sociaux', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 1 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 1 }] },
    { id: 'S4-STRAT-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 2 }, { competenceId: 'C4.4', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-STRAT-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 2 }, { competenceId: 'C4.4', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 2 }] }
  ]
};

const S5_STRAT: SemesterData = {
  id: 'S5-STRAT',
  name: 'Semestre 5 (Strat)',
  competencies: [
    { id: 'C5.2', name: 'Concevoir', color: COLORS[1], ects: 20, resourceCoefficient: 11, saeCoefficient: 8 },
    { id: 'C5.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 4, saeCoefficient: 4 },
  ],
  modules: [
    { id: 'S5-STRAT-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-STRAT-R2', name: 'Mgmt et Assurance Qualité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-STRAT-R3', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-STRAT-R4', name: 'Projet personnel', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-STRAT-R5', name: 'Stratégie de communication', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 3 }] },
    { id: 'S5-STRAT-R6', name: 'Webmarketing', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 3 }] },
    { id: 'S5-STRAT-R7', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 3 }] },
    // SAE
    { id: 'S5-STRAT-SAE1', name: 'Stratégie de communication', type: ModuleType.SAE, weightings: [{ competenceId: 'C5.2', coefficient: 8 }, { competenceId: 'C5.5', coefficient: 4 }] },
  ]
};

const S6_STRAT: SemesterData = {
  id: 'S6-STRAT',
  name: 'Semestre 6 (Strat)',
  competencies: [
    { id: 'C6.2', name: 'Concevoir', color: COLORS[1], ects: 20, resourceCoefficient: 2, saeCoefficient: 2 },
    { id: 'C6.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 3, saeCoefficient: 2 },
  ],
  modules: [
    { id: 'S6-STRAT-R1', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-STRAT-R2', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.2', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-STRAT-R3', name: 'Stratégie pluri-média', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.2', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    // SAE
    { id: 'S6-STRAT-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.2', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-STRAT-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.2', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
  ]
};

export const TRACKS: Track[] = [
  {
    id: 'dev',
    name: 'Développement Web',
    semesters: [S1, S2, S3_DEV, S4_DEV, S5_DEV, S6_DEV]
  },
  {
    id: 'crea',
    name: 'Création Numérique',
    semesters: [S1, S2, S3_CN_STRAT, S4_CN, S5_CN, S6_CN]
  },
  {
    id: 'strat',
    name: 'Stratégie de Communication',
    semesters: [S1, S2, S3_STRAT, S4_STRAT, S5_STRAT, S6_STRAT]
  },
];
