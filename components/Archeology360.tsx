
import React, { useState } from 'react';
import { generateBibleImage, getGeminiResponse, generateArcheologyVideo } from '../services/gemini';
import { StudyItem } from '../types';
import { Box, Loader2, Sparkles, BookmarkPlus, Camera, MapPin, Info, Globe, Video, Play, Download, CreditCard } from 'lucide-react';

const Archeology360: React.FC<{ onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void, onActionXp?: (amt: number, reason: string) => void }> = ({ onSave, onActionXp }) => {
  const [location, setLocation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const loadingMessages = [
    "Escavando manuscritos visuais...",
    "Sincronizando com as areias do tempo...",
    "DABAR AI: Reconstruindo templos milenares...",
    "Quase lá, a história está sendo revelada...",
    "Preparando a visão profética..."
  ];

  const handleExplore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    setIsGenerating(true);
    setImage(null);
    setVideoUrl(null);
    setDescription(null);
    onActionXp?.(50, 'Exploração Imersiva Arqueológica');
    
    try {
      const img = await generateBibleImage(`Reconstrução arqueológica hiper-realista e imersiva de ${location}. Vista 360 graus, arte sagrada épica.`);
      setImage(img);
      const desc = await getGeminiResponse(`Forneça um relatório arqueológico detalhado e imersivo sobre ${location}. Descreva como era a vida no local, as descobertas recentes e o significado espiritual deste cenário bíblico.`);
      setDescription(desc);
    } catch (err) {
      setDescription("Erro ao gerar imersão.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!location.trim() || !description) return;

    // Verificação obrigatória de chave paga para Veo
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Após abrir o seletor, assumimos sucesso conforme instruções de race condition
      }
    }
    
    setIsGeneratingVideo(true);
    let msgIndex = 0;
    const interval = setInterval(() => {
      setLoadingMessage(loadingMessages[msgIndex]);
      msgIndex = (msgIndex + 1) % loadingMessages.length;
    }, 5000);

    try {
      const url = await generateArcheologyVideo(location, description);
      setVideoUrl(url);
      onActionXp?.(100, 'Revelação em Vídeo com Veo 3.1');
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setIsGeneratingVideo(false);
    }
  };

  const handleSave = () => {
    if (description && onSave) {
      onSave({
        title: `Imersão 360: ${location}`,
        content: description,
        type: 'Research'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20 px-4">
      <div className="bg-sacred-soft/40 border-2 border-sacred p-10 md:p-16 rounded-[4rem] shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-accent rounded-[2.5rem] flex items-center justify-center text-sacred shadow-accent invert">
            <Box size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-divine font-black text-sacred uppercase tracking-tighter italic">Imersão Arqueológica</h2>
          <p className="text-sacred-soft text-lg font-serif italic max-w-2xl mx-auto">
            Utilize o motor visual do DABAR AI e o revolucionário Veo 3.1 para reconstruir a história bíblica em alta definição.
          </p>
        </div>

        <form onSubmit={handleExplore} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Templo de Salomão, Cafarnaum, Jericó..." 
            className="flex-1 bg-sacred border border-sacred rounded-2xl px-8 py-5 text-sacred font-bold focus:outline-none focus:border-accent"
          />
          <button 
            type="submit" 
            disabled={isGenerating || isGeneratingVideo}
            className="px-12 py-5 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-accent invert flex items-center justify-center gap-3"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Globe />}
            REVELAR CENÁRIO
          </button>
        </form>
      </div>

      {(isGenerating || isGeneratingVideo) && (
        <div className="flex flex-col items-center justify-center py-20 gap-8">
           <Loader2 className="animate-spin text-accent" size={60} />
           <p className="text-[10px] font-black text-sacred-soft uppercase tracking-[0.5em] animate-pulse text-center">
             {isGeneratingVideo ? loadingMessage || "DABAR AI: Invocando o poder do Veo 3.1..." : "Escavando Registros Visuais da História..."}
           </p>
        </div>
      )}

      {(image || videoUrl) && (
        <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-1000">
           <div className="bg-sacred rounded-[3.5rem] border-2 border-sacred overflow-hidden shadow-2xl relative aspect-[16/9] group">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
              ) : (
                <img src={image!} className="w-full h-full object-cover" alt="Imersão" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-sacred/60 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute top-6 right-6 flex gap-2">
                 {!videoUrl && description && !isGeneratingVideo && (
                   <button 
                    onClick={handleGenerateVideo}
                    className="p-4 bg-accent text-sacred rounded-2xl hover:opacity-90 transition-all invert shadow-2xl flex items-center gap-2 group/btn"
                   >
                     <Video size={20} />
                     <span className="text-[10px] font-black uppercase tracking-widest hidden group-hover/btn:block">Gerar Vídeo Veo 3.1</span>
                   </button>
                 )}
                 {videoUrl && (
                    <a href={videoUrl} download={`${location}.mp4`} className="p-4 bg-emerald-500 text-white rounded-2xl hover:opacity-90 transition-all shadow-2xl">
                       <Download size={20} />
                    </a>
                 )}
              </div>

              <div className="absolute bottom-10 left-10 flex items-center gap-3 bg-sacred/40 backdrop-blur-md px-6 py-3 rounded-full border border-sacred">
                 {videoUrl ? <Play size={18} className="text-accent" /> : <Camera size={18} className="text-accent" />}
                 <span className="text-xs font-black text-white uppercase tracking-widest">
                    {videoUrl ? 'Cinemática Veo 3.1' : 'Reconstrução IA'}
                 </span>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-sacred-soft/60 border-2 border-sacred p-8 md:p-14 rounded-[3.5rem] shadow-2xl space-y-8">
                 <div className="flex items-center justify-between border-b border-sacred pb-6">
                    <div className="flex items-center gap-4">
                       <MapPin className="text-accent" size={32} />
                       <h3 className="text-2xl font-black text-sacred uppercase tracking-tighter italic">{location}</h3>
                    </div>
                    <button onClick={handleSave} className="p-4 bg-accent text-sacred rounded-2xl hover:opacity-90 transition-all invert shadow-xl">
                       <BookmarkPlus size={24} />
                    </button>
                 </div>
                 <div className="prose prose-invert max-w-none text-sacred font-serif text-lg leading-relaxed whitespace-pre-wrap italic border-l-4 border-accent/20 pl-8">
                    {description}
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-sacred-soft/40 border-2 border-sacred p-8 rounded-[2.5rem] shadow-2xl">
                    <h4 className="text-[10px] font-black text-sacred-soft uppercase tracking-widest mb-6 flex items-center gap-3">
                       <Info className="text-accent" size={14} /> Fatos Arqueológicos
                    </h4>
                    <div className="space-y-4">
                       <div className="p-4 bg-sacred border border-sacred rounded-xl">
                          <p className="text-[10px] text-sacred-soft font-bold uppercase mb-1">Status da Localização</p>
                          <p className="text-xs font-bold text-sacred">Escavações Ativas</p>
                       </div>
                       <div className="p-4 bg-sacred border border-sacred rounded-xl">
                          <p className="text-[10px] text-sacred-soft font-bold uppercase mb-1">DABAR AI Insights</p>
                          <p className="text-xs font-bold text-sacred">Sincronia Histórica 98%</p>
                       </div>
                    </div>
                 </div>
                 <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-4">
                    <CreditCard className="text-amber-500 shrink-0" size={20} />
                    <p className="text-[9px] text-amber-500 font-black uppercase leading-relaxed tracking-widest">
                       Nota: Modelos Veo requerem faturamento ativo no Google Cloud. Se solicitado, selecione sua chave paga.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Archeology360;
