import React, { useState, useMemo } from 'react';
import { TRACKS } from './constants';
import { GradeMap, ModuleType, SemesterData, Competence } from './types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { RotateCcw, Award, AlertCircle, ChevronRight, Calculator, Menu, X, Download, GraduationCap, Terminal, Palette, Presentation, User, Home, Sparkles, AlertTriangle, Printer } from 'lucide-react';

// --- Fonctions de calcul ---

const calculateWeightedAverage = (modules: any[], compId: string, grades: GradeMap) => {
  let totalScore = 0;
  let totalCoeff = 0;

  modules.forEach(mod => {
    const weighting = mod.weightings.find((w: any) => w.competenceId === compId);
    if (weighting) {
      const grade = grades[mod.id];
      if (grade !== undefined) {
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
  <header className="bg-[#C4B5FD] text-white h-16 flex items-center justify-between px-4 shadow-sm z-50 relative print:hidden">
    <div className="flex items-center gap-4">
      <button onClick={onGoHome} className="p-2 hover:bg-white/10 rounded-full transition-colors">
         <Home className="w-6 h-6" />
      </button>
      <div className="flex flex-col cursor-pointer" onClick={onGoHome}>
        <div className="text-lg font-black tracking-tight leading-none uppercase">BUT MMI</div>
        <div className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Simulateur</div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col items-end mr-2 text-violet-900">
        <span className="text-[10px] font-bold opacity-70 uppercase tracking-wider">Zineb A.</span>
        <span className="text-xs font-bold">Projet Personnel</span>
      </div>
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Infos">
        <Sparkles className="w-5 h-5 text-violet-900" />
      </button>
    </div>
  </header>
);

const OnboardingModal = ({ isOpen, onComplete, isEditMode = false, onClose }: any) => {
  if (!isOpen) return null;

  const options = [
    { id: '1annee', label: '1ère année (Commun)', icon: <GraduationCap className="w-8 h-8 text-violet-500" />, trackId: 'crea', semesterId: 'S1', desc: 'S1 & S2 Tronc commun' },
    { id: 'crea', label: 'Création Numérique', icon: <Palette className="w-8 h-8 text-violet-400" />, trackId: 'crea', semesterId: 'S3-CN', desc: 'Parcours Créa' },
    { id: 'dev', label: 'Développement Web', icon: <Terminal className="w-8 h-8 text-violet-400" />, trackId: 'dev', semesterId: 'S1', desc: 'Parcours Dev' },
    { id: 'strat', label: 'Stratégie de Com', icon: <Presentation className="w-8 h-8 text-violet-400" />, trackId: 'strat', semesterId: 'S1', desc: 'Parcours Strat' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300 no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200">
        <div className="bg-[#DDD6FE] p-6 text-center border-b border-violet-100 relative">
           {isEditMode && onClose && (
             <button onClick={onClose} className="absolute right-4 top-4 text-violet-600 hover:bg-white/20 p-1 rounded-full"><X className="w-5 h-5" /></button>
           )}
           <h2 className="text-2xl font-bold text-violet-900 mb-2 flex items-center justify-center gap-3">
             <User className="w-6 h-6" />
             {isEditMode ? 'Modifier mon parcours' : 'Bienvenue'}
           </h2>
           <p className="text-violet-600 text-sm">Calculez votre moyenne pour le semestre.</p>
        </div>
        <div className="p-8 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((opt) => (
              <button key={opt.id} onClick={() => onComplete(opt.trackId, opt.semesterId)} className="flex items-center p-4 rounded-xl border-2 border-white bg-white shadow-sm hover:border-violet-300 hover:shadow-md hover:scale-[1.02] transition-all group text-left h-24">
                <div className="bg-slate-50 p-3 rounded-lg mr-4 border border-slate-100 group-hover:bg-violet-50 transition-colors">{opt.icon}</div>
                <div>
                  <div className="font-bold text-slate-800 text-lg leading-tight group-hover:text-violet-600">{opt.label}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full text-[11px] font-bold text-violet-600 uppercase tracking-widest border border-violet-100">
                <Sparkles className="w-3 h-3" /> Par Zineb A.
             </div>
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
  
  const isEliminatory = average < 8 && Object.keys(grades).some(id => 
    semester.modules.find((m: any) => m.id === id)?.weightings.some((w: any) => w.competenceId === comp.id)
  );
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden mb-6 transition-all duration-300 break-inside-avoid ${isEliminatory ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'}`}>
      <div className="px-6 py-4 flex justify-between items-center bg-white relative">
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: comp.color }}></div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-sm text-white bg-slate-800 font-mono">{comp.id}</span>
            {comp.name}
          </h3>
          {isEliminatory && <span className="text-rose-500 font-bold flex items-center gap-1 text-[10px] uppercase mt-1"><AlertTriangle className="w-3 h-3" /> Éliminatoire</span>}
        </div>
        <div className="text-right pl-4 border-l border-slate-100">
           <div className={`text-2xl font-black ${average >= 10 ? 'text-violet-600' : average < 8 ? 'text-rose-500' : 'text-amber-500'}`}>{average} <span className="text-sm font-normal text-slate-400">/20</span></div>
           <div className="text-xs text-slate-500">Moyenne UE</div>
        </div>
      </div>
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
               <div className="w-1 h-3 rounded bg-slate-200"></div> Ressources
            </h4>
            <div className="space-y-2">
              {resources.map((mod: any) => (
                <div key={mod.id} className="flex items-center justify-between group">
                  <span className="text-sm text-slate-700 leading-tight flex-1 mr-4">{mod.name}</span>
                  <input type="number" min="0" max="20" step="0.01" placeholder="-" value={grades[mod.id] ?? ''} onChange={(e) => onGradeChange(mod.id, e.target.value)}
                    className={`w-14 h-8 text-center text-sm font-bold border rounded focus:ring-2 focus:ring-violet-300 outline-none transition-all ${grades[mod.id] !== undefined ? 'bg-white border-violet-200 shadow-sm' : 'bg-white border-slate-200'}`} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
               <div className="w-1 h-3 rounded bg-violet-200"></div> SAÉ
            </h4>
            <div className="space-y-2">
              {saes.map((mod: any) => (
                <div key={mod.id} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 leading-tight flex-1 mr-4">{mod.name}</span>
                  <input type="number" min="0" max="20" step="0.01" placeholder="-" value={grades[mod.id] ?? ''} onChange={(e) => onGradeChange(mod.id, e.target.value)}
                    className={`w-14 h-8 text-center text-sm font-bold border rounded focus:ring-2 focus:ring-violet-300 outline-none transition-all ${grades[mod.id] !== undefined ? 'bg-white border-violet-200 shadow-sm' : 'bg-white border-slate-200'}`} />
                </div>
              ))}
            </div>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeTrack = useMemo(() => TRACKS.find(t => t.id === activeTrackId) || TRACKS[0], [activeTrackId]);
  const activeSemester = useMemo(() => activeTrack.semesters.find(s => s.id === activeSemesterId) || activeTrack.semesters[0], [activeTrack, activeSemesterId]);
  
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
      return {...prev, [moduleId]: num};
    });
  };

  const radarData = useMemo(() => {
    return activeSemester.competencies.map(comp => ({
      subject: comp.id,
      A: calculateCompetenceAverage(comp, activeSemester, grades),
      fullMark: 20
    }));
  }, [activeSemester, grades]);

  return (
    <div className="flex flex-col h-screen bg-[#F5F3FF] font-sans text-slate-900">
      <TopBar onGoHome={() => setIsOnboardingOpen(true)} />
      
      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 md:static md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-2xl print:hidden`}>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#C4B5FD]" /> 
              MMI Sim
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Par Zineb A.</p>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <div className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Semestres</div>
            {activeTrack.semesters.map(sem => (
              <button key={sem.id} onClick={() => { setActiveSemesterId(sem.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${activeSemesterId === sem.id ? 'bg-violet-500 text-white shadow-lg shadow-violet-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                {sem.name} <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-800 space-y-3">
            <div className="grid grid-cols-2 gap-2">
               <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] text-slate-300 transition-colors">
                  <Printer className="w-4 h-4 mb-1" /> Imprimer
               </button>
               <button onClick={() => {
                 const data = JSON.stringify(grades);
                 const blob = new Blob([data], {type: 'application/json'});
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url;
                 a.download = `notes_mmi_${activeSemesterId}.json`;
                 a.click();
               }} className="flex flex-col items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] text-slate-300 transition-colors">
                  <Download className="w-4 h-4 mb-1" /> Sauver
               </button>
            </div>
            <button onClick={() => setGrades({})} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-rose-900/30 text-slate-500 hover:text-rose-400 rounded-lg text-xs transition-all border border-transparent hover:border-rose-900/50">
               <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <div className="pt-4 text-center border-t border-slate-800">
               <div className="text-[11px] font-bold text-white mb-0.5">Zineb A.</div>
               <div className="text-[9px] text-slate-500 italic tracking-tight">Version 2025</div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#F5F3FF]">
          <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-10 print:bg-white">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{activeSemester.name}</h2>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{activeTrack.name}</p>
            </div>
            <div className={`px-5 py-2 rounded-xl border-2 flex items-center gap-4 transition-all duration-500 ${isValidated ? 'bg-violet-50 border-violet-100' : 'bg-slate-50 border-slate-100'}`}>
               <div className="text-right">
                 <div className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Moyenne Générale</div>
                 <div className={`text-3xl font-black leading-none ${isValidated ? 'text-violet-600' : 'text-slate-800'}`}>{globalAverage}</div>
               </div>
               <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full shadow-inner border border-slate-50">
                 {isValidated ? <Award className="w-6 h-6 text-violet-500" /> : <Calculator className="w-6 h-6 text-slate-300" />}
               </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {failedCompetencies.length > 0 && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-700 text-sm font-bold shadow-sm">
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                    Une UE est inférieure à 8/20 : Semestre non validable.
                  </div>
                )}
                {activeSemester.competencies.map(comp => (
                  <CompetenceCard key={comp.id} comp={comp} semester={activeSemester} grades={grades} onGradeChange={handleGradeChange} />
                ))}
              </div>

              <div className="lg:col-span-1 space-y-6 print:hidden">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-violet-300 rounded"></div> Profil Compétences
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                        <PolarGrid stroke="#f1f5f9" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} axisLine={false} />
                        <Radar name="Moyenne" dataKey="A" stroke="#C4B5FD" strokeWidth={3} fill="#C4B5FD" fillOpacity={0.4} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl">
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Statut de validation</h3>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-sm text-slate-400">Global &ge; 10</span>
                         {globalAverage >= 10 ? <Award className="w-4 h-4 text-violet-400" /> : <X className="w-4 h-4 text-slate-700" />}
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-sm text-slate-400">UEs &ge; 8</span>
                         {failedCompetencies.length === 0 ? <Award className="w-4 h-4 text-violet-400" /> : <X className="w-4 h-4 text-rose-400" />}
                      </div>
                      <div className={`mt-4 pt-4 border-t border-slate-800 text-center font-black uppercase text-xl ${isValidated ? 'text-violet-400' : 'text-slate-700'}`}>
                         {isValidated ? 'VALIDE' : 'NON VALIDE'}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <OnboardingModal isOpen={isOnboardingOpen} onComplete={(t: string, s: string) => { setActiveTrackId(t); setActiveSemesterId(s); setIsOnboardingOpen(false); }} />
      
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-violet-400 text-white rounded-full shadow-2xl flex items-center justify-center z-50">
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </div>
  );
};

export default App;