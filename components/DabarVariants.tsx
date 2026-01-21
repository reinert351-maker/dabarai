
import React, { useState } from 'react';
import { compareVariants } from '../services/gemini';
import { StudyItem } from '../types';
import { Split, Loader2, Sparkles, BookmarkPlus, Info, BookOpen, ScrollText } from 'lucide-react';

interface DabarVariantsProps {
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const DabarVariants: React.FC<DabarVariantsProps> = ({ onSave, onActionXp }) => {
  const [reference, setReference] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;

    setIsComparing(true);
    setAnalysis(null);
    onActionXp?.(40, 'Análise Crítica de Manuscritos');
    
    try {
      const result = await compareVariants(reference);
      setAnalysis(result);
    } catch (err) {
      setAnalysis("Erro ao comparar manuscritos. Tente uma referência exata (ex: 1 João 5:7).");
    } finally {
      setIsComparing(false);
    }
  };

  const handleSave = () => {
    if (analysis && onSave) {
      onSave({
        title: `Variantes: ${reference}`,
        content: analysis,
        type: 'Variant'
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-sacred-soft/40 border-2 border-sacred p-10 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden text-center space-y-8">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-sacred shadow-accent invert">
            <Split size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-divine font-black text-sacred uppercase tracking-tighter italic">DABAR Variants</h2>
          <p className="text-sacred-soft text-lg font-serif italic max-w-2xl mx-auto">
            Compare divergências entre o Codex Sinaiticus, Vaticanus e o Texto Recebido para uma compreensão acadêmica da crítica textual.
          </p>
        </div>

        <form onSubmit={handleCompare} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input 
            type="text" 
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Ex: 1 João 5:7 ou Marcos 16:9" 
            className="flex-1 bg-sacred border border-sacred rounded-2xl px-8 py-5 text-sacred font-bold focus:outline-none focus:border-accent"
          />
          <button 
            type="submit" 
            disabled={isComparing}
            className="px-12 py-5 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-accent invert flex items-center justify-center gap-3"
          >
            {isComparing ? <Loader2 className="animate-spin" /> : <Sparkles />}
            COMPARAR
          </button>
        </form>
      </div>

      {analysis && (
        <div className="bg-sacred-soft/60 border-2 border-sacred p-8 md:p-16 rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom-8 duration-700 relative">
           <div className="flex items-center justify-between mb-12 border-b border-sacred pb-8">
              <div className="flex items-center gap-4">
                 <ScrollText className="text-accent" size={32} />
                 <div>
                    <h3 className="text-2xl font-black text-sacred uppercase tracking-tighter">Dossiê de Crítica Textual</h3>
                    <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">Referência: {reference}</p>
                 </div>
              </div>
              <button onClick={handleSave} className="p-4 bg-accent text-sacred rounded-2xl hover:opacity-90 transition-all invert shadow-xl">
                 <BookmarkPlus size={24} />
              </button>
           </div>

           <div className="prose prose-invert max-w-none text-sacred font-serif text-lg leading-relaxed whitespace-pre-wrap italic">
              {analysis}
           </div>

           <div className="mt-12 pt-8 border-t border-sacred flex items-center gap-4 opacity-50">
              <Info size={16} className="text-accent" />
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">
                 Baseado nas descobertas de Tischendorf e Westcott-Hort via DABAR AI.
              </p>
           </div>
        </div>
      )}
    </div>
  );
};

export default DabarVariants;
