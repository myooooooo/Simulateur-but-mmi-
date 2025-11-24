export enum ModuleType {
  RESOURCE = 'Ressource',
  SAE = 'SAÉ'
}

export interface Weighting {
  competenceId: string;
  coefficient: number;
}

export interface Module {
  id: string;
  name: string;
  type: ModuleType;
  weightings: Weighting[]; // A module can contribute to multiple competencies
}

export interface Competence {
  id: string; // e.g., "C1.1"
  name: string; // e.g., "Comprendre"
  color: string;
  ects: number; // ECTS credits
}

export interface SemesterData {
  id: string;
  name: string;
  competencies: Competence[];
  modules: Module[];
}

export interface Track {
  id: string;
  name: string;
  semesters: SemesterData[];
}

// Map of module ID to grade (0-20)
export type GradeMap = Record<string, number>;