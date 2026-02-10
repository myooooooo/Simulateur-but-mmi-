
import { SemesterData, ModuleType, Track } from './types';

// Palette de couleurs pour les compétences
const COLORS = [
  '#3b82f6', // bleu (C1/C2.1)
  '#10b981', // émeraude (C1/C2.2)
  '#8b5cf6', // violet (C1/C2.3)
  '#f59e0b', // ambre (C1/C2.4)
  '#ef4444', // rouge (C1/C2.5)
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
    { id: 'S1-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 1 }, { competenceId: 'C1.2', coefficient: 1 }, { competenceId: 'C1.5', coefficient: 1 }] },
    { id: 'S1-R1b', name: 'Anglais renforcé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.3', coefficient: 1 }, { competenceId: 'C1.5', coefficient: 1 }] },
    { id: 'S1-R2', name: 'Ergonomie et accessibilité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 3 }] },
    { id: 'S1-R3', name: 'Culture numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 3 }] },
    { id: 'S1-R4', name: 'Stratégie de communication', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 2 }, { competenceId: 'C1.2', coefficient: 3 }] },
    { id: 'S1-R5', name: 'Expression et rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.2', coefficient: 2 }, { competenceId: 'C1.5', coefficient: 2 }] },
    { id: 'S1-R6', name: 'Écriture multimédia', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.3', coefficient: 3 }] },
    { id: 'S1-R7', name: 'Production graphique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.3', coefficient: 4 }] },
    { id: 'S1-R8', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 1 }, { competenceId: 'C1.2', coefficient: 2 }] },
    { id: 'S1-R9', name: 'Production audio/vidéo', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.3', coefficient: 4 }] },
    { id: 'S1-R10', name: 'Intégration web', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.4', coefficient: 5 }] },
    { id: 'S1-R11', name: 'Développement web', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.4', coefficient: 4 }] },
    { id: 'S1-R12', name: 'Hébergement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.4', coefficient: 3 }] },
    { id: 'S1-R13', name: 'Traitement de l\'info', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 1 }, { competenceId: 'C1.3', coefficient: 3 }] },
    { id: 'S1-R14', name: 'Gestion de projet', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.5', coefficient: 3 }] },
    { id: 'S1-R15', name: 'Économie et droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 2 }, { competenceId: 'C1.5', coefficient: 1 }] },
    { id: 'S1-R16', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C1.1', coefficient: 0.5 }, { competenceId: 'C1.2', coefficient: 0.5 }, { competenceId: 'C1.3', coefficient: 0.5 }, { competenceId: 'C1.4', coefficient: 0.5 }, { competenceId: 'C1.5', coefficient: 4 }] },
    { id: 'S1-SAE1', name: 'Audit communication', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.1', coefficient: 9 }] },
    { id: 'S1-SAE2', name: 'Recommandation strat.', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.2', coefficient: 6 }] },
    { id: 'S1-SAE3', name: 'Design graphique (SAE)', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.3', coefficient: 7 }] },
    { id: 'S1-SAE4', name: 'Production AV (SAE)', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.3', coefficient: 7 }] },
    { id: 'S1-SAE5', name: 'Produire site web', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.4', coefficient: 12 }] },
    { id: 'S1-SAE6', name: 'Gestion projet (SAE)', type: ModuleType.SAE, weightings: [{ competenceId: 'C1.5', coefficient: 10 }] },
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
    { id: 'S2-R2', name: 'Ergonomie', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.1', coefficient: 3 }] },
    { id: 'S2-R3', name: 'Culture numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.1', coefficient: 3 }] },
    { id: 'S2-R4', name: 'Stratégie com.', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.2', coefficient: 3 }] },
    { id: 'S2-R5', name: 'Expression/Rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.5', coefficient: 3 }] },
    { id: 'S2-R6', name: 'Écriture multimédia', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.3', coefficient: 3 }] },
    { id: 'S2-R7', name: 'Prod graphique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.3', coefficient: 4 }] },
    { id: 'S2-R8', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.3', coefficient: 3 }] },
    { id: 'S2-R9', name: 'Prod audio/vidéo', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.3', coefficient: 4 }] },
    { id: 'S2-R10', name: 'Gestion contenus', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 2 }] },
    { id: 'S2-R11', name: 'Intégration web', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 4 }] },
    { id: 'S2-R12', name: 'Développement web', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 4 }] },
    { id: 'S2-R13', name: 'Système info', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 3 }] },
    { id: 'S2-R14', name: 'Hébergement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.4', coefficient: 3 }] },
    { id: 'S2-R15', name: 'Traitement info', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.1', coefficient: 1 }, { competenceId: 'C2.3', coefficient: 2 }] },
    { id: 'S2-R16', name: 'Gestion projet', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.5', coefficient: 3 }] },
    { id: 'S2-R17', name: 'Éco et Droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.5', coefficient: 3 }] },
    { id: 'S2-R18', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C2.1', coefficient: 0.5 }, { competenceId: 'C2.2', coefficient: 0.5 }, { competenceId: 'C2.3', coefficient: 0.5 }, { competenceId: 'C2.4', coefficient: 0.5 }, { competenceId: 'C2.5', coefficient: 4 }] },
    { id: 'S2-SAE1', name: 'Exploration usages', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.1', coefficient: 4 }] },
    { id: 'S2-SAE2', name: 'Conception produit/com', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.2', coefficient: 5 }, { competenceId: 'C2.3', coefficient: 12 }, { competenceId: 'C2.4', coefficient: 2 }, { competenceId: 'C2.5', coefficient: 3 }] },
    { id: 'S2-SAE3', name: 'Web et bases de données', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.4', coefficient: 10 }] },
    { id: 'S2-SAE4', name: 'Présence en ligne', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.5', coefficient: 6 }] },
    { id: 'S2-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C2.1', coefficient: 1 }, { competenceId: 'C2.2', coefficient: 1 }, { competenceId: 'C2.3', coefficient: 1 }, { competenceId: 'C2.4', coefficient: 1 }, { competenceId: 'C2.5', coefficient: 1 }] },
  ]
};

// --- HELPER S3 GÉNÉRIQUE (Mêmes coeffs pour les 3 parcours) ---
const getS3 = (pathId: string, pathName: string): SemesterData => ({
  id: `S3-${pathId}`,
  name: `Semestre 3 (${pathName})`,
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
    { id: 'S3-R4', name: 'Stratégie com & marketing', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-R5', name: 'Référencement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 1 }, { competenceId: 'C3.2', coefficient: 2 }] },
    { id: 'S3-R6', name: 'Expression & Rhétorique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.5', coefficient: 3 }] },
    { id: 'S3-R7', name: 'Écriture multimédia', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 2 }] },
    { id: 'S3-R8', name: 'Création interactive', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 3 }] },
    { id: 'S3-R9', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 4 }] },
    { id: 'S3-R10', name: 'Audiovisuel/Motion', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.3', coefficient: 6 }] },
    { id: 'S3-R11', name: 'Dev Front / Intégration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 7 }] },
    { id: 'S3-R12', name: 'Gestion contenus', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 4 }] },
    { id: 'S3-R13', name: 'Déploiement services', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 4 }] },
    { id: 'S3-R14', name: 'Représentation info', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 2 }] },
    { id: 'S3-R15', name: 'Gestion projets', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.4', coefficient: 1 }, { competenceId: 'C3.5', coefficient: 2 }] },
    { id: 'S3-R16', name: 'Éco/Gestion/Droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.5', coefficient: 3 }] },
    { id: 'S3-R17', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C3.1', coefficient: 0.5 }, { competenceId: 'C3.2', coefficient: 0.5 }, { competenceId: 'C3.3', coefficient: 0.5 }, { competenceId: 'C3.4', coefficient: 0.5 }, { competenceId: 'C3.5', coefficient: 1 }] },
    { id: 'S3-SAE1', name: 'SAE Expérience Utilisateur', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.2', coefficient: 2 }, { competenceId: 'C3.4', coefficient: 8 }, { competenceId: 'C3.5', coefficient: 5 }] },
    { id: 'S3-SAE2', name: 'SAE Com Plurimédia', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 7 }, { competenceId: 'C3.2', coefficient: 3 }, { competenceId: 'C3.5', coefficient: 5 }] },
    { id: 'S3-SAE3', name: 'SAE Visualisation données', type: ModuleType.SAE, weightings: [{ competenceId: 'C3.1', coefficient: 2 }, { competenceId: 'C3.3', coefficient: 5 }, { competenceId: 'C3.4', coefficient: 4 }] },
  ]
});

