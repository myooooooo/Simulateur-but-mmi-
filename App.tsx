import React, { useState, useMemo, useEffect } from 'react';
import { TRACKS } from './constants';
import { GradeMap, ModuleType, SemesterData, Competence } from './types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import { RotateCcw, Award, AlertCircle, ChevronRight, Calculator, Menu, X, Save, AlertTriangle, FileDown, FileUp, Download, Upload, Printer, GraduationCap, Terminal, Palette, Presentation, Wand2, CalendarDays, User, BookOpen, Clock, Power, ArrowLeft, Home, Trash2, FileJson, FileText } from 'lucide-react';

// --- Utility functions ---

const calculateCompetenceAverage = (comp: Competence, semester: SemesterData, grades: GradeMap) => {
  let totalScore = 0;
  let totalCoeff = 0;

  semester.modules.forEach(mod => {
    const weighting = mod.weightings.find(w => w.competenceId === comp.id);
    if (weighting) {
      const grade = grades[mod.id];
      if (grade !== undefined) {
        totalScore += grade * weighting.coefficient;
        totalCoeff += weighting.coefficient;
      }
    }
  });

  if (totalCoeff === 0) return 0;
  return parseFloat((totalScore / totalCoeff).toFixed(2));
};

const calculateSemesterGlobalAverage = (semester: SemesterData, grades: GradeMap) => {
  let totalEctsPoints = 0;
  let totalEcts = 0;

  semester.competencies.forEach(comp => {
    const avg = calculateCompetenceAverage(comp, semester, grades);
    totalEctsPoints += avg * comp.ects;
    totalEcts += comp.ects;
  });

  return totalEcts === 0 ? 0 : parseFloat((totalEctsPoints / totalEcts).toFixed(2));
};

// Helper to clean text for fuzzy matching
const normalizeText = (text: string) => {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]/g, ""); // Remove special chars
};

// --- Components ---

