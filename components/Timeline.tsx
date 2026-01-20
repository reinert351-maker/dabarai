
import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../constants';
import { TimelineEvent, Source, DispensationType } from '../types';
import { 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Library, 
  X, 
  Quote as QuoteIcon,
  Bookmark,
  ShieldCheck,
  History,
  Layers,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface TimelineProps {
  onDeepStudy?: (prompt: string) => void;
}

const DISPENSATION_INFO: Record<DispensationType, { name: string, color: string, icon: any, startRef: string, endRef: string }> = {
  'Innocence': { 
    name: 'Inocência', 
    color: 'from-blue-400 to-indigo-500', 
    icon: ShieldCheck,
    startRef: 'Gênesis 1:28',
    endRef: 'Gênesis 3:24'
  },
  'Conscience': { 
    name: 'Consciência', 
    color: 'from-indigo-500 to-purple-500', 
    icon: History,
    startRef: 'Gênesis 4:1',
    endRef: 'Gênesis 8:14'
  },
  'Human Government': { 
    name: 'Governo Humano', 
    color: 'from-purple-500 to-pink-500', 
    icon: Layers,
    startRef: 'Gênesis 8:15',
    endRef: 'Gênesis 11:32'
  },
  'Promise': { 
    name: 'Promessa', 
    color: 'from-pink-500 to-rose-500', 
    icon: Bookmark,
    startRef: 'Gênesis 12:1',
    endRef: 'Êxodo 18:27'
  },
  'Law': { 
    name: 'Lei', 
    color: 'from-rose-500 to-amber-500', 
    icon: Library,
    startRef: 'Êxodo 19:1',
    endRef: 'Atos 1:26'
  },
  'Grace': { 
    name: 'Graça', 
    color: 'from-amber-500 to-emerald-500', 
    icon: Sparkles,
    startRef: 'Atos 2:1',
    endRef: 'Apocalipse 19:21'
  },
  'Kingdom': { 
    name: 'Reino', 
    color: 'from-emerald-500 to-sky-500', 
    icon: Calendar,
    startRef: 'Apocalipse 20:1',
    endRef: 'Apocalipse 20:15'
  }
};

const Timeline: React.FC<TimelineProps> = ({ onDeepStudy }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Biblical' | 'Historical'>('All');
  const [selectedEventForSources, setSelectedEventForSources] = useState<TimelineEvent | null>(null);
  const [activeDispensation, setActiveDispensation] = useState<DispensationType | 'All'>('All');
  
  const filteredEvents = TIMELINE_EVENTS.filter(e => {
    const tabMatch = activeTab === 'All' || e.category === activeTab;
    const dispMatch = activeDispensation === 'All' || e.dispensation === activeDispensation;
    return tabMatch && dispMatch;
  });

  const openSources = (event: TimelineEvent) => {
    setSelectedEventForSources(event);
  };

  const closeSources = () => {
    setSelectedEventForSources(null);
  };

  const renderEvents = () => {
    const elements: React.ReactNode[] = [];
    let lastDispensation: DispensationType | null = null;

    filteredEvents.forEach((event, index) => {
      if (activeDispensation === 'All' && event.dispensation !== lastDispensation) {
        const info = DISPENSATION_INFO[event.dispensation];
        const Icon = info.icon;
        elements.push(
          <div key={`divider-${event.dispensation}`} className="py-20 flex flex-col items-center justify-center relative z-10 w-full animate-in fade-in duration-1000">
             <div className="w-[2px] h-20 bg-gradient-to-b from-transparent via-accent/30 to-accent/60 mb-6"></div>
             
             <div className="flex flex-col items-center gap-4">
                <div className={`px-10 py-4 bg-gradient-to-r ${info.color} rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 border border-white/20 group hover:scale-105 transition-all duration-500 cursor-default relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Icon size={22} className="text-white animate-pulse" />
                  </div>
                  <span className="text-sm font-black text-white uppercase tracking-[0.5em] drop-shadow-md">Dispensação da {info.name}</span>
                </div>

                <div className="flex items-center gap-3 mt-4 animate-in slide-in-from-top-2">
                   <div className="flex items-center gap-2 px-4 py-2 bg-sacred border border-sacred rounded-xl">
                      <BookOpen size={12} className="text-accent" />
                      <span className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">{info.startRef}</span>
                   </div>
                   <ArrowRight size={14} className="text-accent/40" />
                   <div className="flex items-center gap-2 px-4 py-2 bg-sacred border border-sacred rounded-xl">
                      <span className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">{info.endRef}</span>
                   </div>
                </div>
             </div>

             <div className="w-[2px] h-20 bg-gradient-to-t from-transparent via-accent/30 to-accent/60 mt-6"></div>
          </div>
        );
        lastDispensation = event.dispensation;
      }

      elements.push(
        <div key={event.year + event.title} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-in slide-in-from-bottom-8 duration-700`}>
          <div className="flex-1 w-full md:w-auto">
            <div className={`p-8 md:p-12 bg-sacred-soft/40 backdrop-blur-md rounded-[3rem] border border-sacred hover:border-accent/40 transition-all group relative shadow-2xl ${index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}`}>
              
              <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-sacred border-4 border-accent hidden md:block shadow-accent group-hover:scale-125 transition-transform ${index % 2 === 0 ? '-right-[88.5px]' : '-left-[88.5px]'}`}></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-accent drop-shadow-accent italic tracking-tighter leading-none">{event.year}</span>
                  {event.covenant && (
                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mt-2 flex items-center gap-1">
                      <ShieldCheck size={10} /> {event.covenant}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[8px] font-black px-3 py-1.5 rounded-xl border ${event.category === 'Biblical' ? 'text-indigo-400 border-indigo-400/20 bg-indigo-400/5' : 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'} uppercase tracking-widest`}>
                    {event.category}
                  </span>
                  <span className="text-[7px] text-sacred-soft font-black uppercase tracking-widest opacity-50">{event.dispensation}</span>
                </div>
              </div>

              <h3 className="text-3xl font-black text-sacred group-hover:text-accent transition-colors mb-6 uppercase tracking-tight italic leading-tight">{event.title}</h3>
              <p className="text-sacred-soft leading-relaxed text-base font-medium font-serif italic border-l-2 border-sacred pl-6">{event.description}</p>
              
              <div className="mt-10 pt-8 border-t border-sacred/50 flex flex-col md:flex-row justify-between gap-6">
                <button 
                  onClick={() => onDeepStudy?.(`Aprofunde no evento histórico/bíblico: ${event.title} (${event.year}). Forneça contexto arqueológico, teológico e a relevância na dispensação da ${event.dispensation} através do DABAR AI.`)}
                  className="flex items-center gap-2 text-[10px] font-black text-accent hover:opacity-80 uppercase tracking-[0.2em] group transition-all"
                >
                  <Sparkles size={16} className="group-hover:rotate-12" /> Consultar Scriptorium DABAR
                </button>
                <button 
                  onClick={() => openSources(event)}
                  className="flex items-center gap-2 text-[10px] font-black text-sacred-soft hover:text-sacred uppercase tracking-[0.2em] group transition-all"
                >
                  Evidências & Fontes <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 hidden md:block"></div>
        </div>
      );
    });

    return elements;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 bg-sacred-soft/30 p-10 md:p-16 rounded-[4rem] border border-sacred shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4 scale-150">
           <History size={400} />
        </div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-5xl md:text-7xl font-serif font-black text-sacred flex items-center gap-6 uppercase tracking-tighter leading-none">
            <Calendar className="text-accent" size={60} />
            Cânon do Tempo
          </h2>
          <p className="text-sacred-soft text-xl font-medium max-w-2xl font-serif italic">
            "Para tudo há uma ocasião certa; há um tempo certo para cada propósito debaixo do céu." — Eclesiastes 3:1
          </p>
        </div>
        
        <div className="flex flex-col gap-4 relative z-10 shrink-0">
          <div className="flex bg-sacred p-1.5 rounded-2xl border border-sacred shadow-inner">
             {['All', 'Biblical', 'Historical'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`flex-1 px-8 py-3 rounded-xl text-[9px] font-black tracking-widest transition-all ${activeTab === tab ? 'bg-accent text-sacred shadow-xl invert' : 'text-sacred-soft hover:text-sacred'}`}
               >
                 {tab === 'All' ? 'TUDO' : tab === 'Biblical' ? 'BÍBLICO' : 'HISTÓRICO'}
               </button>
             ))}
          </div>
          
          <select 
            value={activeDispensation}
            onChange={(e) => setActiveDispensation(e.target.value as any)}
            className="w-full bg-sacred border border-sacred rounded-xl px-6 py-3 text-[9px] font-black uppercase tracking-widest text-sacred focus:outline-none focus:border-accent"
          >
            <option value="All">Filtrar por Dispensação</option>
            {Object.keys(DISPENSATION_INFO).map(d => (
              <option key={d} value={d}>{DISPENSATION_INFO[d as DispensationType].name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative pb-32">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/0 via-sacred-soft to-accent/0 hidden md:block"></div>

        <div className="space-y-4">
          {renderEvents()}
        </div>
      </div>
      
      {selectedEventForSources && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-sacred/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="bg-sacred-soft border-2 border-sacred w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-8 md:p-10 border-b border-sacred flex justify-between items-center bg-sacred-soft">
               <div className="flex items-center gap-4">
                  <Library className="text-accent" size={24} />
                  <div>
                    <h3 className="text-xl font-black text-sacred uppercase tracking-tighter leading-none">Scriptorium DABAR</h3>
                    <p className="text-[9px] font-black text-sacred-soft uppercase tracking-widest mt-1">Fontes: {selectedEventForSources.title}</p>
                  </div>
               </div>
               <button onClick={closeSources} className="p-3 bg-sacred rounded-2xl text-sacred-soft hover:text-sacred hover:bg-sacred-soft border border-sacred transition-all"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
               {selectedEventForSources.sources && selectedEventForSources.sources.length > 0 ? (
                 <div className="space-y-4">
                    {selectedEventForSources.sources.map((source, i) => (
                      <div key={i} className="bg-sacred/40 p-6 rounded-2xl border border-sacred group hover:border-accent/30 transition-all">
                        <div className="flex items-center justify-between mb-3">
                           <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${
                             source.type === 'Biblical' ? 'bg-amber-500/20 text-amber-500' :
                             source.type === 'Archaeological' ? 'bg-emerald-500/20 text-emerald-500' :
                             'bg-indigo-500/20 text-indigo-500'
                           }`}>
                             {source.type}
                           </span>
                           <Bookmark size={14} className="text-sacred-soft group-hover:text-accent transition-colors" />
                        </div>
                        <h4 className="text-sm font-black text-sacred mb-1">{source.title}</h4>
                        <p className="text-xs text-sacred-soft italic leading-relaxed">"{source.reference}"</p>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
                    <QuoteIcon size={48} className="text-sacred-soft" />
                    <p className="text-sm font-bold uppercase tracking-widest">Nenhuma fonte catalogada manualmente.</p>
                 </div>
               )}

               <div className="pt-6 border-t border-sacred">
                 <button 
                  onClick={() => {
                    onDeepStudy?.(`Apresente uma bibliografia acadêmica completa e fontes históricas primárias para o evento: ${selectedEventForSources.title} (${selectedEventForSources.year}).`);
                    closeSources();
                  }}
                  className="w-full py-5 bg-accent text-sacred rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:opacity-90 shadow-accent invert"
                 >
                    <Sparkles size={18} /> Pesquisa Bibliográfica DABAR
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-8">
         <button className="px-16 py-6 bg-sacred-soft border-2 border-sacred rounded-3xl font-black text-sacred-soft hover:bg-sacred hover:text-sacred hover:border-accent/30 transition-all shadow-2xl uppercase tracking-[0.5em] text-[10px]">
           Acessar Biblioteca Arqueológica DABAR
         </button>
      </div>
    </div>
  );
};

export default Timeline;
