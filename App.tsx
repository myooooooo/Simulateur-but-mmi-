
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TRACKS } from './constants';
import { GradeMap, ModuleType, SemesterData, Competence } from './types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { RotateCcw, Award, AlertCircle, ChevronRight, Calculator, Menu, X, Download, Upload, GraduationCap, Terminal, Palette, Presentation, User, Home, Sparkles, AlertTriangle, Printer, ExternalLink, Linkedin, ArrowRight, Heart, Eye } from 'lucide-react';

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

const TopBar = ({ onGoHome, progress }: { onGoHome: () => void, progress: number }) => (
  <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm z-30 sticky top-0 print:hidden">
    <div className="flex items-center gap-4">
      <button onClick={onGoHome} aria-label="Retour à l'accueil" className="p-2 hover:bg-slate-100 rounded-xl transition-all active:scale-95 text-slate-600">
         <Home className="w-6 h-6" />
      </button>
      <div className="flex flex-col cursor-pointer" onClick={onGoHome}>
        <div className="text-xl font-black tracking-tighter leading-none uppercase text-violet-600">MMI SIM</div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Simulateur BUT</div>
      </div>
    </div>
    
    <div className="flex-1 max-w-md mx-6 hidden md:block">
      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        <span>Progression saisie</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-violet-500 transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <a 
        href="https://www.linkedin.com/in/zineb-anssafou" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-violet-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-violet-200"
      >
        <Linkedin className="w-4 h-4" />
        <span className="hidden lg:inline">Zineb A.</span>
      </a>
    </div>
  </header>
);