// --- SEMESTRE 4 CRÉA ---
const S4_CN: SemesterData = {
  id: 'S4-CN',
  name: 'Semestre 4 (Création Numérique)',
  competencies: [
    { id: 'C4.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 8, saeCoefficient: 10 },
    { id: 'C4.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 8, saeCoefficient: 12 },
    { id: 'C4.3', name: 'Exprimer', color: COLORS[2], ects: 10, resourceCoefficient: 22, saeCoefficient: 28 },
    { id: 'C4.4', name: 'Développer', color: COLORS[3], ects: 6, resourceCoefficient: 8, saeCoefficient: 12 },
    { id: 'C4.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 12, saeCoefficient: 12 },
  ],
  modules: [
    { id: 'S4-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-R2', name: 'Éco/Gestion/Droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-R3', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 8 }, { competenceId: 'C4.2', coefficient: 8 }, { competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-R4', name: 'Expression/Droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-R5', name: 'Gestion contenus spéc.', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 8 }] },
    { id: 'S4-R6', name: 'Culture artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    { id: 'S4-R7', name: 'Audiovisuel/Motion', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    { id: 'S4-R8', name: 'Écriture multimédia', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 6 }] },
    { id: 'S4-SAE1', name: 'SAE Campagne Visuelle', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 6 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-SAE2', name: 'SAE Contenu Multimédia', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 4 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 9 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 4 }] },
    { id: 'S4-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 4 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 9 }, { competenceId: 'C4.4', coefficient: 4 }, { competenceId: 'C4.5', coefficient: 4 }] },
  ]
};

// --- SEMESTRE 4 DEV ---
const S4_DW: SemesterData = {
  id: 'S4-DW',
  name: 'Semestre 4 (Développement Web)',
  competencies: [
    { id: 'C4.1', name: 'Comprendre', color: COLORS[0], ects: 4, resourceCoefficient: 4, saeCoefficient: 6 },
    { id: 'C4.2', name: 'Concevoir', color: COLORS[1], ects: 4, resourceCoefficient: 4, saeCoefficient: 6 },
    { id: 'C4.3', name: 'Exprimer', color: COLORS[2], ects: 6, resourceCoefficient: 8, saeCoefficient: 12 },
    { id: 'C4.4', name: 'Développer', color: COLORS[3], ects: 10, resourceCoefficient: 16, saeCoefficient: 24 },
    { id: 'C4.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 6, saeCoefficient: 8 },
  ],
  modules: [
    { id: 'S4-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.2', coefficient: 1 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-R2', name: 'Économie/Gestion/Droit', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-R3', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 4 }, { competenceId: 'C4.2', coefficient: 3 }] },
    { id: 'S4-R4', name: 'Expression', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-R5', name: 'Création interactif', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 8 }] },
    { id: 'S4-R6', name: 'Dev Front', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 6 }] },
    { id: 'S4-R7', name: 'Dev Back', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 6 }] },
    { id: 'S4-R8', name: 'Déploiement', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 4 }] },
    { id: 'S4-SAE1', name: 'SAE Développement Web', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.4', coefficient: 6 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-SAE2', name: 'SAE Dispositif interactif', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 8 }, { competenceId: 'C4.5', coefficient: 3 }] },
    { id: 'S4-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 4 }, { competenceId: 'C4.4', coefficient: 8 }, { competenceId: 'C4.5', coefficient: 3 }] },
  ]
};

