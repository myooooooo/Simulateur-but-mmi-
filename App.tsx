
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TRACKS } from './constants';
import { GradeMap, ModuleType, SemesterData, Competence } from './types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { RotateCcw, Award, AlertCircle, ChevronRight, Calculator, Menu, X, Download, Upload, GraduationCap, Terminal, Palette, Presentation, User, Home, Sparkles, AlertTriangle, Printer, ExternalLink, Linkedin, Lock, Eye } from 'lucide-react';

// --- Fonctions de calcul ---

const calculateWeightedAverage = (modules: any[], compId: string, grades: GradeMap) => {
  let totalScore = 0;
  let totalCoeff = 0;

  modules.forEach(mod => {
    const weighting = mod.weightings.find((w: any) => w.competenceId === compId);
    if (weighting) {
      const grade = grades[mod.id];
      if (grade !== undefined && grade !== null) {
        totalScore += grade * weighting.coefficient;
        totalCoeff += weighting.coefficient;
      }
    }
  });

  if (totalCoeff === 0) return null;
  return parseFloat((totalScore / totalCoeff).toFixed(2));
};

const calculateCompetenceAverage = (comp: Competence, semester: SemesterData, grades: GradeMap) => {
  const resources = semester.modules.filter(m => m.type === ModuleType.RESOURCE);
  const saes = semester.modules.filter(m => m.type === ModuleType.SAE);

  const avgResources = calculateWeightedAverage(resources, comp.id, grades);
  const avgSAE = calculateWeightedAverage(saes, comp.id, grades);

  let finalScore = 0;
  let finalCoeff = 0;

  if (avgResources !== null) {
      finalScore += avgResources * comp.resourceCoefficient;
      finalCoeff += comp.resourceCoefficient;
  }
  
  if (avgSAE !== null) {
      finalScore += avgSAE * comp.saeCoefficient;
      finalCoeff += comp.saeCoefficient;
  }

  if (finalCoeff === 0) return 0;
  return parseFloat((finalScore / finalCoeff).toFixed(2));
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

// --- Composants UI ---

const TopBar = ({ onGoHome }: { onGoHome: () => void }) => (
  <header className="bg-[#C4B5FD] text-white h-16 flex items-center justify-between px-6 shadow-md z-50 relative print:hidden">
    <div className="flex items-center gap-4">
      <button onClick={onGoHome} aria-label="Retour à l'accueil" className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-95">
         <Home className="w-6 h-6" />
      </button>
      <div className="flex flex-col cursor-pointer" onClick={onGoHome}>
        <div className="text-xl font-black tracking-tighter leading-none uppercase">MMI SIM</div>
        <div className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em]">Par Zineb A.</div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex flex-col items-end mr-3">
        <span className="text-[10px] font-black text-violet-900/40 uppercase tracking-widest">Version 2025</span>
        <span className="text-xs font-bold text-violet-900">BUT MMI</span>
      </div>
      <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-violet-900" aria-label="Icône étincelles" />
      </div>
    </div>
  </header>
);