const OnboardingModal = ({ isOpen, onComplete }: any) => {
  if (!isOpen) return null;

  const options = [
    { id: '1annee', label: '1ère année (Commun)', icon: <GraduationCap className="w-8 h-8" />, trackId: 'crea', filter: '1-2', desc: 'S1 & S2 Tronc commun' },
    { id: 'crea', label: 'Création Numérique', icon: <Palette className="w-8 h-8" />, trackId: 'crea', filter: '1-6', desc: 'Parcours complet (S1-S6)' },
    { id: 'dw', label: 'Développement Web', icon: <Terminal className="w-8 h-8" />, trackId: 'dw', filter: '1-6', desc: 'Parcours complet (S1-S6)' },
    { id: 'sc', label: 'Stratégie de Com', icon: <Presentation className="w-8 h-8" />, trackId: 'sc', filter: '1-6', desc: 'Parcours complet (S1-S6)' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-500 no-print">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-white/50 transform transition-all scale-100">
        <div className="bg-[#F5F3FF] p-8 text-center relative overflow-hidden">
           <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-200/50 rounded-full blur-3xl" aria-hidden="true"></div>
           <h1 className="text-3xl font-black text-violet-900 mb-4 flex items-center justify-center gap-3">
             <div className="p-2 bg-white rounded-xl shadow-sm">
               <Calculator className="w-6 h-6 text-violet-600" aria-label="Icône calculatrice" />
             </div>
             Simulateur MMI
           </h1>
           <p className="text-slate-600 font-medium text-sm max-w-lg mx-auto leading-relaxed">
             Sélectionnez votre parcours pour charger les coefficients officiels de la réforme BUT MMI (Maquettes 2025).
           </p>
        </div>
        <div className="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt) => (
            <button 
              key={opt.id} 
              onClick={() => onComplete(opt.trackId, opt.filter)} 
              className="flex items-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-violet-300 hover:shadow-lg hover:-translate-y-0.5 transition-all group text-left"
            >
              <div className="bg-white p-3 rounded-xl mr-4 text-violet-500 shadow-sm border border-slate-100 group-hover:text-violet-600 group-hover:scale-110 transition-all" aria-hidden="true">{opt.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-lg leading-tight group-hover:text-violet-700">{opt.label}</div>
                <div className="text-[12px] text-slate-500 font-semibold mt-1">{opt.desc}</div>
              </div>
            </button>
          ))}
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
  const hasNotes = Object.keys(grades).some(id => [...resources, ...saes].some(m => m.id === id));
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden mb-6 transition-all duration-300 ${isEliminatory && hasNotes ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-200 hover:border-violet-300 hover:shadow-md'}`}>
      <div className="px-6 py-5 flex justify-between items-center bg-white relative border-b border-slate-100">
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: comp.color }} aria-hidden="true"></div>
        <div className="flex-1 pl-2">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs text-white bg-slate-700 font-mono tracking-tighter font-bold">{comp.id}</span>
            {comp.name}
          </h3>
          {isEliminatory && hasNotes && <span className="text-rose-600 font-bold flex items-center gap-1 text-[11px] uppercase mt-1 tracking-wide"><AlertTriangle className="w-3 h-3" /> Moyenne inférieure à 8/20</span>}
        </div>
        <div className="text-right pl-6 border-l border-slate-100">
           <div className={`text-3xl font-black tabular-nums tracking-tight ${!hasNotes ? 'text-slate-200' : average >= 10 ? 'text-violet-600' : average < 8 ? 'text-rose-500' : 'text-amber-500'}`}>
             {average.toFixed(2)}
             <span className="text-sm font-bold text-slate-300 ml-1">/20</span>
           </div>
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Moyenne UE</div>
        </div>
      </div>
      <div className="px-6 py-6 bg-slate-50/30 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] mb-4 flex items-center gap-2 pb-2 border-b border-slate-200">
               Ressources
            </h4>
            <div className="space-y-3">
              {resources.map((mod: any) => (
                <div key={mod.id} className="flex items-center justify-between group">
                  <label htmlFor={`grade-${mod.id}`} className="text-sm font-semibold text-slate-600 leading-tight flex-1 mr-4 group-hover:text-slate-900 transition-colors cursor-pointer">{mod.name}</label>
                  <input 
                    id={`grade-${mod.id}`}
                    type="number" 
                    min="0" max="20" step="0.25" placeholder="-" 
                    value={grades[mod.id] ?? ''} 
                    onChange={(e) => onGradeChange(mod.id, e.target.value)}
                    className={`w-16 h-10 text-center text-sm font-bold border rounded-lg focus:ring-2 focus:ring-violet-200 focus:border-violet-400 outline-none transition-all placeholder-slate-300 ${grades[mod.id] !== undefined ? 'bg-white border-violet-200 text-violet-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] mb-4 flex items-center gap-2 pb-2 border-b border-slate-200">
               SAÉ (Situations d'Apprentissage)
            </h4>
            <div className="space-y-3">
              {saes.map((mod: any) => (
                <div key={mod.id} className="flex items-center justify-between group">
                  <label htmlFor={`grade-${mod.id}`} className="text-sm font-semibold text-slate-600 leading-tight flex-1 mr-4 group-hover:text-slate-900 transition-colors cursor-pointer">{mod.name}</label>
                  <input 
                    id={`grade-${mod.id}`}
                    type="number" 
                    min="0" max="20" step="0.25" placeholder="-" 
                    value={grades[mod.id] ?? ''} 
                    onChange={(e) => onGradeChange(mod.id, e.target.value)}
                    className={`w-16 h-10 text-center text-sm font-bold border rounded-lg focus:ring-2 focus:ring-violet-200 focus:border-violet-400 outline-none transition-all placeholder-slate-300 ${grades[mod.id] !== undefined ? 'bg-white border-violet-200 text-violet-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`} />
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
  const [semesterFilter, setSemesterFilter] = useState<string>('1-2');
  const [activeSemesterId, setActiveSemesterId] = useState<string>('S1');
  const [grades, setGrades] = useState<GradeMap>({});
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Data
  useEffect(() => {
    const savedData = localStorage.getItem('mmi_sim_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.grades) setGrades(parsed.grades);
        if (parsed.track) setActiveTrackId(parsed.track);
        if (parsed.sem) setActiveSemesterId(parsed.sem);
        if (parsed.filter) setSemesterFilter(parsed.filter);
      } catch (e) { console.error(e); }
    }
  }, []);

  // Auto Save
  useEffect(() => {
    const data = { grades, track: activeTrackId, sem: activeSemesterId, filter: semesterFilter };
    localStorage.setItem('mmi_sim_data', JSON.stringify(data));
  }, [grades, activeTrackId, activeSemesterId, semesterFilter]);

  const activeTrack = useMemo(() => TRACKS.find(t => t.id === activeTrackId) || TRACKS[0], [activeTrackId]);
  
  const filteredSemesters = useMemo(() => {
    return activeTrack.semesters.filter(s => {
      const numMatch = s.id.match(/\d+/);
      const num = numMatch ? parseInt(numMatch[0]) : 1;
      if (semesterFilter === '1-2') return num <= 2;
      return true;
    });
  }, [activeTrack, semesterFilter]);

  const activeSemester = useMemo(() => {
    return filteredSemesters.find(s => s.id === activeSemesterId) || filteredSemesters[0];
  }, [filteredSemesters, activeSemesterId]);
  
  const globalAverage = useMemo(() => calculateSemesterGlobalAverage(activeSemester, grades), [activeSemester, grades]);
  
  const failedCompetencies = useMemo(() => activeSemester.competencies.filter(comp => {
    const avg = calculateCompetenceAverage(comp, activeSemester, grades);
    const hasData = Object.keys(grades).some(id => activeSemester.modules.some(m => m.id === id && m.weightings.some(w => w.competenceId === comp.id)));
    return hasData && avg < 8;
  }), [activeSemester, grades]);

  const isValidated = globalAverage >= 10 && failedCompetencies.length === 0;

  // Progress Calculation
  const progress = useMemo(() => {
    const totalModules = activeSemester.modules.length;
    if (totalModules === 0) return 0;
    const filledModules = activeSemester.modules.filter(m => grades[m.id] !== undefined).length;
    return Math.round((filledModules / totalModules) * 100);
  }, [activeSemester, grades]);

  // Check if current semester has any data
  const hasDataForCurrentSemester = useMemo(() => {
    return Object.keys(grades).some(gradeId => 
      activeSemester.modules.some(m => m.id === gradeId)
    );
  }, [grades, activeSemester]);

  const handleGradeChange = (moduleId: string, value: string) => {
    setGrades(prev => {
      if (value === '') { const n = {...prev}; delete n[moduleId]; return n; }
      const num = parseFloat(value);
      return {...prev, [moduleId]: Math.min(20, Math.max(0, isNaN(num) ? 0 : num))};
    });
  };

  const handleOnboardingComplete = (t: string, f: string) => {
    setGrades({});
    setActiveTrackId(t);
    setSemesterFilter(f);
    setActiveSemesterId('S1');
    setIsOnboardingOpen(false);
  };

  const radarData = useMemo(() => {
    return activeSemester.competencies.map(comp => ({
      subject: comp.id,
      A: calculateCompetenceAverage(comp, activeSemester, grades),
      fullMark: 20
    }));
  }, [activeSemester, grades]);

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      <TopBar onGoHome={() => setIsOnboardingOpen(true)} progress={progress} />
      
      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        {/* SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 md:static md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col print:hidden`}>
          <div className="p-8 pb-4">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Navigation</div>
             <nav className="space-y-1">
              {filteredSemesters.map(sem => (
                <button key={sem.id} onClick={() => { setActiveSemesterId(sem.id); setIsMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all border-l-4 ${activeSemesterId === sem.id ? 'bg-violet-50 text-violet-700 border-violet-500' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  {sem.name} <ChevronRight className={`w-4 h-4 transition-transform opacity-50 ${activeSemesterId === sem.id ? 'rotate-90 text-violet-500' : ''}`} />
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-slate-100 space-y-3 bg-slate-50/50">
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".json" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (re) => {
                try {
                  const content = JSON.parse(re.target?.result as string);
                  if (content.grades) { setGrades(content.grades); window.alert("Notes importées avec succès !"); }
                } catch (err) { window.alert("Fichier invalide."); }
              };
              reader.readAsText(file);
            }} />
            
            <div className="grid grid-cols-2 gap-2">
               <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 transition-all shadow-sm"><Upload className="w-3 h-3" /> Importer</button>
               <button onClick={() => {
                 const blob = new Blob([JSON.stringify({ grades, track: activeTrackId, sem: activeSemesterId, filter: semesterFilter })], {type: 'application/json'});
                 const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `notes_mmi.json`; a.click();
               }} className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 transition-all shadow-sm"><Download className="w-3 h-3" /> Sauver</button>
            </div>
            <button onClick={() => { if(confirm('Voulez-vous vraiment effacer toutes les notes ?')) setGrades({}); }} className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-rose-50 text-rose-500 rounded-lg text-xs font-bold transition-all border border-rose-100 hover:border-rose-200 shadow-sm"><RotateCcw className="w-3 h-3" /> Réinitialiser le semestre</button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: INPUTS */}
              <div className="xl:col-span-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{activeSemester.name}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-1">{semesterFilter === '1-2' ? 'Tronc Commun' : activeTrack.name}</p>
                  </div>
                  {/* Floating CTA for Mobile primarily */}
                  <div className="md:hidden">
                    <button 
                      onClick={() => document.getElementById('results-section')?.scrollIntoView({behavior: 'smooth'})}
                      className="w-full py-3 bg-violet-600 text-white rounded-xl font-bold shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" /> Voir Résultats
                    </button>
                  </div>
                </div>

                {failedCompetencies.length > 0 && hasDataForCurrentSemester && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-rose-500">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-rose-700">Attention : Validation compromise</div>
                      <div className="text-xs text-rose-600 mt-0.5">La moyenne de certaines unités d'enseignement est inférieure à 8/20.</div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  {activeSemester.competencies.map(comp => (
                    <CompetenceCard key={comp.id} comp={comp} semester={activeSemester} grades={grades} onGradeChange={handleGradeChange} />
                  ))}
                </div>

                {/* Footer Section */}
                <footer className="mt-12 border-t border-slate-200 pt-8 text-center print:hidden">
                   <p className="text-sm text-slate-500 mb-4">Outil non-officiel développé pour aider les étudiants.</p>
                </footer>
              </div>

              {/* RIGHT COLUMN: RESULTS */}
              <div id="results-section" className="xl:col-span-4 space-y-6 print:hidden">
                <div className="sticky top-6 space-y-6">
                  {/* RESULT CARD */}
                  <div className={`bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border transition-all duration-500 overflow-hidden ${hasDataForCurrentSemester ? 'border-violet-100' : 'border-slate-100'}`}>
                    {hasDataForCurrentSemester ? (
                      <>
                        <div className="flex items-center justify-between mb-6">
                           <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-violet-500"></div> Analyse
                           </h3>
                           {isValidated ? (
                             <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide">Validé</span>
                           ) : (
                             <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide">En cours</span>
                           )}
                        </div>
                        
                        <div className="text-center mb-8 relative z-10">
                          <div className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-2">Moyenne Générale</div>
                          <div className={`text-5xl font-black tracking-tight leading-none ${isValidated ? 'text-violet-600' : 'text-slate-800'}`}>
                            {globalAverage.toFixed(2)}
                            <span className="text-lg text-slate-300 ml-1 font-bold">/20</span>
                          </div>
                        </div>

                        <div className="h-64 w-full -ml-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                              <PolarGrid stroke="#E2E8F0" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} axisLine={false} />
                              <Radar name="Moyenne" dataKey="A" stroke="#8B5CF6" strokeWidth={3} fill="#8B5CF6" fillOpacity={0.2} />
                              <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                itemStyle={{ color: '#7C3AED' }}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </>
                    ) : (
                      <div className="py-12 px-6 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                          <Calculator className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800 mb-2">Prêt à simuler ?</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Saisissez vos premières notes dans le formulaire pour générer votre radar de compétences et calculer votre moyenne instantanément.
                        </p>
                        <div className="mt-8 opacity-20 pointer-events-none grayscale blur-[1px]">
                          <div className="h-32 w-32 rounded-full border-4 border-slate-300 mx-auto"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SOFT CONVERSION CARD */}
                  <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-violet-200 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-700"></div>
                     <div className="relative z-10">
                       <div className="flex items-center gap-3 mb-3">
                         <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                           <Heart className="w-5 h-5 text-pink-200 fill-pink-200" />
                         </div>
                         <h4 className="font-bold text-sm">Soutenez le projet</h4>
                       </div>
                       <p className="text-xs text-violet-100 leading-relaxed mb-4">
                         Cet outil est gratuit et maintenu sur mon temps libre. Un simple suivi sur LinkedIn m'aide énormément !
                       </p>
                       <a 
                         href="https://www.linkedin.com/in/zineb-anssafou" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex items-center justify-between w-full px-4 py-3 bg-white text-violet-700 rounded-xl text-xs font-black shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                       >
                         <span>Suivre sur LinkedIn</span>
                         <ArrowRight className="w-4 h-4" />
                       </a>
                     </div>
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      <OnboardingModal isOpen={isOnboardingOpen} onComplete={handleOnboardingComplete} />
      
      {/* Mobile Menu Button */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-all">
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default App;