// --- SEMESTRE 4 STRAT ---
const S4_SC: SemesterData = {
  id: 'S4-SC',
  name: 'Semestre 4 (Stratégie)',
  competencies: [
    { id: 'C4.1', name: 'Comprendre', color: COLORS[0], ects: 6, resourceCoefficient: 5, saeCoefficient: 6 },
    { id: 'C4.2', name: 'Concevoir', color: COLORS[1], ects: 8, resourceCoefficient: 12, saeCoefficient: 12 },
    { id: 'C4.3', name: 'Exprimer', color: COLORS[2], ects: 5, resourceCoefficient: 4, saeCoefficient: 6 },
    { id: 'C4.4', name: 'Développer', color: COLORS[3], ects: 5, resourceCoefficient: 6, saeCoefficient: 6 },
    { id: 'C4.5', name: 'Entreprendre', color: COLORS[4], ects: 6, resourceCoefficient: 6, saeCoefficient: 6 },
  ],
  modules: [
    { id: 'S4-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-R2', name: 'Éco', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-R3', name: 'Design d\'expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 3 }, { competenceId: 'C4.2', coefficient: 4 }] },
    { id: 'S4-R4', name: 'Expression', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-R5', name: 'Strat & Webmarketing', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 6 }] },
    { id: 'S4-R6', name: 'Storytelling', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.3', coefficient: 4 }] },
    { id: 'S4-R7', name: 'Gestion contenus', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C4.4', coefficient: 6 }] },
    { id: 'S4-SAE1', name: 'SAE Ecommerce', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 1 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.4', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 1 }] },
    { id: 'S4-SAE2', name: 'SAE Médias Sociaux', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 1 }, { competenceId: 'C4.2', coefficient: 2 }, { competenceId: 'C4.3', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 1 }] },
    { id: 'S4-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 2 }, { competenceId: 'C4.4', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 2 }] },
    { id: 'S4-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C4.1', coefficient: 2 }, { competenceId: 'C4.2', coefficient: 4 }, { competenceId: 'C4.3', coefficient: 2 }, { competenceId: 'C4.4', coefficient: 2 }, { competenceId: 'C4.5', coefficient: 2 }] },
  ]
};

// --- TROISIÈME ANNÉE (S5 & S6) ---
const S5_CN: SemesterData = {
  id: 'S5-CN', name: 'Semestre 5 (Création Numérique)',
  competencies: [
    { id: 'C5.3', name: 'Exprimer', color: COLORS[2], ects: 20, resourceCoefficient: 10, saeCoefficient: 10 },
    { id: 'C5.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 4, saeCoefficient: 4 },
  ],
  modules: [
    { id: 'S5-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R2', name: 'Management / Qualité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R3', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R4', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R5', name: 'Direction Artistique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 2 }] },
    { id: 'S5-R6', name: 'Création Numérique', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 3 }] },
    { id: 'S5-R7', name: 'Écriture et Narration', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.3', coefficient: 3 }] },
    { id: 'S5-SAE1', name: 'SAE Créer pour le numérique', type: ModuleType.SAE, weightings: [{ competenceId: 'C5.3', coefficient: 10 }, { competenceId: 'C5.5', coefficient: 4 }] },
  ]
};

const S6_CN: SemesterData = {
  id: 'S6-CN', name: 'Semestre 6 (Création Numérique)',
  competencies: [
    { id: 'C6.3', name: 'Exprimer', color: COLORS[2], ects: 20, resourceCoefficient: 2, saeCoefficient: 2 },
    { id: 'C6.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 2, saeCoefficient: 2 },
  ],
  modules: [
    { id: 'S6-R1', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-R2', name: 'Création interactive', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.3', coefficient: 2 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.3', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.3', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
  ]
};

// S5/S6 DW
const S5_DW: SemesterData = {
  id: 'S5-DW', name: 'Semestre 5 (Développement Web)',
  competencies: [
    { id: 'C5.4', name: 'Développer', color: COLORS[3], ects: 20, resourceCoefficient: 10, saeCoefficient: 10 },
    { id: 'C5.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 4, saeCoefficient: 4 },
  ],
  modules: [
    { id: 'S5-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R2', name: 'Management', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R3', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R4', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R5', name: 'Front Avancé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 2 }] },
    { id: 'S5-R6', name: 'Back Avancé', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 2 }] },
    { id: 'S5-R7', name: 'Interactif', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 2 }] },
    { id: 'S5-R8', name: 'Cybersécurité', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.4', coefficient: 2 }] },
    { id: 'S5-SAE1', name: 'SAE Développement Web', type: ModuleType.SAE, weightings: [{ competenceId: 'C5.4', coefficient: 10 }, { competenceId: 'C5.5', coefficient: 4 }] },
  ]
};

const S6_DW: SemesterData = {
  id: 'S6-DW', name: 'Semestre 6 (Développement Web)',
  competencies: [
    { id: 'C6.4', name: 'Développer', color: COLORS[3], ects: 20, resourceCoefficient: 2, saeCoefficient: 2 },
    { id: 'C6.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 2, saeCoefficient: 2 },
  ],
  modules: [
    { id: 'S6-R1', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-R2', name: 'Dispositif interactif', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.4', coefficient: 2 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.4', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.4', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
  ]
};

// S5/S6 SC
const S5_SC: SemesterData = {
  id: 'S5-SC', name: 'Semestre 5 (Stratégie)',
  competencies: [
    { id: 'C5.2', name: 'Concevoir', color: COLORS[1], ects: 20, resourceCoefficient: 11, saeCoefficient: 8 },
    { id: 'C5.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 4, saeCoefficient: 4 },
  ],
  modules: [
    { id: 'S5-R1', name: 'Anglais', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R2', name: 'Management', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R3', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R4', name: 'PPP', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 1 }, { competenceId: 'C5.5', coefficient: 1 }] },
    { id: 'S5-R5', name: 'Stratégie Com.', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 3 }] },
    { id: 'S5-R6', name: 'Webmarketing', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 3 }] },
    { id: 'S5-R7', name: 'Design Expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C5.2', coefficient: 3 }] },
    { id: 'S5-SAE1', name: 'SAE Stratégie Com.', type: ModuleType.SAE, weightings: [{ competenceId: 'C5.2', coefficient: 8 }, { competenceId: 'C5.5', coefficient: 4 }] },
  ]
};

