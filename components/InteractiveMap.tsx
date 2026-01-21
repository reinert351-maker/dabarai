
import React, { useState, useEffect } from 'react';
import { searchBiblicalPlaces } from '../services/gemini';
import { StudyItem } from '../types';
import { 
  X, 
  Search, 
  Navigation, 
  Info, 
  ExternalLink, 
  Loader2, 
  LocateFixed,
  Compass,
  MapPin,
  Globe,
  BookmarkPlus
} from 'lucide-react';

interface InteractiveMapProps {
  onDeepStudy?: (prompt: string) => void;
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onDeepStudy, onSave, onActionXp }) => {
  const [query, setQuery] = useState('Jerusalém');
  const [isSearching, setIsSearching] = useState(false);
  const [mapData, setMapData] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  
  const [embedUrl, setEmbedUrl] = useState<string>(
    `https://maps.google.com/maps?q=Jerusalém&t=&z=13&ie=UTF8&iwloc=&output=embed&hl=pt-br`
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.log("GPS não autorizado")
      );
    }
    
    const initialFetch = async () => {
      setIsSearching(true);
      try {
        const result = await searchBiblicalPlaces('Jerusalém', undefined);
        setMapData(result);
      } catch (err) {
        console.error("Erro na busca inicial de dados:", err);
      } finally {
        setIsSearching(false);
      }
    };
    initialFetch();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    const encodedPlace = encodeURIComponent(query);
    setEmbedUrl(`https://maps.google.com/maps?q=${encodedPlace}&t=&z=14&ie=UTF8&iwloc=&output=embed&hl=pt-br`);
    
    onActionXp?.(20, 'Exploração Cartográfica');
    
    try {
      const result = await searchBiblicalPlaces(query, userLocation || undefined);
      setMapData(result);
    } catch (err) {
      console.error("Erro na busca geográfica:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveMap = () => {
    if (mapData && onSave) {
      onSave({
        title: `Mapa: ${query}`,
        content: mapData.text,
        type: 'Map'
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-black font-serif text-sacred flex items-center gap-3 tracking-tighter uppercase italic">
            <Globe className="text-accent" />
            Explorador Geográfico
          </h2>
          <p className="text-sacred-soft text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-70">Cartografia Bíblica Inteligente.</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Nazaré, Mar da Galileia..." 
              className="w-full bg-sacred-soft border border-sacred rounded-xl pl-6 pr-4 py-3 text-sm focus:outline-none focus:border-accent text-sacred font-medium" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isSearching}
            className="px-6 py-3 bg-accent text-sacred rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 shadow-accent disabled:opacity-50 invert"
          >
            {isSearching ? <Loader2 className="animate-spin" size={16} /> : <Navigation size={16} />}
            BUSCAR
          </button>
        </form>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        <div className="flex-[2] bg-sacred-soft rounded-[2rem] md:rounded-[2.5rem] border border-sacred overflow-hidden relative shadow-2xl group min-h-[350px]">
          <iframe
            key={embedUrl}
            title="Google Maps"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={embedUrl}
            allowFullScreen
            loading="eager"
            className="opacity-100 contrast-[1.05] saturate-[1.1]"
          ></iframe>
          
          <div className="absolute bottom-6 left-6 p-4 bg-sacred/80 backdrop-blur-xl border border-sacred rounded-2xl flex items-center gap-3 z-10">
             <LocateFixed size={18} className={userLocation ? 'text-emerald-500' : 'text-sacred-soft'} />
             <span className="text-[9px] font-black uppercase text-sacred tracking-widest">
                {userLocation ? 'GPS Sincronizado' : 'Posicionando...'}
             </span>
          </div>
        </div>

        <div className="flex-1 bg-sacred-soft/40 rounded-[2rem] md:rounded-[2.5rem] border border-sacred overflow-hidden flex flex-col shadow-xl max-h-full">
           <div className="p-5 md:p-6 border-b border-sacred bg-sacred-soft flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass className="text-accent" size={20} />
                <h3 className="text-xs font-black text-sacred uppercase tracking-widest">Dossiê DABAR AI</h3>
              </div>
              {mapData && (
                <button onClick={handleSaveMap} className="text-accent hover:text-sacred hover:bg-accent p-2 rounded-lg transition-all">
                  <BookmarkPlus size={20} />
                </button>
              )}
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {isSearching ? (
                 <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <Loader2 className="animate-spin text-accent" size={32} />
                    <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest animate-pulse">Perscrutando Arqueologia...</p>
                 </div>
              ) : mapData ? (
                 <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="prose prose-invert prose-sm text-sacred leading-relaxed font-serif italic text-base md:text-lg border-l-2 border-accent/20 pl-4">
                       {mapData.text}
                    </div>

                    {mapData.grounding && mapData.grounding.length > 0 && (
                      <div className="space-y-3 pt-6 border-t border-sacred">
                         <h4 className="text-[9px] font-black text-sacred-soft uppercase tracking-widest mb-2">Fontes Verificadas</h4>
                         {mapData.grounding.map((chunk: any, i: number) => {
                           if (chunk.maps) {
                             return (
                               <a 
                                 key={i} 
                                 href={chunk.maps.uri} 
                                 target="_blank" 
                                 rel="noreferrer"
                                 className="flex items-center justify-between p-3 bg-sacred/50 hover:bg-sacred rounded-xl border border-sacred transition-all group"
                               >
                                  <div className="flex items-center gap-2">
                                     <MapPin size={16} className="text-accent" />
                                     <span className="text-[10px] font-bold text-sacred truncate max-w-[180px]">{chunk.maps.title || 'Ver Destino'}</span>
                                  </div>
                                  <ExternalLink size={12} className="text-sacred-soft group-hover:text-accent" />
                               </a>
                             );
                           }
                           return null;
                         })}
                      </div>
                    )}
                 </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 opacity-30 text-center">
                   <Info size={32} className="text-sacred-soft" />
                   <p className="text-[10px] font-black uppercase tracking-widest">Dados Arqueológicos Indisponíveis</p>
                </div>
              )}
           </div>

           {mapData && (
             <div className="p-4 bg-sacred-soft border-t border-sacred">
                <button 
                  onClick={() => onDeepStudy?.(`Realize uma exegese teológica sobre a importância espiritual de ${query} na história da redenção.`)}
                  className="w-full py-4 bg-sacred border border-accent/20 text-accent rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-accent hover:text-sacred transition-all shadow-accent"
                >
                  Estudo Teo-Geográfico IA
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
