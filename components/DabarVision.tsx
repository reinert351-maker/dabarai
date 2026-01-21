
import React, { useState, useRef } from 'react';
import { scanManuscript } from '../services/gemini';
import { StudyItem } from '../types';
import { Camera, Scan, Loader2, Save, X, BookmarkPlus } from 'lucide-react';

interface DabarVisionProps {
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const DabarVision: React.FC<DabarVisionProps> = ({ onSave, onActionXp }) => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        runAnalysis(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async (base64: string) => {
    setIsScanning(true);
    setAnalysis(null);
    onActionXp?.(50, 'Scanner de Manuscrito Ativado');
    try {
      const cleanBase64 = base64.split(',')[1];
      const result = await scanManuscript(cleanBase64);
      setAnalysis(result);
    } catch (err) {
      setAnalysis("Erro ao analisar imagem.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleSave = () => {
    if (analysis && onSave) {
      onSave({
        title: `DABAR Vision: ${new Date().toLocaleDateString()}`,
        content: analysis,
        type: 'Research'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-sacred-soft/40 border-2 border-sacred p-8 md:p-12 rounded-[3.5rem] shadow-2xl text-center space-y-8">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-sacred shadow-accent invert">
            <Scan size={40} />
          </div>
          <h2 className="text-4xl font-divine font-black text-sacred uppercase tracking-tighter italic">DABAR Vision</h2>
          <p className="text-sacred-soft text-lg font-serif italic max-w-lg">
            Aponte a câmera para uma Bíblia física ou manuscrito antigo para revelação exegética instantânea.
          </p>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-12 py-6 bg-accent text-sacred rounded-3xl font-black text-xs uppercase tracking-[0.4em] hover:opacity-90 transition-all shadow-accent flex items-center gap-4 invert"
          >
            <Camera size={24} /> ESCANEAR AGORA
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCapture} />
        </div>
      </div>

      {(image || isScanning) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-700">
           <div className="bg-sacred-soft rounded-[3rem] border-2 border-sacred overflow-hidden shadow-2xl aspect-[3/4]">
              {image && <img src={image} className="w-full h-full object-cover" alt="Scan" />}
           </div>

           <div className="bg-sacred-soft/60 border-2 border-sacred p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">Análise DABAR Vision</span>
                 </div>
                 {analysis && (
                   <button onClick={handleSave} className="p-3 bg-sacred border border-sacred rounded-xl text-accent hover:text-sacred hover:bg-accent transition-all">
                     <BookmarkPlus size={20} />
                   </button>
                 )}
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar prose prose-invert">
                {isScanning ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <Loader2 className="animate-spin text-accent" size={32} />
                    <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest animate-pulse">Consultando Papiros Digitais...</p>
                  </div>
                ) : (
                  <div className="text-sacred font-serif text-lg leading-relaxed whitespace-pre-wrap italic">
                    {analysis}
                  </div>
                )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DabarVision;
