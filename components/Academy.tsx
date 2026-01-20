
import React, { useState } from 'react';
import { Lock, GraduationCap, Sparkles, BookOpen, Brain, Globe, CheckCircle2, ChevronRight, PlayCircle, Loader2 } from 'lucide-react';

interface AcademyProps {
  userXp: number;
  onActionXp?: (amt: number, reason: string) => void;
}

const Academy: React.FC<AcademyProps> = ({ userXp, onActionXp }) => {
  const level = Math.floor(userXp / 1000);
  const isLocked = level < 20;
  const xpRemaining = 20000 - userXp;
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const COURSES = [
    {
      id: 'hebrew_intro',
      title: 'Hebraico Bíblico I',
      desc: 'Do Alef-Bet à leitura dos Profetas.',
      modules: ['Alfabeto e Vogais', 'Substantivos e Artigos', 'O Sistema Verbal Qal', 'Exegese do Gênesis'],
      icon: 'א',
      color: 'from-amber-600 to-orange-700'
    },
    {
      id: 'aramaic_intro',
      title: 'Aramaico do Cânon',
      desc: 'A língua dos exilados e de Daniel.',
      modules: ['Contexto do Exílio', 'Gramática Comparativa', 'Estudo de Daniel e Esdras', 'Targumim Antigos'],
      icon: '𐤀',
      color: 'from-emerald-600 to-teal-800'
    }
  ];

  if (isLocked) {
    return (
      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col items-center justify-center p-8 space-y-12 animate-in zoom-in duration-700">
        <div className="relative">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-sacred-soft border-4 border-sacred rounded-[3rem] md:rounded-[4rem] flex items-center justify-center text-sacred-soft shadow-2xl relative z-10">
            <Lock size={64} className="md:size-80 opacity-20" />
            <GraduationCap size={48} className="absolute text-accent animate-bounce" />
          </div>
          <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-divine font-black text-white uppercase tracking-tighter italic">Academia Selada</h2>
          <p className="text-sacred-soft text-lg md:text-xl font-medium font-serif italic">
            O Portal das Línguas Originais se abre apenas para aqueles que atingiram a maturidade teológica de Nível 20.
          </p>
        </div>

        <div className="w-full max-w-md bg-sacred-soft border-2 border-sacred p-8 rounded-[2.5rem] shadow-2xl space-y-6">
           <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-accent uppercase tracking-widest">Sua Jornada Logos</span>
              <span className="text-xs font-black text-white">{level} / 20</span>
           </div>
           <div className="w-full h-3 bg-sacred rounded-full overflow-hidden border border-sacred shadow-inner">
              <div 
                className="h-full bg-accent transition-all duration-1000 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                style={{ width: `${(level / 20) * 100}%` }}
              ></div>
           </div>
           <p className="text-center text-[9px] font-black text-sacred-soft uppercase tracking-[0.3em]">
             Faltam {xpRemaining.toLocaleString()} XP para a iluminação linguística.
           </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 opacity-40 grayscale pointer-events-none">
           {COURSES.map(c => (
             <div key={c.id} className="px-6 py-4 bg-sacred border border-sacred rounded-2xl flex items-center gap-4">
                <span className="text-2xl font-black text-accent">{c.icon}</span>
                <span className="text-[10px] font-black uppercase text-sacred-soft">{c.title}</span>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* HEADER ACADEMIA DESBLOQUEADA */}
      <div className="bg-gradient-to-br from-indigo-950 via-sacred-soft to-slate-950 p-12 md:p-16 rounded-[4rem] border border-accent/20 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:scale-125 transition-transform duration-1000 pointer-events-none">
          <Sparkles size={300} className="text-accent" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="px-5 py-2.5 bg-accent/20 rounded-full border border-accent/30 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-accent" />
              <span className="font-black text-[10px] text-accent uppercase tracking-[0.4em]">Acesso Profético Concedido</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-8xl font-divine font-black text-white tracking-tighter leading-none italic">ACADEMIA DABAR</h2>
          <p className="text-xl md:text-2xl text-slate-300 font-serif italic max-w-3xl leading-relaxed">
            Bem-vindo ao centro de línguas originais. Aqui o Logos é estudado em sua essência mais pura, através dos manuscritos sagrados.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {COURSES.map(course => (
          <div 
            key={course.id} 
            className="bg-sacred-soft/40 border-2 border-sacred p-10 rounded-[3.5rem] shadow-2xl hover:border-accent/40 transition-all group flex flex-col"
          >
             <div className="flex items-start justify-between mb-8">
                <div className={`w-20 h-20 bg-gradient-to-br ${course.color} rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl border-4 border-sacred group-hover:scale-110 transition-transform`}>
                  {course.icon}
                </div>
                <div className="text-right">
                   <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em]">Curso Avançado</span>
                   <p className="text-[8px] text-sacred-soft font-bold uppercase tracking-widest mt-1">Status: Disponível</p>
                </div>
             </div>

             <h3 className="text-3xl font-divine font-black text-white mb-4 uppercase tracking-tighter italic">{course.title}</h3>
             <p className="text-sacred-soft text-lg font-serif italic mb-10 flex-1">{course.desc}</p>

             <div className="space-y-4 mb-10">
                <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2 mb-4">
                  <BookOpen size={14} className="text-accent" /> Módulos do Currículo
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {course.modules.map(m => (
                     <div key={m} className="px-5 py-4 bg-sacred border border-sacred rounded-2xl flex items-center gap-3 group-hover:bg-sacred-soft transition-all">
                        <div className="w-2 h-2 rounded-full bg-accent/40"></div>
                        <span className="text-[10px] font-black text-sacred-soft uppercase tracking-tighter">{m}</span>
                     </div>
                   ))}
                </div>
             </div>

             <button 
              onClick={() => {
                setSelectedCourse(course.id);
                onActionXp?.(50, `Ingresso em ${course.title}`);
              }}
              className="w-full py-5 bg-accent text-sacred rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:opacity-90 shadow-accent active:scale-95 transition-all flex items-center justify-center gap-4 invert"
             >
                <PlayCircle size={22} /> INICIAR ESTUDO
             </button>
          </div>
        ))}
      </div>

      {/* FOOTER ACADEMIA */}
      <div className="flex flex-col items-center justify-center py-20 text-center gap-8 border-t border-sacred">
         <Globe className="text-accent/20" size={64} />
         <div className="space-y-2">
            <h4 className="text-xl font-black text-sacred uppercase tracking-widest">Sincronização com DABAR AI</h4>
            <p className="text-xs text-sacred-soft max-w-md mx-auto leading-relaxed">
               Cada lição conta com suporte em tempo real do Mentor IA para análise morfológica e transliteração dinâmica.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Academy;
