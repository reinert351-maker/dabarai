
import React, { useState } from 'react';
import { refractPrism } from '../services/gemini';
import { StudyItem } from '../types';
import { 
  Zap, 
  Loader2, 
  Sparkles, 
  BookmarkPlus, 
  ChevronRight, 
  Info, 
  Layers, 
  History, 
  Box, 
  Users, 
  Cross, 
  Library, 
  UserCheck 
} from 'lucide-react';

const LENSES = [
  { id: 'gramatical', name: 'Gramatical', icon: Layers, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'historica', name: 'Histórica', icon: History, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'arqueologica', name: 'Arqueológica', icon: Box, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'patristica', name: 'Patrística', icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'tipologica', name: 'Tipológica', icon: Cross, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'sistematica', name: 'Sistemática', icon: Library, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'pratica', name: 'Prática', icon: UserCheck, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
];

const DabarPrism: React.FC<{ onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void, onActionXp?: (amt: number, reason: string) => void }> = ({ onSave, onActionXp }) => {
  const [reference, setReference] = useState('');
  const [isRefracting, setIsRefracting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRefract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;

    setIsRefracting(true);
    setResults(null);
    onActionXp?.(70, 'Refração Prismática Iniciada');
    
    try {
      const prismData = await refractPrism(reference);
      setResults(prismData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefracting(false);
    }
  };

  const handleSave = () => {
    if (results && onSave) {
      onSave({
        title: `Prisma: ${reference}`,
        content: JSON.stringify(results),
        type: 'Prism'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20 px-4">
      <div className="bg-sacred-soft/40 border-2 border-sacred p-10 md:p-20 rounded-[4rem] shadow-2xl text-center space-y-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-rose-500/5 -z-10"></div>
        <div className="flex flex-col items-center gap-8 relative z-10">
          <div className="w-24 h-24 bg-accent rounded-[2.5rem] flex items-center justify-center text-sacred shadow-accent invert animate-pulse">
            <Zap size={48} />
          </div>
          <h2 className="text-5xl md:text-8xl font-divine font-black text-sacred uppercase tracking-tighter leading-none italic">DABAR PRISM</h2>
          <p className="text-sacred-soft text-xl font-serif italic max-w-2xl mx-auto leading-relaxed">
            Refrate um único versículo em 7 dimensões de revelação simultânea. A inteligência prismática no coração do Logos.
          </p>
        </div>

        <form onSubmit={handleRefract} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
          <input 
            type="text" 
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Ex: João 3:16 ou Gênesis 1:1" 
            className="flex-1 bg-sacred/50 border-2 border-sacred rounded-2xl px-8 py-5 text-sacred font-bold focus:outline-none focus:border-accent text-lg"
          />
          <button 
            type="submit" 
            disabled={isRefracting}
            className="px-12 py-5 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-accent invert flex items-center justify-center gap-3"
          >
            {isRefracting ? <Loader2 className="animate-spin" /> : <Sparkles />}
            REFRATAR
          </button>
        </form>
      </div>

      {isRefracting && (
        <div className="flex flex-col items-center justify-center py-20 gap-8">
           <div className="relative">
              <div className="w-24 h-24 border-8 border-accent/20 border-t-accent rounded-full animate-spin"></div>
              <Zap className="absolute inset-0 m-auto text-accent animate-pulse" size={32} />
           </div>
           <p className="text-[10px] font-black text-sacred-soft uppercase tracking-[0.5em] animate-pulse text-center">
             Sincronizando 7 Lentes de Revelação...
           </p>
        </div>
      )}

      {results && (
        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-1000">
           <div className="flex items-center justify-between border-b border-sacred pb-6">
              <h3 className="text-3xl font-black text-sacred uppercase tracking-tighter italic">Refração: {reference}</h3>
              <button onClick={handleSave} className="p-4 bg-accent text-sacred rounded-2xl hover:opacity-90 transition-all invert shadow-xl">
                 <BookmarkPlus size={24} />
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LENSES.map(lens => (
                <div key={lens.id} className={`${lens.bg} ${lens.border} border p-8 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-all group flex flex-col h-full`}>
                   <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-2xl ${lens.bg} ${lens.color}`}>
                         <lens.icon size={24} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${lens.color}`}>Lente {lens.name}</span>
                   </div>
                   <div className="flex-1">
                      <p className="text-sacred font-serif text-lg leading-relaxed italic">
                        {results[lens.id]}
                      </p>
                   </div>
                </div>
              ))}
              <div className="bg-sacred-soft p-8 rounded-[2.5rem] border border-sacred flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                 <Sparkles className="text-accent" size={48} />
                 <p className="text-xs font-black text-sacred-soft uppercase tracking-widest">A Plenitude do Logos</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DabarPrism;
