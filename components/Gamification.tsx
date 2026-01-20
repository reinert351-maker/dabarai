
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Flame, Calendar, Award, CheckCircle2, Sparkles, Zap, ArrowRight, BookOpen, Brain, Map as MapIcon, MessageSquare } from 'lucide-react';

interface GamificationProps {
  xp: number;
  onAddXp: (amount: number, reason?: string) => void;
}

const Gamification: React.FC<GamificationProps> = ({ xp, onAddXp }) => {
  const [completedMissions, setCompletedMissions] = useState<string[]>(() => {
    const saved = localStorage.getItem('dabar_missions_log');
    return saved ? JSON.parse(saved) : [];
  });

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    localStorage.setItem('dabar_missions_log', JSON.stringify(completedMissions));
  }, [completedMissions]);

  // Timer de Reset (Simulado para o fim do dia)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = end.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const level = Math.floor(xp / 1000);
  const nextLevelXp = (level + 1) * 1000;
  
  const handleCompleteMission = (id: string, amount: number, title: string) => {
    if (!completedMissions.includes(id)) {
      setCompletedMissions([...completedMissions, id]);
      onAddXp(amount, title);
    }
  };

  const DAILY_TASKS = [
    { id: 'task_read', title: 'Lectio Divina', desc: 'Leia 1 capítulo completo hoje.', xp: 100, icon: BookOpen, color: 'text-blue-400' },
    { id: 'task_ai', title: 'Consulta ao Mentor', desc: 'Faça uma pergunta teológica à IA.', xp: 150, icon: Brain, color: 'text-purple-400' },
    { id: 'task_map', title: 'Exploração Arqueológica', desc: 'Navegue por um mapa bíblico.', xp: 120, icon: MapIcon, color: 'text-emerald-400' },
    { id: 'task_comm', title: 'Koinonia Diária', desc: 'Envie uma mensagem na comunidade.', xp: 80, icon: MessageSquare, color: 'text-amber-400' },
  ];

  const now = new Date();
  const currentMonthYear = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      
      {/* HEADER DA JORNADA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-black font-serif text-white tracking-tighter uppercase italic">Caminho do Logos</h2>
          <p className="text-sacred-soft text-xl font-medium italic">Sua progressão no conhecimento revelado.</p>
        </div>
        <div className="bg-sacred-soft border border-sacred px-8 py-4 rounded-3xl flex items-center gap-6 shadow-xl">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">Nível {level} • Maturidade</span>
              <span className="text-xs font-black text-white">{(nextLevelXp - xp).toLocaleString()} XP para Nível {level + 1}</span>
           </div>
           <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-sacred font-black text-xl invert">
              {level}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* MISSÃO ÉPICA (MAIOR DESTAQUE) */}
        <div className="xl:col-span-2 bg-gradient-to-br from-indigo-950 via-sacred-soft to-slate-950 border border-indigo-500/20 p-10 md:p-14 rounded-[4rem] shadow-2xl relative group overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:scale-125 transition-transform duration-1000 pointer-events-none">
            <Sparkles size={300} className="text-indigo-500" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="px-5 py-2.5 bg-indigo-500/20 rounded-full border border-indigo-500/30 flex items-center gap-2">
                <Zap size={14} className="text-indigo-400 animate-pulse" />
                <span className="font-black text-[10px] text-indigo-400 uppercase tracking-[0.4em]">Missão Épica Semanal</span>
              </div>
              <div className="flex items-center gap-2 text-sacred-soft text-[10px] font-black uppercase tracking-widest">
                <Calendar size={14} /> Expira em: 3 dias
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none italic uppercase">Pescador de Homens</h2>
            <p className="text-lg md:text-xl text-slate-400 font-serif italic max-w-2xl mb-10 leading-relaxed">
              Complete 5 exegeses assistidas pela IA e compartilhe um "Tratado" na comunidade para provar sua proficiência ministerial.
            </p>
          </div>

          <div className="space-y-8">
            <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-1">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-1000"
                style={{ width: completedMissions.includes('mission_epic') ? '100%' : '40%' }}
              ></div>
            </div>
            
            {!completedMissions.includes('mission_epic') ? (
              <button 
                onClick={() => handleCompleteMission('mission_epic', 500, 'Pescador de Homens')}
                className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-indigo-500 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 group"
              >
                Resgatar Recompensa +500 XP <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            ) : (
              <div className="w-full py-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                <CheckCircle2 size={20} /> Título Adquirido
              </div>
            )}
          </div>
        </div>

        {/* MISSÕES DIÁRIAS LISTA */}
        <div className="bg-sacred-soft/40 border border-sacred p-8 md:p-10 rounded-[3.5rem] shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-sacred pb-6">
            <div className="flex items-center gap-3">
               <Target className="text-accent" size={24} />
               <h3 className="font-black text-white uppercase tracking-widest text-sm">Missões Diárias</h3>
            </div>
            <span className="text-[9px] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-lg animate-pulse">{timeLeft}</span>
          </div>

          <div className="space-y-4">
            {DAILY_TASKS.map(task => {
              const Icon = task.icon;
              const isDone = completedMissions.includes(task.id);
              return (
                <button 
                  key={task.id}
                  onClick={() => handleCompleteMission(task.id, task.xp, task.title)}
                  disabled={isDone}
                  className={`w-full p-5 rounded-[2rem] border-2 transition-all text-left flex items-center gap-5 group ${isDone ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' : 'bg-sacred border-sacred hover:border-accent/40'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isDone ? 'bg-emerald-500/20 text-emerald-500' : 'bg-sacred-soft text-accent group-hover:scale-110 transition-transform'}`}>
                    {isDone ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-black uppercase tracking-tight ${isDone ? 'text-emerald-500' : 'text-white'}`}>{task.title}</p>
                    <p className="text-[9px] text-sacred-soft font-bold uppercase truncate">{task.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black ${isDone ? 'text-emerald-500 line-through' : 'text-accent'}`}>+{task.xp} XP</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          <p className="text-center text-[8px] font-black text-sacred-soft uppercase tracking-[0.3em] pt-4">As missões resetam à meia-noite.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CALENDÁRIO DINÂMICO */}
        <div className="lg:col-span-2 bg-sacred-soft/40 border border-sacred p-10 md:p-14 rounded-[3.5rem] shadow-2xl">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black flex items-center gap-5 uppercase tracking-tighter text-white">
              <Calendar size={32} className="text-accent" /> Histórico de Fidelidade
            </h3>
            <span className="text-[10px] font-black text-sacred-soft bg-sacred border border-sacred px-6 py-3 rounded-2xl tracking-[0.3em] uppercase">{currentMonthYear}</span>
          </div>
          
          <div className="grid grid-cols-7 gap-3 md:gap-4">
             {Array.from({length: daysInMonth}).map((_, i) => {
               const dayNum = i + 1;
               const isPast = dayNum < currentDay;
               const isToday = dayNum === currentDay;
               
               return (
                 <div 
                   key={i} 
                   className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center font-black text-xs transition-all relative group ${
                     isPast ? 'bg-accent text-sacred border-accent shadow-xl invert' : 
                     isToday ? 'bg-sacred border-accent text-white animate-pulse' :
                     'bg-sacred/40 border-sacred text-sacred-soft opacity-30'
                   }`}
                 >
                   <span>{dayNum}</span>
                   {isPast && <div className="absolute bottom-1 right-1"><CheckCircle2 size={10} className="opacity-60" /></div>}
                 </div>
               );
             })}
          </div>
        </div>

        {/* STATUS ACADEMIA (BLOQUEADO) */}
        <div className="bg-gradient-to-br from-indigo-950/40 to-sacred-soft border border-indigo-500/20 p-10 rounded-[3.5rem] text-center shadow-2xl flex flex-col justify-center items-center group">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-sacred border-4 border-sacred rounded-[2rem] flex items-center justify-center text-sacred-soft group-hover:scale-110 transition-transform">
               <Trophy size={48} className="opacity-20" />
            </div>
            <Sparkles className="absolute -top-4 -right-4 text-indigo-400 animate-pulse" size={32} />
          </div>
          
          <h5 className="font-black text-white uppercase text-sm tracking-[0.3em] mb-4">Academia DABAR</h5>
          <p className="text-[10px] text-slate-400 font-medium mb-10 leading-relaxed px-4">
            Continue sua jornada de fidelidade. No Nível 20, o portal das línguas originais (Hebraico e Aramaico) será revelado.
          </p>
          
          <div className="w-full space-y-4">
            <div className="flex justify-between items-end px-2">
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Seu Nível: {level}</span>
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Meta: 20</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-indigo-500/10 shadow-inner">
               <div 
                className="h-full bg-indigo-600 transition-all duration-1000 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                style={{ width: `${Math.min(100, (level / 20) * 100)}%` }}
               ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