const LockModal = ({ isOpen, onUnlock, onClose }: { isOpen: boolean, onUnlock: () => void, onClose: () => void }) => {
  const [countdown, setCountdown] = useState<number>(8);
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCountdown(8);
      setIsReady(false);
      
      // On lance le décompte dès l'ouverture
      timerRef.current = window.setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsReady(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  const handleFollowClick = () => {
    window.open("https://www.linkedin.com/in/zineb-anssafou", "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-violet-950/80 backdrop-blur-xl p-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden p-8 border border-white/20 text-center relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-500 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
        <div className="w-20 h-20 bg-violet-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Lock className="w-10 h-10 text-violet-600 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">🚀 Dernière étape !</h2>
        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
          Suivez-moi sur LinkedIn pour débloquer votre résultat et soutenir ce projet gratuit maintenu par une étudiante.
        </p>

        {isReady && (
           <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-xs font-bold animate-in fade-in slide-in-from-top-2">
              ✨ Merci de votre soutien ! Vous pouvez maintenant accéder à vos résultats.
           </div>
        )}

        <div className="space-y-3">
          <button 
            onClick={handleFollowClick}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95 group bg-[#0077B5] text-white shadow-[#0077B5]/20 hover:scale-105"
          >
            <Linkedin className="w-5 h-5" />
            GO FOLLOW (LINKEDIN)
          </button>
          
          <button 
            onClick={onUnlock}
            disabled={!isReady}
            className={`w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-95 ${isReady ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700 hover:scale-105' : 'bg-slate-100 text-slate-300 cursor-not-allowed border-2 border-slate-200'}`}
          >
            {isReady ? "C'EST FAIT, ACCÉDER AUX RÉSULTATS" : `VÉRIFICATION EN COURS... ${countdown}s`}
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
           <Sparkles className="w-3 h-3" /> Accès instantané après validation
        </div>
      </div>
    </div>
  );
};

const OnboardingModal = ({ isOpen, onComplete }: any) => {
  if (!isOpen) return null;

  const options = [
    { id: '1annee', label: '1ère année (Commun)', icon: <GraduationCap className="w-8 h-8" />, trackId: 'crea', semesterId: 'S1', desc: 'S1 & S2 Tronc commun', ariaLabel: 'Calculer ma moyenne pour la 1ère année de BUT MMI' },
    { id: 'crea', label: 'Création Numérique', icon: <Palette className="w-8 h-8" />, trackId: 'crea', semesterId: 'S3-CN', desc: 'Parcours Créa (S3-S6)', ariaLabel: 'Calculer ma moyenne pour le parcours Création Numérique' },
    { id: 'dev', label: 'Développement Web', icon: <Terminal className="w-8 h-8" />, trackId: 'dev', semesterId: 'S1', desc: 'Bientôt disponible', ariaLabel: 'Calculer ma moyenne pour le parcours Développement Web' },
    { id: 'strat', label: 'Stratégie de Com', icon: <Presentation className="w-8 h-8" />, trackId: 'strat', semesterId: 'S1', desc: 'Bientôt disponible', ariaLabel: 'Calculer ma moyenne pour le parcours Stratégie de Communication' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-violet-950/60 backdrop-blur-md p-4 animate-in fade-in duration-500 no-print">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-white/20 transform transition-all scale-100">
        <div className="bg-[#DDD6FE] p-8 text-center relative overflow-hidden">
           <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" aria-hidden="true"></div>
           <h1 className="text-3xl font-black text-violet-900 mb-4 flex items-center justify-center gap-3">
             <Calculator className="w-8 h-8" aria-label="Icône calculatrice" />
             Simulateur de Moyenne BUT MMI
           </h1>
           <p className="text-violet-700 font-medium text-sm max-w-lg mx-auto leading-relaxed">
             Calculez vos moyennes par semestre en fonction des coefficients officiels de la réforme BUT MMI (Métiers du Multimédia et de l'Internet).
           </p>
        </div>
        <div className="p-8 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt) => (
            <button 
              key={opt.id} 
              onClick={() => onComplete(opt.trackId, opt.semesterId)} 
              aria-label={opt.ariaLabel}
              className="flex items-center p-5 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-violet-300 hover:shadow-xl hover:-translate-y-1 transition-all group text-left"
            >
              <div className="bg-violet-50 p-3 rounded-xl mr-4 group-hover:bg-violet-100 transition-colors text-violet-500" aria-hidden="true">{opt.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-lg leading-tight group-hover:text-violet-600">{opt.label}</div>
                <div className="text-[11px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="p-6 bg-white border-t border-slate-100 text-center">
           <div className="inline-flex items-center gap-2 px-6 py-2 bg-violet-50 rounded-full text-[12px] font-bold text-violet-600 uppercase tracking-widest border border-violet-100">
              <Sparkles className="w-4 h-4" /> Projet personnel par Zineb A.
           </div>
        </div>
      </div>
    </div>
  );
};

const CompetenceCard = ({ comp, semester, grades, onGradeChange }: any) => {
  const average = calculateCompetenceAverage(comp, semester, grades);
  const resources = semester.modules.filter((m: any) => m.type === ModuleType.RESOURCE && m.weightings.some((w: any) => w.competenceId === comp.id));
  const saes = semester.modules.filter((m: any) => m.type === ModuleType.SAE && m.weightings.some((w: any) => w.competenceId === comp.id));
  
  const isEliminatory = average < 8 && Object.keys(grades).length > 0;
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden mb-6 transition-all duration-300 ${isEliminatory ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-100 hover:border-violet-200 hover:shadow-md'}`}>
      <div className="px-6 py-5 flex justify-between items-center bg-white relative">
        <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: comp.color }} aria-hidden="true"></div>
        <div className="flex-1">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-lg text-xs text-white bg-slate-800 font-mono tracking-tighter" aria-label={`Code compétence ${comp.id}`}>{comp.id}</span>
            {comp.name}
          </h3>
          {isEliminatory && <span className="text-rose-500 font-black flex items-center gap-1 text-[10px] uppercase mt-1 tracking-tighter"><AlertTriangle className="w-3 h-3" /> Note éliminatoire (&lt; 8)</span>}
        </div>
        <div className="text-right pl-6 border-l border-slate-100">
           <div className={`text-3xl font-black ${average >= 10 ? 'text-violet-600' : average < 8 ? 'text-rose-500' : 'text-amber-500'}`}>
             {average.toFixed(2)}
             <span className="text-sm font-bold text-slate-300 ml-1">/20</span>
           </div>
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Moyenne UE</div>
        </div>
      </div>
      <div className="px-6 py-6 bg-slate-50/40 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Ressources
            </h4>
            <div className="space-y-3">
              {resources.map((mod: any) => (
                <div key={mod.id} className="flex items-center justify-between group">
                  <label htmlFor={`grade-${mod.id}`} className="text-sm font-medium text-slate-600 leading-tight flex-1 mr-4 group-hover:text-slate-900 transition-colors">{mod.name}</label>
                  <input 
                    id={`grade-${mod.id}`}
                    type="number" 
                    min="0" max="20" step="0.25" placeholder="-" 
                    value={grades[mod.id] ?? ''} 
                    onChange={(e) => onGradeChange(mod.id, e.target.value)}
                    aria-label={`Saisir la note pour ${mod.name}`}
                    className={`w-16 h-9 text-center text-sm font-black border-2 rounded-xl focus:ring-4 focus:ring-violet-100 outline-none transition-all ${grades[mod.id] !== undefined ? 'bg-white border-violet-200 text-violet-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400'}`} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-violet-300 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-violet-300"></div> SAÉ
            </h4>
            <div className="space-y-3">
              {saes.map((mod: any) => (
                <div key={mod.id} className="flex items-center justify-between group">
                  <label htmlFor={`grade-${mod.id}`} className="text-sm font-medium text-slate-600 leading-tight flex-1 mr-4 group-hover:text-slate-900 transition-colors">{mod.name}</label>
                  <input 
                    id={`grade-${mod.id}`}
                    type="number" 
                    min="0" max="20" step="0.25" placeholder="-" 
                    value={grades[mod.id] ?? ''} 
                    onChange={(e) => onGradeChange(mod.id, e.target.value)}
                    aria-label={`Saisir la note pour ${mod.name}`}
                    className={`w-16 h-9 text-center text-sm font-black border-2 rounded-xl focus:ring-4 focus:ring-violet-100 outline-none transition-all ${grades[mod.id] !== undefined ? 'bg-white border-violet-200 text-violet-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400'}`} />
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string>('crea');
  const [activeSemesterId, setActiveSemesterId] = useState<string>('S1');
  const [grades, setGrades] = useState<GradeMap>({});
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  const [hasValidated, setHasValidated] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Charger les données depuis le localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem('mmi_sim_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.grades) setGrades(parsed.grades);
        if (parsed.track) setActiveTrackId(parsed.track);
        if (parsed.sem) setActiveSemesterId(parsed.sem);
        if (parsed.hasValidated === true) setHasValidated(true);
      } catch (e) {
        console.error("Erreur chargement localStorage", e);
      }
    }
  }, []);

  // Sauvegarder automatiquement dans le localStorage lors de changements
  useEffect(() => {
    const data = { grades, track: activeTrackId, sem: activeSemesterId, hasValidated };
    localStorage.setItem('mmi_sim_data', JSON.stringify(data));
  }, [grades, activeTrackId, activeSemesterId, hasValidated]);

  const activeTrack = useMemo(() => TRACKS.find(t => t.id === activeTrackId) || TRACKS[0], [activeTrackId]);
  
  const activeSemester = useMemo(() => {
    return activeTrack.semesters.find(s => s.id === activeSemesterId) || activeTrack.semesters[0];
  }, [activeTrack, activeSemesterId]);
  
  const globalAverage = useMemo(() => calculateSemesterGlobalAverage(activeSemester, grades), [activeSemester, grades]);
  
  const failedCompetencies = useMemo(() => activeSemester.competencies.filter(comp => {
    const avg = calculateCompetenceAverage(comp, activeSemester, grades);
    const hasData = Object.keys(grades).some(id => activeSemester.modules.some(m => m.id === id && m.weightings.some(w => w.competenceId === comp.id)));
    return hasData && avg < 8;
  }), [activeSemester, grades]);

  const isValidated = globalAverage >= 10 && failedCompetencies.length === 0;

  const handleGradeChange = (moduleId: string, value: string) => {
    setGrades(prev => {
      if (value === '') { const n = {...prev}; delete n[moduleId]; return n; }
      const num = parseFloat(value);
      if (isNaN(num)) return prev;
      return {...prev, [moduleId]: Math.min(20, Math.max(0, num))};
    });
  };

  const handleOnboardingComplete = (t: string, s: string) => {
    setActiveTrackId(t);
    setActiveSemesterId(s);
    setIsOnboardingOpen(false);
  };

  const handleCalculateClick = () => {
    if (!hasValidated) {
      setIsLockModalOpen(true);
      return;
    }
    // Si déjà validé, on fait juste défiler vers le haut ou rafraîchir la vue si nécessaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlock = () => {
    setHasValidated(true);
    setIsLockModalOpen(false);
    // On rappelle la fonction de calcul (scrolling ou affichage immédiat)
    handleCalculateClick();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // Validation basique des données
        if (!data.grades || typeof data.grades !== 'object') {
          throw new Error("Le fichier JSON ne contient pas de données de notes valides.");
        }

        // Mise à jour de l'état
        setGrades(data.grades);
        if (data.track) setActiveTrackId(data.track);
        if (data.sem) setActiveSemesterId(data.sem);
        
        window.alert("Importation réussie ! Vos notes ont été restaurées.");
      } catch (err) {
        console.error("Erreur d'importation", err);
        window.alert("Erreur : Le fichier est corrompu ou n'est pas au bon format.");
      }
    };
    reader.readAsText(file);
    // Reset de l'input pour permettre de réimporter le même fichier
    event.target.value = '';
  };

  const radarData = useMemo(() => {
    return activeSemester.competencies.map(comp => ({
      subject: comp.id,
      A: calculateCompetenceAverage(comp, activeSemester, grades),
      fullMark: 20
    }));
  }, [activeSemester, grades]);

  return (
    <div className="flex flex-col h-screen bg-[#F5F3FF] font-sans text-slate-900 overflow-hidden">
      <TopBar onGoHome={() => setIsOnboardingOpen(true)} />
      
      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white transform transition-transform duration-500 md:static md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-2xl print:hidden`}>
          <div className="p-8 border-b border-slate-800/50">
            <div className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Calculator className="w-6 h-6 text-white" aria-label="Icône calculatrice" />
              </div> 
              MMI SIM
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-3">Édition Spéciale</p>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            <div className="px-4 mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Semestres ({activeTrack.name})</div>
            {activeTrack.semesters.map(sem => (
              <button key={sem.id} onClick={() => { setActiveSemesterId(sem.id); setIsMobileMenuOpen(false); }}
                aria-label={`Accéder au ${sem.name}`}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold transition-all ${activeSemesterId === sem.id ? 'bg-violet-600 text-white shadow-xl shadow-violet-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                {sem.name} <ChevronRight className={`w-4 h-4 transition-transform ${activeSemesterId === sem.id ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-800 space-y-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".json" 
              onChange={handleImport}
            />
            <div className="grid grid-cols-2 gap-3">
               <button onClick={() => fileInputRef.current?.click()} aria-label="Importer des notes depuis un fichier JSON" className="flex flex-col items-center justify-center p-3 bg-slate-800/50 hover:bg-slate-800 rounded-2xl text-[10px] font-black text-slate-300 transition-all border border-slate-700 hover:border-slate-600">
                  <Upload className="w-4 h-4 mb-1" aria-hidden="true" /> IMPORTER
               </button>
               <button onClick={() => {
                 const data = JSON.stringify({ grades, track: activeTrackId, sem: activeSemesterId });
                 const blob = new Blob([data], {type: 'application/json'});
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url;
                 a.download = `notes_mmi_zineb.json`;
                 a.click();
               }} aria-label="Sauvegarder mes notes sur mon ordinateur" className="flex flex-col items-center justify-center p-3 bg-slate-800/50 hover:bg-slate-800 rounded-2xl text-[10px] font-black text-slate-300 transition-all border border-slate-700 hover:border-slate-600">
                  <Download className="w-4 h-4 mb-1" aria-hidden="true" /> SAUVER
               </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
               <button onClick={() => window.print()} aria-label="Exporter les notes en PDF ou Imprimer" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-black transition-all border border-slate-700">
                  <Printer className="w-4 h-4" aria-hidden="true" /> EXPORTER PDF
               </button>
            </div>
            <button onClick={() => { if(confirm('Voulez-vous vraiment effacer toutes vos notes ?')) setGrades({}); }} aria-label="Réinitialiser toutes les notes saisies" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 rounded-2xl text-xs font-black transition-all border border-rose-900/30">
               <RotateCcw className="w-3 h-3" /> RÉINITIALISER
            </button>
            <div className="pt-4 text-center">
               <div className="text-[12px] font-black text-white/90">Zineb A.</div>
               <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Conçu pour MMI</div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <header className="bg-white/80 backdrop-blur-md border-b border-violet-100 h-24 flex items-center justify-between px-8 flex-shrink-0 z-10 print:bg-white print:border-none">
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeSemester.name}</h2>
                 <span className="px-2 py-0.5 bg-violet-100 text-violet-600 text-[10px] font-black rounded uppercase" aria-label={`Semestre ${activeSemesterId}`}>{activeSemesterId}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">{activeTrack.name}</p>
            </div>
            
            {!hasValidated ? (
              <button 
                onClick={handleCalculateClick}
                className="group flex items-center gap-3 px-8 py-3.5 bg-violet-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-violet-200 hover:scale-105 active:scale-95 transition-all"
              >
                <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                CALCULER MA MOYENNE
              </button>
            ) : (
              <div className={`px-8 py-3 rounded-2xl border-2 flex items-center gap-6 transition-all duration-700 animate-in fade-in slide-in-from-right-4 ${isValidated ? 'bg-violet-50 border-violet-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Moyenne Générale</div>
                  <div className={`text-4xl font-black leading-none ${isValidated ? 'text-violet-600' : 'text-slate-800'}`}>
                    {globalAverage.toFixed(2)}
                  </div>
                </div>
                <div className={`h-14 w-14 flex items-center justify-center rounded-2xl transition-all shadow-lg ${isValidated ? 'bg-violet-500 text-white shadow-violet-200' : 'bg-white text-slate-300 border border-slate-100'}`}>
                  {isValidated ? <Award className="w-8 h-8" aria-label="Diplôme obtenu" /> : <Calculator className="w-8 h-8" aria-label="Icône calcul" />}
                </div>
              </div>
            )}
          </header>

          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-8">
                {hasValidated ? (
                  <>
                    {failedCompetencies.length > 0 && (
                      <div className="p-5 bg-rose-50 border-2 border-rose-100 rounded-3xl flex items-center gap-4 text-rose-700 shadow-sm animate-pulse" role="alert">
                        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-6 h-6 text-rose-500" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-black uppercase tracking-tight">Attention : Validation impossible</div>
                          <div className="text-xs font-medium opacity-80">Au moins une UE possède une moyenne inférieure à 8/20.</div>
                        </div>
                      </div>
                    )}
                    
                    {activeSemester.competencies.map(comp => (
                      <CompetenceCard key={comp.id} comp={comp} semester={activeSemester} grades={grades} onGradeChange={handleGradeChange} />
                    ))}
                  </>
                ) : (
                  <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-violet-200 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-20 h-20 bg-violet-100 rounded-3xl flex items-center justify-center mb-6 text-violet-500 shadow-inner">
                      <Lock className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-4">Calculateur verrouillé</h2>
                    <p className="text-slate-500 max-w-sm mb-8 font-medium">Saisissez vos notes dans les UE ci-dessous, puis cliquez sur le bouton "Calculer" pour débloquer votre analyse complète.</p>
                    
                    <div className="w-full space-y-6">
                      {activeSemester.competencies.map(comp => (
                        <div key={comp.id} className="opacity-50 grayscale pointer-events-none blur-[1px]">
                          <CompetenceCard comp={comp} semester={activeSemester} grades={grades} onGradeChange={() => {}} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <footer className="mt-16 overflow-hidden rounded-3xl border border-slate-100 shadow-sm print:hidden">
                   <div className="bg-slate-50/80 backdrop-blur-sm p-8 text-center">
                      <div className="mb-8 max-w-lg mx-auto">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-slate-500">À propos</h4>
                        <p className="text-[11px] leading-relaxed font-medium text-slate-400">
                          Cet outil d'aide à l'orientation est conçu pour les étudiants en MMI souhaitant simuler leurs résultats aux SAÉ et ressources. Les calculs sont basés sur les maquettes pédagogiques nationales.
                        </p>
                      </div>
                      
                      <div className="py-6 border-t border-slate-200/60 flex flex-col items-center gap-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Crédits</h4>
                        <p className="text-sm font-bold text-slate-600">
                          Développé par <span className="text-violet-600">Zineb A.</span> — Étudiante en MMI
                        </p>
                        
                        <a 
                          href="https://www.linkedin.com/in/zineb-anssafou" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-2 flex items-center gap-3 px-6 py-2.5 bg-[#0077B5] text-white rounded-xl font-bold text-xs shadow-lg shadow-[#0077B5]/20 transition-all hover:scale-105 active:scale-95 group"
                        >
                          <Linkedin className="w-4 h-4 group-hover:animate-pulse" />
                          LinkedIn
                        </a>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-slate-200/40 flex justify-center items-center gap-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">© 2025 MMI SIMULATEUR</p>
                        <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-slate-300 flex items-center gap-1 hover:text-violet-600 transition-colors"><ExternalLink className="w-3 h-3" /> Powered by Gemini</a>
                      </div>
                   </div>
                </footer>
              </div>

              <div className="lg:col-span-4 space-y-8 print:hidden">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-violet-100 sticky top-10 overflow-hidden">
                  {!hasValidated && (
                    <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                       <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-4 text-violet-600">
                          <Eye className="w-8 h-8" />
                       </div>
                       <h3 className="font-black text-slate-800 text-lg mb-2">Résultats verrouillés</h3>
                       <p className="text-xs font-medium text-slate-400 mb-6">Suivez-moi sur LinkedIn pour visualiser vos statistiques et votre radar.</p>
                       <button 
                         onClick={handleCalculateClick}
                         className="px-6 py-2 bg-violet-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-violet-200 hover:scale-105 active:scale-95 transition-all"
                       >
                         DÉBLOQUER
                       </button>
                    </div>
                  )}
                  <h3 className="text-[11px] font-black text-slate-400 mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-2 h-5 bg-violet-400 rounded-full" aria-hidden="true"></div> Visualisation UE
                  </h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 800 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} axisLine={false} />
                        <Radar name="Moyenne" dataKey="A" stroke="#C4B5FD" strokeWidth={4} fill="#C4B5FD" fillOpacity={0.4} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-10 space-y-4">
                    <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
                       <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/10 rounded-full blur-2xl" aria-hidden="true"></div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-5">Statut de l'année</h4>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center group">
                             <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">Moyenne &ge; 10.00</span>
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${globalAverage >= 10 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
                                {globalAverage >= 10 ? <Award className="w-4 h-4" /> : <X className="w-4 h-4" />}
                             </div>
                          </div>
                          <div className="flex justify-between items-center group">
                             <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">Pas d'UE &lt; 8.00</span>
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${failedCompetencies.length === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                {failedCompetencies.length === 0 ? <Award className="w-4 h-4" /> : <X className="w-4 h-4" />}
                             </div>
                          </div>
                          <div className={`mt-6 pt-6 border-t border-slate-800 text-center font-black uppercase text-2xl tracking-tighter ${isValidated ? 'text-violet-400 animate-pulse' : 'text-slate-700'}`}>
                             {isValidated ? 'VALIDÉ !' : 'EN ATTENTE'}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <OnboardingModal isOpen={isOnboardingOpen} onComplete={handleOnboardingComplete} />
      
      <LockModal 
        isOpen={isLockModalOpen} 
        onUnlock={handleUnlock} 
        onClose={() => setIsLockModalOpen(false)} 
      />
      
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        aria-label={isMobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
        className="md:hidden fixed bottom-8 right-8 w-16 h-16 bg-violet-500 text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 active:scale-95 transition-all mobile-fab"
      >
        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>
    </div>
  );
};

export default App;