const S6_SC: SemesterData = {
  id: 'S6-SC', name: 'Semestre 6 (Stratégie)',
  competencies: [
    { id: 'C6.2', name: 'Concevoir', color: COLORS[1], ects: 20, resourceCoefficient: 2, saeCoefficient: 2 },
    { id: 'C6.5', name: 'Entreprendre', color: COLORS[4], ects: 10, resourceCoefficient: 3, saeCoefficient: 2 },
  ],
  modules: [
    { id: 'S6-R1', name: 'Entrepreneuriat', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-R2', name: 'Design Expérience', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.2', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-R3', name: 'Stratégie Pluri-média', type: ModuleType.RESOURCE, weightings: [{ competenceId: 'C6.2', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-PORT', name: 'Portfolio', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.2', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
    { id: 'S6-STG', name: 'Stage', type: ModuleType.SAE, weightings: [{ competenceId: 'C6.2', coefficient: 1 }, { competenceId: 'C6.5', coefficient: 1 }] },
  ]
};

export const TRACKS: Track[] = [
  {
    id: 'crea',
    name: 'Création Numérique',
    semesters: [S1, S2, getS3('crea', 'Création Numérique'), S4_CN, S5_CN, S6_CN]
  },
  {
    id: 'dw',
    name: 'Développement Web',
    semesters: [S1, S2, getS3('dw', 'Développement Web'), S4_DW, S5_DW, S6_DW]
  },
  {
    id: 'sc',
    name: 'Stratégie de Communication',
    semesters: [S1, S2, getS3('sc', 'Stratégie de Communication'), S4_SC, S5_SC, S6_SC]
  },
];