// --- Print Header Component ---
const PrintHeader = ({ trackName, semesterName, globalAvg, isValidated, admissionText }: { trackName: string, semesterName: string, globalAvg: number, isValidated: boolean, admissionText: string }) => (
  <div className="hidden print-only mb-8 border-b-2 border-slate-900 pb-6">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <div className="p-3 border-2 border-slate-900 rounded-lg">
           <Calculator className="w-8 h-8 text-slate-900" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-slate-900 leading-none">Relevé de notes</h1>
          <h2 className="text-lg font-bold text-slate-600 mt-1">Simulation BUT MMI</h2>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-slate-500 font-medium uppercase tracking-widest mb-1">Date d'édition</div>
        <div className="text-base font-bold text-slate-900">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
    </div>
    
    <div className="mt-8 flex justify-between items-end bg-slate-50 p-4 rounded-lg border border-slate-200">
      <div>
        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Parcours & Semestre</div>
        <div className="text-xl font-bold text-slate-900">{trackName}</div>
        <div className="text-2xl font-black text-blue-600 mt-1">{semesterName}</div>
      </div>
      <div className="text-right">
        <div className="text-sm uppercase font-bold text-slate-400 mb-1">Moyenne Générale</div>
        <div className="text-4xl font-black text-slate-900 leading-none">{globalAvg.toFixed(2)} <span className="text-xl text-slate-400 font-medium">/ 20</span></div>
        <div className={`text-sm font-bold mt-2 uppercase tracking-wide px-2 py-1 rounded inline-block ${isValidated ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
           {admissionText}
        </div>
      </div>
    </div>
  </div>
);

// --- Top Bar (Global Header) ---
const TopBar = ({ onGoHome }: { onGoHome: () => void }) => (
  <header className="bg-[#2196F3] text-white h-16 flex items-center justify-between px-4 shadow-md z-50 relative print:hidden">
    <div className="flex items-center gap-4">
      <button onClick={onGoHome} className="p-2 hover:bg-white/10 rounded-full transition-colors">
         <Home className="w-6 h-6" />
      </button>
      <div className="flex flex-col items-center justify-center leading-tight cursor-pointer" onClick={onGoHome}>
        {/* Simulated Logo based on screenshot */}
        <div className="bg-white text-[#C62828] font-bold px-1 text-[10px] rounded-sm w-fit self-start">iut</div>
        <div className="text-[10px] font-bold opacity-90 uppercase tracking-tighter">DIJON - AUXERRE - NEVERS</div>
        <div className="text-[8px] uppercase tracking-widest opacity-80 scale-75 origin-left">Université Bourgogne</div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Se déconnecter">
        <Power className="w-6 h-6" />
      </button>
    </div>
  </header>
);

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (trackId: string, semesterId: string) => void;
  isEditMode?: boolean;
  onClose?: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete, isEditMode = false, onClose }) => {
  if (!isOpen) return null;

  const options = [
    { 
      id: '1annee', 
      label: 'Je suis en 1ère année', 
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />, 
      trackId: 'dev', // Default underlying track, S1/S2 are identical
      semesterId: 'S1', 
      desc: 'Tronc commun (S1 & S2)' 
    },
    { 
      id: 'dev', 
      label: 'Développement Web', 
      icon: <Terminal className="w-8 h-8 text-emerald-600" />, 
      trackId: 'dev', 
      semesterId: 'S3-DEV', 
      desc: 'Parcours Dev (Dès le S3)' 
    },
    { 
      id: 'crea', 
      label: 'Création Numérique', 
      icon: <Palette className="w-8 h-8 text-purple-600" />, 
      trackId: 'crea', 
      semesterId: 'S3-CN', 
      desc: 'Parcours Créa (Dès le S3)' 
    },
    { 
      id: 'strat', 
      label: 'Stratégie de Com', 
      icon: <Presentation className="w-8 h-8 text-amber-600" />, 
      trackId: 'strat', 
      semesterId: 'S3-STRAT', 
      desc: 'Parcours Strat (Dès le S3)' 
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300 no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200">
        <div className="bg-[#2196F3] p-6 text-center border-b border-blue-600 relative">
           {isEditMode && onClose && (
             <button onClick={onClose} className="absolute right-4 top-4 text-white hover:bg-white/20 p-1 rounded-full">
               <X className="w-5 h-5" />
             </button>
           )}
           <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
             <User className="w-6 h-6 text-white" />
             {isEditMode ? 'Modifier mon dossier' : 'Bienvenue sur le Simulateur'}
           </h2>
           <p className="text-blue-100 text-sm">{isEditMode ? 'Changez de parcours ou d\'année' : 'Pour commencer, veuillez sélectionner votre situation actuelle.'}</p>
        </div>
        
        <div className="p-8 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onComplete(opt.trackId, opt.semesterId)}
                className="flex items-center p-4 rounded-xl border-2 border-white bg-white shadow-sm hover:border-[#2196F3] hover:shadow-md hover:scale-[1.02] transition-all group text-left h-24"
              >
                <div className="bg-slate-50 p-3 rounded-lg mr-4 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  {opt.icon}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg leading-tight group-hover:text-[#2196F3]">{opt.label}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Export Modal Component ---
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJson: () => void;
  onPdf: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onJson, onPdf }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300 no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="bg-[#2196F3] px-6 py-4 border-b border-blue-600 flex justify-between items-center">
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <Download className="w-5 h-5" /> Exporter les données
           </h3>
           <button onClick={onClose} className="text-white hover:bg-white/20 p-1 rounded-full">
             <X className="w-5 h-5" />
           </button>
        </div>
        
        <div className="p-8 bg-slate-50">
          <p className="text-slate-600 mb-6 text-center text-sm">Choisissez le format d'exportation souhaité :</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onJson}
              className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all group shadow-sm"
            >
              <div className="p-4 bg-emerald-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <FileJson className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="font-bold text-slate-800 group-hover:text-emerald-800">Sauvegarde JSON</span>
              <span className="text-[10px] text-slate-400 mt-1">Pour réimporter plus tard</span>
            </button>

            <button
              onClick={onPdf}
              className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all group shadow-sm"
            >
              <div className="p-4 bg-red-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <span className="font-bold text-slate-800 group-hover:text-red-800">Bulletin PDF</span>
              <span className="text-[10px] text-slate-400 mt-1">Version imprimable</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CompetenceCardProps {
  comp: Competence;
  semester: SemesterData;
  grades: GradeMap;
  onGradeChange: (moduleId: string, value: string) => void;
}

const CompetenceCard: React.FC<CompetenceCardProps> = ({ comp, semester, grades, onGradeChange }) => {
  const average = calculateCompetenceAverage(comp, semester, grades);
  const resources = semester.modules.filter(m => m.type === ModuleType.RESOURCE && m.weightings.some(w => w.competenceId === comp.id));
  const saes = semester.modules.filter(m => m.type === ModuleType.SAE && m.weightings.some(w => w.competenceId === comp.id));
  
  const isEliminatory = average < 8 && Object.keys(grades).some(id => 
    semester.modules.find(m => m.id === id)?.weightings.some(w => w.competenceId === comp.id)
  );
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden mb-6 transition-all duration-300 break-inside-avoid ${isEliminatory ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-200'}`}>
      <div className="px-6 py-4 flex justify-between items-center bg-white relative print:border-b print:border-slate-100 print:bg-slate-50">
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: comp.color }}></div>
        
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-sm text-white bg-slate-800 font-mono print:text-black print:border print:border-slate-800 print:bg-transparent">{comp.id}</span>
            {comp.name}
          </h3>
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wide flex items-center gap-2 print:hidden">
            {isEliminatory && (
              <span className="text-rose-600 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Éliminatoire
              </span>
            )}
            {!isEliminatory && <span>Coefficients & Notes</span>}
          </span>
        </div>
        <div className="text-right">
           <div className={`text-2xl font-black ${average >= 10 ? 'text-emerald-600' : average < 8 ? 'text-rose-600' : 'text-amber-500'} print:text-black`}>
             {average} <span className="text-sm font-normal text-slate-400 print:text-slate-600">/20</span>
           </div>
           <div className="text-xs text-slate-500 print:hidden">Moyenne UE</div>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 print:bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-x-12 print:gap-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2 print:text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 print:border print:border-slate-600 print:bg-transparent"></div> Ressources
            </h4>
            <div className="space-y-3 print:space-y-2">
              {resources.map(mod => {
                 const weight = mod.weightings.find(w => w.competenceId === comp.id)?.coefficient || 0;
                 const hasGrade = grades[mod.id] !== undefined;
                 return (
                  <div key={mod.id} className="flex items-center justify-between group print:border-b print:border-slate-100 print:pb-1">
                    <div className="flex-1 pr-4">
                      <div className="text-sm font-medium text-slate-700 leading-tight print:text-slate-900">{mod.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 print:text-slate-500">Coeff: {weight}</div>
                    </div>
                    {hasGrade ? (
                        <div className="hidden print:block font-bold text-sm">{grades[mod.id]}</div>
                    ) : (
                        <div className="hidden print:block text-xs text-slate-300">-</div>
                    )}
                    <input
                      type="number"
                      min="0"
                      max="20"
                      placeholder="-"
                      value={grades[mod.id] ?? ''}
                      onChange={(e) => onGradeChange(mod.id, e.target.value)}
                      className={`w-14 h-9 text-center text-sm font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none print:hidden
                        ${grades[mod.id] !== undefined 
                          ? (grades[mod.id] >= 10 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200') 
                          : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2 print:text-slate-600">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-400 print:border print:border-slate-600 print:bg-transparent"></div> SAÉ
            </h4>
            <div className="space-y-3 print:space-y-2">
              {saes.map(mod => {
                 const weight = mod.weightings.find(w => w.competenceId === comp.id)?.coefficient || 0;
                 const hasGrade = grades[mod.id] !== undefined;
                 return (
                  <div key={mod.id} className="flex items-center justify-between print:border-b print:border-slate-100 print:pb-1">
                    <div className="flex-1 pr-4">
                       <div className="text-sm font-medium text-slate-700 leading-tight print:text-slate-900">{mod.name}</div>
                       <div className="text-[10px] text-slate-400 font-mono mt-0.5 print:text-slate-500">Coeff: {weight}</div>
                    </div>
                    {hasGrade ? (
                        <div className="hidden print:block font-bold text-sm">{grades[mod.id]}</div>
                    ) : (
                        <div className="hidden print:block text-xs text-slate-300">-</div>
                    )}
                    <input
                      type="number"
                      min="0"
                      max="20"
                      placeholder="-"
                      value={grades[mod.id] ?? ''}
                      onChange={(e) => onGradeChange(mod.id, e.target.value)}
                      className={`w-14 h-9 text-center text-sm font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none print:hidden
                        ${grades[mod.id] !== undefined 
                          ? (grades[mod.id] >= 10 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200') 
                          : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Import Modal Component ---
interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (grades: GradeMap) => void;
  semester: SemesterData;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImport, semester }) => {
  const [pasteText, setPasteText] = useState('');
  const [parsedCount, setParsedCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (typeof json === 'object') {
          onImport(json);
          onClose();
        }
      } catch (err) {
        alert("Fichier invalide");
      }
    };
    reader.readAsText(file);
  };

  const handleTextParse = () => {
    if (!pasteText.trim()) return;

    // Use a more robust parsing logic for OGE dumps
    const lines = pasteText.split(/\r?\n/).map(l => l.trim()).filter(l => l);
    const newGrades: GradeMap = {};
    let count = 0;

    // For each module in the semester, try to find a matching line in the pasted text
    semester.modules.forEach(mod => {
      const simplifiedModName = normalizeText(mod.name);
      
      let bestLineIdx = -1;
      
      // 1. Find the header line for the module
      for (let i = 0; i < lines.length; i++) {
        const line = normalizeText(lines[i]);
        if (line.includes(simplifiedModName)) {
           // SPECIAL CASE: Distinction between "Anglais" and "Anglais renforcé"
           if (simplifiedModName === "anglais" && line.includes("renforce")) {
             continue; // Skip if we found 'renforcé' but want simple 'anglais'
           }
           bestLineIdx = i;
           break;
        }
      }

      // 2. If found, look ahead for the grade line (e.g. "14.00 11.20 ...")
      // The grade line typically starts with the student's average
      if (bestLineIdx !== -1) {
        // Look up to 10 lines down
        for (let j = 0; j < 10; j++) {
           if (bestLineIdx + j >= lines.length) break;
           const candidateLine = lines[bestLineIdx + j];
           
           // Regex looks for a grade pattern at start of line: "12.50 " or "12.50\t"
           const gradeMatch = candidateLine.match(/^([0-9]{1,2}[.,][0-9]{1,2})(\s|\t|$)/);
           
           if (gradeMatch) {
              const gradeVal = parseFloat(gradeMatch[1].replace(',', '.'));
              if (!isNaN(gradeVal) && gradeVal >= 0 && gradeVal <= 20) {
                 newGrades[mod.id] = gradeVal;
                 count++;
                 break; // Found the grade for this module, stop looking
              }
           }
        }
      }
    });

    if (count > 0) {
      if (window.confirm(`${count} notes trouvées ! Voulez-vous les importer ?`)) {
        onImport(newGrades);
        onClose();
      }
    } else {
      alert("Aucune note correspondante trouvée. Assurez-vous de copier tout le tableau OGE (CTRL+A).");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-lg text-slate-800">Importer des notes</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-8">
            <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-500" /> Via fichier de sauvegarde (.json)
            </h4>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-1 text-sm text-slate-500"><span className="font-semibold">Cliquez pour upload</span></p>
                    <p className="text-xs text-slate-400">Fichier généré précédemment</p>
                </div>
                <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase">OU</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="mt-4">
             <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <FileUp className="w-4 h-4 text-emerald-500" /> Via copier-coller (OGE / Excel)
            </h4>
            <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 mb-3 border border-blue-100">
               <strong>Astuce :</strong> Allez sur votre ENT/OGE, faites <code>CTRL+A</code> puis <code>CTRL+C</code>, et collez ici.
            </div>
            <textarea
              className="w-full h-32 p-3 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="Collez le texte de vos notes ici..."
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
            ></textarea>
            <button 
              onClick={handleTextParse}
              className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Analyser et Importer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Simulator View Component ---
interface SimulatorViewProps {
  grades: GradeMap;
  activeTrackId: string;
  activeSemesterId: string;
  setActiveTrackId: (id: string) => void;
  setActiveSemesterId: (id: string) => void;
  handleGradeChange: (moduleId: string, value: string) => void;
  randomizeGrades: () => void;
  resetGrades: () => void;
  handleExportClick: () => void;
  setIsImportModalOpen: (val: boolean) => void;
  isValidated: boolean;
  hasEliminatoryGrade: boolean;
  globalAverage: number;
  annualStats: any;
  previousSemester: any;
  activeSemester: SemesterData;
  activeTrack: any;
  radarData: any;
  failedCompetencies: Competence[];
}

const SimulatorView: React.FC<SimulatorViewProps> = ({ 
  grades, activeTrackId, activeSemesterId, setActiveTrackId, setActiveSemesterId, 
  handleGradeChange, randomizeGrades, resetGrades, handleExportClick, 
  setIsImportModalOpen, isValidated, hasEliminatoryGrade, globalAverage, 
  annualStats, previousSemester, activeSemester, activeTrack, radarData, failedCompetencies
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden print:overflow-visible print:h-auto print:block">
      {/* Mobile Menu Toggle in Simulator */}
      <div id="mobile-header" className="md:hidden bg-slate-800 text-white p-4 flex justify-between items-center sticky top-0 z-20 print:hidden">
        <div className="font-bold flex items-center gap-2 text-sm">
          <Calculator className="w-4 h-4 text-blue-400" />
          Simulateur
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside id="sidebar" className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col shadow-xl print:hidden
        ${isMobileMenuOpen ? 'translate-x-0 top-16' : '-translate-x-full'} md:top-auto
      `}>
        <div className="p-6 border-b border-slate-800 hidden md:block">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-400" />
            Simulateur
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Semestres</div>
          <ul className="space-y-1 px-2">
            {activeTrack.semesters.map((sem: SemesterData) => (
              <li key={sem.id}>
                <button
                  onClick={() => { setActiveSemesterId(sem.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSemesterId === sem.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="truncate" title={sem.name}>{sem.name}</span>
                  {activeSemesterId === sem.id && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-2">
          
          <div className="grid grid-cols-2 gap-2">
             <button 
                onClick={handleExportClick}
                className="flex flex-col items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-400 hover:text-blue-300 transition-all border border-transparent hover:border-blue-500/30"
                title="Exporter JSON/PDF"
              >
                <Download className="w-4 h-4 mb-1" /> Exporter
              </button>
              <button 
                onClick={() => { setIsImportModalOpen(true); setIsMobileMenuOpen(false); }}
                className="flex flex-col items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-400 hover:text-emerald-300 transition-all border border-transparent hover:border-emerald-500/30"
                title="Importer JSON ou Texte"
              >
                <Upload className="w-4 h-4 mb-1" /> Importer
              </button>
          </div>
          
          <button
            onClick={randomizeGrades}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-900/20"
          >
            <Wand2 className="w-3 h-3" /> Mode Test
          </button>

          <button 
            onClick={resetGrades}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 rounded-lg text-xs transition-all border border-transparent hover:border-rose-900/50"
          >
            <RotateCcw className="w-3 h-3" /> Réinitialiser
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 print:h-auto print:overflow-visible print:bg-white print:w-full">
        
        {/* --- PRINT HEADER (Hidden on Screen) --- */}
        <PrintHeader 
           trackName={activeTrack.name} 
           semesterName={activeSemester.name}
           globalAvg={globalAverage}
           isValidated={isValidated}
           admissionText={isValidated ? 'Admis' : hasEliminatoryGrade ? 'Défaillant' : 'Ajourné'}
        />

        {/* Header (Screen Only) */}
        <header className="bg-white border-b border-slate-200 h-20 md:h-24 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-0 print:hidden">
          <div>
             <h2 className="text-xl md:text-2xl font-bold text-slate-900 truncate">{activeSemester.name}</h2>
             <p className="text-sm text-slate-500 hidden md:block">Simulation de résultats BUT MMI</p>
          </div>
          
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-colors ${
               isValidated ? 'bg-emerald-50 border-emerald-100' : 
               hasEliminatoryGrade ? 'bg-rose-50 border-rose-100' : 
               'bg-white border-slate-100'
            }`}>
               <div className="text-right">
                 <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Moyenne Générale</div>
                 <div className={`text-xl md:text-3xl font-black leading-none ${
                   isValidated ? 'text-emerald-600' : 
                   hasEliminatoryGrade ? 'text-rose-600' : 
                   'text-slate-800'
                 }`}>
                    {globalAverage}
                 </div>
               </div>
               
               <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100">
                  {isValidated && <Award className="w-6 h-6 text-emerald-500" />}
                  {hasEliminatoryGrade && <AlertCircle className="w-6 h-6 text-rose-500" />}
                  {!isValidated && !hasEliminatoryGrade && <Calculator className="w-6 h-6 text-slate-400" />}
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth print:overflow-visible print:h-auto print:p-0">
           {/* In print mode, we swap columns using flexbox to put summary at top */}
           <div className="max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-8 pb-20 print:gap-8">
             
             {/* Left Column: Input Forms (Order 2 in print) */}
             <div className="lg:col-span-2 print:order-2">
                {activeSemester.competencies.map(comp => (
                  <CompetenceCard 
                    key={comp.id} 
                    comp={comp} 
                    semester={activeSemester}
                    grades={grades}
                    onGradeChange={handleGradeChange}
                  />
                ))}
             </div>

             {/* Right Column: Visualization Sticky (Order 1 in print to show summary first) */}
             <div className="lg:col-span-1 print:order-1">
               <div className="sticky top-6 space-y-6 print:static print:space-y-4">
                 
                 {/* Semester Status */}
                 <div className={`p-6 rounded-xl shadow-sm border-2 print:border ${
                    isValidated ? 'bg-emerald-600 border-emerald-600 text-white' : 
                    hasEliminatoryGrade ? 'bg-white border-rose-200' :
                    'bg-white border-slate-200'
                 }`}>
                    <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${isValidated ? 'text-white print:text-emerald-700' : 'text-slate-900'}`}>
                      {isValidated ? 'Semestre Validé !' : hasEliminatoryGrade ? 'Semestre Non Validé' : 'En cours...'}
                    </h3>
                    <div className={`text-sm leading-relaxed ${isValidated ? 'text-emerald-50 print:text-emerald-800' : 'text-slate-600'}`}>
                      {isValidated && "Félicitations ! Vous remplissez toutes les conditions pour valider ce semestre."}
                      {hasEliminatoryGrade && (
                        <ul className="list-disc list-inside space-y-1 mt-2 text-rose-600 font-medium">
                          {failedCompetencies.map(c => (
                            <li key={c.id}>UE {c.id} inférieure à 8/20</li>
                          ))}
                        </ul>
                      )}
                      {!isValidated && !hasEliminatoryGrade && globalAverage < 10 && "Il faut une moyenne générale de 10/20 minimum sans aucune UE en dessous de 8/20."}
                    </div>
                 </div>

                 {/* ANNUAL VALIDATION (Only shown for even semesters) */}
                 {annualStats && previousSemester && (
                    <div className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden print:border ${
                      annualStats.isValidated ? 'border-emerald-100' : 'border-indigo-100'
                    }`}>
                      <div className={`px-6 py-4 border-b flex justify-between items-center ${
                         annualStats.isValidated ? 'bg-emerald-50 border-emerald-100' : 'bg-indigo-50 border-indigo-100'
                      }`}>
                         <div>
                            <h3 className="text-base font-bold text-slate-900">Bilan Annuel</h3>
                            <div className="text-xs text-slate-500">{previousSemester.id} + {activeSemester.id}</div>
                         </div>
                         <div className={`text-2xl font-black ${annualStats.isValidated ? 'text-emerald-600' : 'text-indigo-600'}`}>
                            {annualStats.global}
                         </div>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        {annualStats.competences.map((comp: any, i: number) => (
                           <div key={i} className="flex flex-col break-inside-avoid">
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-xs font-bold text-slate-600 truncate mr-2" style={{color: comp.color}}>
                                   {comp.name}
                                 </span>
                                 <span className={`text-sm font-bold ${comp.isEliminatory ? 'text-rose-600' : 'text-slate-700'}`}>
                                   {comp.avg}
                                 </span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden print:border print:border-slate-200">
                                <div 
                                  className={`h-full rounded-full ${comp.avg >= 10 ? 'bg-emerald-400' : comp.avg < 8 ? 'bg-rose-400' : 'bg-amber-400'}`} 
                                  style={{width: `${Math.min(100, (comp.avg / 20) * 100)}%`}}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                                 <span>UE {comp.prevId} + {comp.currId}</span>
                                 {comp.isEliminatory && <span className="text-rose-500 font-medium">Éliminatoire</span>}
                              </div>
                           </div>
                        ))}
                      </div>
                      
                      <div className={`p-3 text-xs font-medium text-center ${
                         annualStats.isValidated ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-50 text-indigo-800'
                      }`}>
                         {annualStats.isValidated 
                           ? "Année validée !" 
                           : "Validation annuelle en cours..."}
                      </div>
                    </div>
                 )}

                 {/* Charts */}
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hidden md:block print:hidden">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Profil de compétences
                    </h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} axisLine={false} />
                          <Radar
                            name="Moyenne"
                            dataKey="A"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="#3b82f6"
                            fillOpacity={0.2}
                          />
                          <RechartsTooltip 
                             contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                             itemStyle={{ color: '#334155', fontWeight: 600 }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string>('dev');
  const [activeSemesterId, setActiveSemesterId] = useState<string>('S1');
  const [grades, setGrades] = useState<GradeMap>({});
  
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Derived state
  const activeTrack = useMemo(() => TRACKS.find(t => t.id === activeTrackId) || TRACKS[0], [activeTrackId]);
  const activeSemester = useMemo(() => activeTrack.semesters.find(s => s.id === activeSemesterId) || activeTrack.semesters[0], [activeTrack, activeSemesterId]);

  // Handlers
  const handleOnboardingComplete = (trackId: string, semesterId: string) => {
    setActiveTrackId(trackId);
    setActiveSemesterId(semesterId);
    setIsOnboardingOpen(false);
  };

  const handleGradeChange = (moduleId: string, value: string) => {
    setGrades(prev => {
        if (value === '') {
            const next = { ...prev };
            delete next[moduleId];
            return next;
        }
        const num = parseFloat(value);
        if (isNaN(num)) return prev;
        return { ...prev, [moduleId]: num };
    });
  };

  const handleImport = (newGrades: GradeMap) => {
    setGrades(prev => ({ ...prev, ...newGrades }));
  };

  const randomizeGrades = () => {
      const newGrades: GradeMap = { ...grades };
      activeSemester.modules.forEach(m => {
          newGrades[m.id] = parseFloat((Math.random() * 8 + 8).toFixed(2)); // Random between 8 and 16
      });
      setGrades(newGrades);
  };

  const resetGrades = () => {
      if(window.confirm("Voulez-vous vraiment effacer les notes de ce semestre ?")) {
        setGrades(prev => {
            const next = { ...prev };
            activeSemester.modules.forEach(m => {
                delete next[m.id];
            });
            return next;
        });
      }
  };
  
  // Calculations
  const radarData = useMemo(() => {
    return activeSemester.competencies.map(comp => ({
      subject: comp.name,
      A: calculateCompetenceAverage(comp, activeSemester, grades),
      fullMark: 20
    }));
  }, [activeSemester, grades]);

  const globalAverage = useMemo(() => calculateSemesterGlobalAverage(activeSemester, grades), [activeSemester, grades]);
  
  const failedCompetencies = useMemo(() => {
     return activeSemester.competencies.filter(comp => {
         const avg = calculateCompetenceAverage(comp, activeSemester, grades);
         // Check if any module in this competence has a grade
         const hasGrade = activeSemester.modules.some(m => m.weightings.some(w => w.competenceId === comp.id) && grades[m.id] !== undefined);
         return hasGrade && avg < 8;
     });
  }, [activeSemester, grades]);

  const hasEliminatoryGrade = failedCompetencies.length > 0;
  const isValidated = globalAverage >= 10 && !hasEliminatoryGrade;

  const previousSemester = useMemo(() => {
     const index = activeTrack.semesters.findIndex(s => s.id === activeSemester.id);
     if (index > 0 && index % 2 !== 0) { // If index is 1, 3, 5 -> S2, S4, S6
         return activeTrack.semesters[index - 1];
     }
     return null;
  }, [activeTrack, activeSemester]);

  const annualStats = useMemo(() => {
      if (!previousSemester) return null;
      
      const prevGlobal = calculateSemesterGlobalAverage(previousSemester, grades);
      const annualGlobal = (globalAverage + prevGlobal) / 2;
      
      const prevEliminatory = previousSemester.competencies.some(c => {
          const avg = calculateCompetenceAverage(c, previousSemester, grades);
          const hasGrade = previousSemester.modules.some(m => m.weightings.some(w => w.competenceId === c.id) && grades[m.id] !== undefined);
          return hasGrade && avg < 8;
      });

      const isAnnualValidated = annualGlobal >= 10 && !hasEliminatoryGrade && !prevEliminatory;

      // Match competencies
      const pairedCompetencies = [];
      const len = Math.max(previousSemester.competencies.length, activeSemester.competencies.length);
      for(let i=0; i<len; i++) {
          const prevC = previousSemester.competencies[i];
          const currC = activeSemester.competencies[i];
          if(prevC && currC) {
              const prevAvg = calculateCompetenceAverage(prevC, previousSemester, grades);
              const currAvg = calculateCompetenceAverage(currC, activeSemester, grades);
              pairedCompetencies.push({
                  name: currC.name,
                  color: currC.color,
                  prevId: prevC.id,
                  currId: currC.id,
                  avg: parseFloat(((prevAvg + currAvg) / 2).toFixed(2)),
                  isEliminatory: false 
              });
          }
      }

      return {
          global: parseFloat(annualGlobal.toFixed(2)),
          isValidated: isAnnualValidated,
          competences: pairedCompetencies
      };

  }, [previousSemester, activeSemester, globalAverage, grades, hasEliminatoryGrade]);


  const handleJsonExport = () => {
    const data = JSON.stringify(grades, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-mmi-${activeSemesterId}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setIsExportModalOpen(false);
  };

  const handlePdfExport = () => {
      window.print();
      setIsExportModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900">
      <TopBar onGoHome={() => setIsOnboardingOpen(true)} />
      
      <SimulatorView 
         grades={grades}
         activeTrackId={activeTrackId}
         activeSemesterId={activeSemesterId}
         setActiveTrackId={setActiveTrackId}
         setActiveSemesterId={setActiveSemesterId}
         handleGradeChange={handleGradeChange}
         randomizeGrades={randomizeGrades}
         resetGrades={resetGrades}
         handleExportClick={() => setIsExportModalOpen(true)}
         setIsImportModalOpen={setIsImportModalOpen}
         isValidated={isValidated}
         hasEliminatoryGrade={hasEliminatoryGrade}
         globalAverage={globalAverage}
         annualStats={annualStats}
         previousSemester={previousSemester}
         activeSemester={activeSemester}
         activeTrack={activeTrack}
         radarData={radarData}
         failedCompetencies={failedCompetencies}
      />

      <OnboardingModal 
        isOpen={isOnboardingOpen} 
        onComplete={handleOnboardingComplete} 
        isEditMode={grades && Object.keys(grades).length > 0}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <ImportModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
        onImport={handleImport}
        semester={activeSemester}
      />

      <ExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onJson={handleJsonExport}
        onPdf={handlePdfExport}
      />
    </div>
  );
};

export default App;