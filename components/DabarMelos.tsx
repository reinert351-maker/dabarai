
import React, { useState, useRef } from 'react';
import { generateDabarMelos, getGeminiResponse } from '../services/gemini';
import { StudyItem } from '../types';
import { Music, Play, Pause, Loader2, Sparkles, BookmarkPlus, Volume2, Headset } from 'lucide-react';

const DabarMelos: React.FC<{ onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void, onActionXp?: (amt: number, reason: string) => void }> = ({ onSave, onActionXp }) => {
  const [theme, setTheme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const [narrativeText, setNarrativeText] = useState<string | null>(null);
  const [voice, setVoice] = useState<'Kore' | 'Puck' | 'Charon' | 'Fenrir'>('Kore');
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCompose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) return;

    setIsGenerating(true);
    setAudioData(null);
    setNarrativeText(null);
    onActionXp?.(40, 'Composição de Melos Sagrados');
    
    try {
      const text = await getGeminiResponse(`Crie uma narração poética, curta e profunda sobre o tema espiritual: "${theme}". O texto deve evocar paz e transcendência.`);
      setNarrativeText(text);
      const audio = await generateDabarMelos(text, voice);
      if (audio) {
        setAudioData(`data:audio/pcm;base64,${audio}`); // Note: PCM simplified for example
        // Em um app real, o PCM precisa de decodificação como no DabarVoice
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Aqui integraria com o player de áudio real
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="bg-gradient-to-br from-indigo-950/40 via-sacred-soft to-slate-950 border-2 border-sacred p-10 md:p-20 rounded-[4rem] shadow-2xl text-center space-y-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-sacred/40 backdrop-blur-3xl -z-10"></div>
        <div className="flex flex-col items-center gap-8">
          <div className="w-24 h-24 bg-accent rounded-[2.5rem] flex items-center justify-center text-sacred shadow-accent invert animate-pulse">
            <Music size={48} />
          </div>
          <h2 className="text-5xl md:text-7xl font-divine font-black text-white uppercase tracking-tighter italic leading-none">DABAR Melos</h2>
          <p className="text-sacred-soft text-xl font-serif italic max-w-2xl mx-auto leading-relaxed">
            Transforme temas teológicos em meditações sonoras narradas pela inteligência divina.
          </p>
        </div>

        <form onSubmit={handleCompose} className="space-y-6 max-w-2xl mx-auto">
          <input 
            type="text" 
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Tema (ex: O Descanso do Shabat, O Monte das Oliveiras)" 
            className="w-full bg-sacred/50 border border-sacred rounded-3xl px-8 py-5 text-sacred font-bold text-center focus:outline-none focus:border-accent"
          />
          <div className="grid grid-cols-4 gap-3">
             {['Kore', 'Puck', 'Charon', 'Fenrir'].map((v: any) => (
               <button 
                 key={v} 
                 type="button" 
                 onClick={() => setVoice(v)}
                 className={`py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${voice === v ? 'bg-accent text-sacred invert' : 'bg-sacred border-sacred text-sacred-soft'}`}
               >
                 {v}
               </button>
             ))}
          </div>
          <button 
            type="submit" 
            disabled={isGenerating}
            className="w-full py-6 bg-accent text-sacred rounded-3xl font-black text-xs uppercase tracking-[0.4em] hover:opacity-90 transition-all shadow-accent invert flex items-center justify-center gap-4"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
            COMPOR SINFONIA
          </button>
        </form>
      </div>

      {narrativeText && (
        <div className="bg-sacred-soft/60 border-2 border-sacred p-10 md:p-16 rounded-[4rem] shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
           <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-6">
                 <div onClick={togglePlay} className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-sacred cursor-pointer hover:scale-110 transition-transform shadow-xl invert">
                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-2" />}
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-sacred uppercase tracking-tighter italic">Meditação Revelada</h3>
                    <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2">
                       <Headset size={12} className="text-accent" /> Voz: {voice} • Motor Atmosférico
                    </p>
                 </div>
              </div>
              <button className="p-4 bg-accent text-sacred rounded-2xl hover:opacity-90 transition-all invert shadow-xl">
                 <BookmarkPlus size={24} />
              </button>
           </div>
           <div className="prose prose-invert max-w-none text-sacred font-serif text-2xl leading-relaxed whitespace-pre-wrap italic border-l-4 border-accent/20 pl-8">
              {narrativeText}
           </div>
        </div>
      )}
    </div>
  );
};

export default DabarMelos;
