
import React, { useState } from 'react';
import { simulateCouncil } from '../services/gemini';
import { StudyItem } from '../types';
import { Gavel, Loader2, Sparkles, BookmarkPlus, Users, MessageSquare } from 'lucide-react';

const THEOLOGIANS = [
  "Santo Agostinho", "Martinho Lutero", "João Calvino", "Charles Spurgeon", 
  "C.S. Lewis", "Tomás de Aquino", "Karl Barth", "Jacobus Arminius"
];

const DabarDebates: React.FC<{ onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void, onActionXp?: (amt: number, reason: string) => void }> = ({ onSave, onActionXp }) => {
  const [t1, setT1] = useState(THEOLOGIANS[0]);
  const [t2, setT2] = useState(THEOLOGIANS[1]);
  const [topic, setTopic] = useState('');
  const [isDebating, setIsDebating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleStartDebate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsDebating(true);
    setResult(null);
    onActionXp?.(60, 'Convocação de Concílio');
    
    try {
      const debate = await simulateCouncil(t1, t2, topic);
      setResult(debate);
    } catch (err) {
      setResult("Erro ao gerar debate.");
    } finally {
      setIsDebating(false);
    }
  };

  const handleSave = () => {
    if (result && onSave) {
      onSave({
        title: `Concílio: ${t1} vs ${t2}`,
        content: `TEMA: ${topic}\n\n${result}`,
        type: 'Debate'
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-sacred-soft/40 border-2 border-sacred p-10 md:p-16 rounded-[4rem] shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-sacred shadow-accent invert">
            <Gavel size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-divine font-black text-sacred uppercase tracking-tighter italic">Concílio Virtual</h2>
          <p className="text-sacred-soft text-lg font-serif italic max-w-2xl mx-auto">
            Escolha dois gigantes da fé e um tema para presenciar um debate teológico impossível no tempo real.
          </p>
        </div>

        <form onSubmit={handleStartDebate} className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-sacred-soft uppercase tracking-widest block text-left ml-4">Proponente 1</label>
                <select value={t1} onChange={e => setT1(e.target.value)} className="w-full bg-sacred border border-sacred rounded-2xl p-4 text-sacred font-bold">
                   {THEOLOGIANS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-sacred-soft uppercase tracking-widest block text-left ml-4">Proponente 2</label>
                <select value={t2} onChange={e => setT2(e.target.value)} className="w-full bg-sacred border border-sacred rounded-2xl p-4 text-sacred font-bold">
                   {THEOLOGIANS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
             </div>
          </div>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: A Natureza da Graça, O Milênio, Justificação..." 
            className="w-full bg-sacred border border-sacred rounded-2xl px-8 py-5 text-sacred font-bold focus:outline-none focus:border-accent"
          />
          <button 
            type="submit" 
            disabled={isDebating}
            className="w-full py-6 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:opacity-90 transition-all shadow-accent invert flex items-center justify-center gap-3"
          >
            {isDebating ? <Loader2 className="animate-spin" /> : <Sparkles />}
            CONVOCAR DEBATE
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-sacred-soft/60 border-2 border-sacred p-8 md:p-16 rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom-8 duration-700 relative">
           <div className="flex items-center justify-between mb-12 border-b border-sacred pb-8">
              <div className="flex items-center gap-4">
                 <Users className="text-accent" size={32} />
                 <div>
                    <h3 className="text-2xl font-black text-sacred uppercase tracking-tighter italic">Transcrição do Concílio</h3>
                    <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">{t1} vs {t2}</p>
                 </div>
              </div>
              <button onClick={handleSave} className="p-4 bg-accent text-sacred rounded-2xl hover:opacity-90 transition-all invert shadow-xl">
                 <BookmarkPlus size={24} />
              </button>
           </div>
           <div className="prose prose-invert max-w-none text-sacred font-serif text-lg leading-relaxed whitespace-pre-wrap italic">
              {result}
           </div>
        </div>
      )}
    </div>
  );
};

export default DabarDebates;
