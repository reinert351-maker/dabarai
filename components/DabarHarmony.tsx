
import React, { useState } from 'react';
import { harmonizeGospels } from '../services/gemini';
import { StudyItem } from '../types';
import { GitMerge, Loader2, Sparkles, BookmarkPlus, Info, BookOpen } from 'lucide-react';

interface DabarHarmonyProps {
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const DabarHarmony: React.FC<DabarHarmonyProps> = ({ onSave, onActionXp }) => {
  const [passage, setPassage] = useState('');
  const [isHarmonizing, setIsHarmonizing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleHarmonize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passage.trim()) return;

    setIsHarmonizing(true);
    setResult(null);
    onActionXp?.(40, 'Harmonização de Relatos Sagrados');
    
    try {
      const synthesis = await harmonizeGospels(passage);
      setResult(synthesis);
    } catch (err) {
      setResult("Erro na harmonização. Tente uma passagem específica.");
    } finally {
      setIsHarmonizing(false);
    }
  };

  const handleSave = () => {
    if (result && onSave) {
      onSave({
        title: `Harmonia: ${passage}`,
        content: result,
        type: 'Harmony'
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-sacred-soft/40 border-2 border-sacred p-10 md:p-16 rounded-[3.5rem] shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-sacred shadow-accent invert">
            <GitMerge size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-divine font-black text-sacred uppercase tracking-tighter italic">DABAR Harmony</h2>
          <p className="text-sacred-soft text-lg font-serif italic max-w-2xl mx-auto">
            Sincronize os relatos de Mateus, Marcos, Lucas e João em uma narrativa unificada e exegética.
          </p>
        </div>

        <form onSubmit={handleHarmonize} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input 
            type="text" 
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            placeholder="Ex: O Batismo de Jesus, A Crucificação..." 
            className="flex-1 bg-sacred border border-sacred rounded-2xl px-8 py-5 text-sacred font-bold focus:outline-none focus:border-accent"
          />
          <button 
            type="submit" 
            disabled={isHarmonizing}
            className="px-12 py-5 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-accent invert flex items-center justify-center gap-3"
          >
            {isHarmonizing ? <Loader2 className="animate-spin" /> : <Sparkles />}
            HARMONIZAR
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-sacred-soft/60 border-2 border-sacred p-8 md:p-16 rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom-8 duration-700 relative">
           <div className="flex items-center justify-between mb-12 border-b border-sacred pb-8">
              <div className="flex items-center gap-4">
                 <BookOpen className="text-accent" size={32} />
                 <div>
                    <h3 className="text-2xl font-black text-sacred uppercase tracking-tighter">Síntese Unificada dos Evangelhos</h3>
                    <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">Passagem: {passage}</p>
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

export default DabarHarmony;
