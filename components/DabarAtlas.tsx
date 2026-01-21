
import React, { useState } from 'react';
import { getSensoryExperience, generateBibleImage } from '../services/gemini';
import { StudyItem } from '../types';
import { Wind, Loader2, Sparkles, BookmarkPlus, Eye, Volume2, Droplets, Thermometer } from 'lucide-react';

const DabarAtlas: React.FC<{ onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void, onActionXp?: (amt: number, reason: string) => void }> = ({ onSave, onActionXp }) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [experience, setExperience] = useState<string | null>(null);
  const [visual, setVisual] = useState<string | null>(null);

  const handleTravel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !date.trim()) return;

    setIsGenerating(true);
    setExperience(null);
    setVisual(null);
    onActionXp?.(50, 'Viagem no Tempo Arqueológica');
    
    try {
      const chronicle = await getSensoryExperience(location, date);
      setExperience(chronicle);
      const img = await generateBibleImage(`Uma visão panorâmica e imersiva de ${location} no período ${date}, estilo épico cinematográfico.`);
      setVisual(img);
    } catch (err) {
      setExperience("Erro ao viajar no tempo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (experience && onSave) {
      onSave({
        title: `Atlas: ${location} (${date})`,
        content: experience,
        type: 'Atlas'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-sacred-soft/40 border-2 border-sacred p-10 md:p-16 rounded-[4rem] shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-sacred shadow-accent invert">
            <Wind size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-divine font-black text-sacred uppercase tracking-tighter italic">Atlas Imersivo</h2>
          <p className="text-sacred-soft text-lg font-serif italic max-w-2xl mx-auto">
            Sinta o cheiro do incenso no Templo ou o vento gelado do Sinai. A IA reconstrói os sentidos do mundo bíblico.
          </p>
        </div>

        <form onSubmit={handleTravel} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Localização (ex: Jerusalém, Egito)" 
            className="flex-1 bg-sacred border border-sacred rounded-2xl px-6 py-4 text-sacred font-bold focus:outline-none focus:border-accent"
          />
          <input 
            type="text" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Época (ex: Reinado de Davi, 30 DC)" 
            className="flex-1 bg-sacred border border-sacred rounded-2xl px-6 py-4 text-sacred font-bold focus:outline-none focus:border-accent"
          />
          <button 
            type="submit" 
            disabled={isGenerating}
            className="px-10 py-4 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-accent invert flex items-center justify-center gap-3"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
            EXPLORAR
          </button>
        </form>
      </div>

      {isGenerating && (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
           <Loader2 className="animate-spin text-accent" size={48} />
           <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest animate-pulse">Sincronizando Sentidos com o Passado...</p>
        </div>
      )}

      {experience && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-700">
           <div className="bg-sacred rounded-[3.5rem] border-2 border-sacred overflow-hidden shadow-2xl aspect-[16/10] relative">
              {visual && <img src={visual} className="w-full h-full object-cover" alt="Visão" />}
              <div className="absolute inset-0 bg-gradient-to-t from-sacred/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 flex items-center gap-4">
                 <div className="p-3 bg-sacred/40 backdrop-blur-md rounded-xl border border-sacred">
                    <Eye size={18} className="text-accent" />
                 </div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Reconstrução Visual</span>
              </div>
           </div>

           <div className="bg-sacred-soft/60 border-2 border-sacred p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 border-b border-sacred pb-6">
                 <div className="flex items-center gap-4">
                    <Thermometer className="text-accent" size={24} />
                    <h3 className="text-xl font-black text-sacred uppercase tracking-tighter">Crônica Sensorial</h3>
                 </div>
                 <button onClick={handleSave} className="p-3 bg-accent text-sacred rounded-xl hover:opacity-90 transition-all invert shadow-xl">
                    <BookmarkPlus size={20} />
                 </button>
              </div>

              <div className="prose prose-invert max-w-none text-sacred font-serif text-lg leading-relaxed whitespace-pre-wrap italic">
                 {experience}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="p-4 bg-sacred border border-sacred rounded-2xl flex items-center gap-3">
                    <Volume2 size={16} className="text-accent" />
                    <span className="text-[9px] font-black text-sacred-soft uppercase tracking-widest">Atmosfera Sonora</span>
                 </div>
                 <div className="p-4 bg-sacred border border-sacred rounded-2xl flex items-center gap-3">
                    <Droplets size={16} className="text-accent" />
                    <span className="text-[9px] font-black text-sacred-soft uppercase tracking-widest">Memória Olfativa</span>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DabarAtlas;
