
import React, { useState } from 'react';
import { THEOLOGICAL_PERSPECTIVES, MY_EBOOKS } from '../constants';
import { TheologicalPerspective, StudyItem } from '../types';
import { getGeminiResponse } from '../services/gemini';
import { 
  ArrowLeft, 
  Sparkles, 
  Wand2, 
  Loader2,
  FileText,
  Info,
  BookmarkPlus,
  ShoppingBag,
  BookMarked,
  ShieldCheck,
  Star,
  ExternalLink,
  PenTool
} from 'lucide-react';

interface TheologyLibraryProps {
  onDeepStudy?: (prompt: string) => void;
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const TheologyLibrary: React.FC<TheologyLibraryProps> = ({ onDeepStudy, onSave, onActionXp }) => {
  const [activeTab, setActiveTab] = useState<'Catedras' | 'Livraria'>('Catedras');
  const [selected, setSelected] = useState<TheologicalPerspective | null>(null);
  const [readingArticle, setReadingArticle] = useState<any>(null);
  const [isGeneratingTesis, setIsGeneratingTesis] = useState(false);
  const [thesisContent, setThesisContent] = useState<string | null>(null);

  const generateDeepThesis = async () => {
    if (!selected) return;
    setIsGeneratingTesis(true);
    setThesisContent(null);
    onActionXp?.(40, 'Compilando Tratado');
    
    const prompt = `Escreva uma tese acadêmica exaustiva e profunda sobre a vertente: ${selected.name}. 
    A tese deve conter introdução histórica, 5 pilares dogmáticos e conclusão atualizada.`;

    try {
      const response = await getGeminiResponse(prompt);
      setThesisContent(response);
      setReadingArticle({ id: 'thesis', title: `Tratado Exaustivo: ${selected.name}` });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingTesis(false);
    }
  };

  if (readingArticle) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500 pb-20 px-4">
        <button onClick={() => {setReadingArticle(null); setThesisContent(null);}} className="flex items-center gap-3 text-sacred-soft hover:text-sacred font-black text-xs uppercase tracking-widest group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Biblioteca
        </button>
        <div className="bg-sacred-soft/50 p-8 md:p-20 rounded-[3rem] border border-sacred shadow-2xl relative overflow-hidden">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.4em] bg-accent/10 px-6 py-2.5 rounded-full border border-accent/20">Tese DABAR AI</span>
              <h1 className="text-3xl md:text-6xl font-serif font-black text-sacred italic tracking-tighter leading-tight">{readingArticle.title}</h1>
            </div>
            <button className="p-4 bg-accent text-sacred hover:bg-accent/80 rounded-2xl transition-all shadow-xl invert"><BookmarkPlus size={20} /></button>
          </div>
          <div className="prose prose-invert max-w-none text-sacred text-base md:text-xl leading-relaxed space-y-8 font-serif italic">
             {thesisContent ? <div className="whitespace-pre-wrap">{thesisContent}</div> : <Loader2 className="animate-spin text-accent" />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-sacred-soft/40 p-8 md:p-12 rounded-[3.5rem] border border-sacred relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4">
          <BookMarked size={300} />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black font-serif text-sacred tracking-tighter uppercase italic leading-none">O Scriptorium</h2>
          <p className="text-sacred-soft text-lg md:text-xl mt-4 font-serif italic max-w-xl">Conhecimento milenar e literatura profética contemporânea.</p>
        </div>
        <div className="flex bg-sacred p-1.5 rounded-[2rem] border-2 border-sacred shadow-2xl relative z-10">
           <button onClick={() => setActiveTab('Catedras')} className={`px-10 py-4 rounded-3xl text-[10px] font-black tracking-[0.2em] transition-all flex items-center gap-3 ${activeTab === 'Catedras' ? 'bg-accent text-sacred shadow-xl invert scale-[1.05]' : 'text-sacred-soft hover:text-sacred'}`}>
             <FileText size={16} /> CÁTEDRAS
           </button>
           <button onClick={() => setActiveTab('Livraria')} className={`px-10 py-4 rounded-3xl text-[10px] font-black tracking-[0.2em] transition-all flex items-center gap-3 ${activeTab === 'Livraria' ? 'bg-accent text-sacred shadow-xl invert scale-[1.05]' : 'text-sacred-soft hover:text-sacred'}`}>
             <ShoppingBag size={16} /> LIVRARIA
           </button>
        </div>
      </div>

      {activeTab === 'Catedras' ? (
        !selected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in duration-500">
            {THEOLOGICAL_PERSPECTIVES.map((p) => (
              <button key={p.id} onClick={() => setSelected(p)} className="group text-left bg-sacred-soft/40 border border-sacred p-12 rounded-[3rem] hover:border-accent/50 hover:bg-sacred-soft transition-all shadow-2xl hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 bg-accent/10 p-10 rounded-full group-hover:bg-accent/20 transition-all">
                  <FileText size={40} className="text-sacred-soft group-hover:text-accent" />
                </div>
                <h3 className="font-black text-2xl text-sacred mb-6 uppercase tracking-tighter italic group-hover:text-accent relative z-10">{p.name}</h3>
                <p className="text-sm text-sacred-soft line-clamp-4 leading-relaxed font-medium mb-8 relative z-10">{p.description}</p>
                <div className="flex items-center gap-2 text-accent font-black text-[9px] uppercase tracking-widest relative z-10">
                   Explorar Cátedra <Star size={10} className="animate-pulse" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-in slide-in-from-right duration-500 space-y-12">
             <button onClick={() => setSelected(null)} className="flex items-center gap-3 text-sacred-soft hover:text-sacred font-black text-[10px] uppercase tracking-widest group">
                <ArrowLeft size={16} /> Voltar para o Scriptorium
             </button>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 p-12 md:p-20 bg-sacred-soft border-2 border-sacred rounded-[4.5rem] relative overflow-hidden shadow-2xl">
                   <div className="flex items-center gap-4 mb-8">
                      <span className="px-5 py-2 bg-accent/20 text-accent rounded-full font-black text-[10px] uppercase tracking-widest border border-accent/20">Domínio Teológico</span>
                      <ShieldCheck size={18} className="text-accent" />
                   </div>
                   <h1 className="text-5xl md:text-8xl font-serif font-black text-sacred mb-8 tracking-tighter italic leading-none">{selected.name}</h1>
                   <p className="text-xl md:text-3xl text-sacred-soft leading-relaxed mb-12 font-serif italic">{selected.description}</p>
                   <div className="flex flex-wrap gap-6">
                      <button onClick={generateDeepThesis} disabled={isGeneratingTesis} className="px-12 py-6 bg-accent text-sacred rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-accent/80 shadow-2xl invert disabled:opacity-50 transition-all">
                        {isGeneratingTesis ? <Loader2 className="animate-spin" /> : <Wand2 />} GERAR TRATADO EXAUSTIVO
                      </button>
                   </div>
                </div>
                <div className="space-y-8">
                   <div className="p-10 bg-sacred-soft/60 border border-sacred rounded-[3rem] shadow-xl">
                      <h4 className="font-black text-sacred-soft mb-8 uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 border-b border-sacred pb-4"><Info size={14} className="text-accent" /> Pilares Dogmáticos</h4>
                      <div className="space-y-4">
                        {selected.keyPrinciples.map(pr => (
                          <div key={pr} className="p-5 bg-sacred border border-sacred rounded-2xl group hover:border-accent/40 transition-all">
                            <span className="font-black text-xs text-sacred group-hover:text-accent uppercase tracking-widest">{pr}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )
      ) : (
        <div className="space-y-12 animate-in fade-in duration-700">
           {/* Banner do Autor */}
           <div className="bg-gradient-to-r from-accent/20 via-sacred-soft to-sacred border border-accent/30 p-10 md:p-14 rounded-[4rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-accent flex items-center justify-center text-sacred shadow-accent invert shrink-0">
                  <PenTool size={48} />
                </div>
                <div className="text-center md:text-left space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black font-serif text-sacred italic uppercase tracking-tighter leading-none">Marcelo Reinert</h2>
                  <p className="text-sacred-soft text-lg font-serif italic max-w-2xl mx-auto">Autor e Teólogo consagrado, cujas obras agora integram o ecossistema DABAR AI. Adquira os exemplares originais no Clube de Autores.</p>
                </div>
              </div>
              <a 
                href="https://clubedeautores.com.br/livros/autores/marcelo-reinert" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-4 bg-sacred border-2 border-accent text-accent rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-sacred transition-all flex items-center gap-3 shrink-0"
              >
                VER CATÁLOGO COMPLETO <ExternalLink size={14} />
              </a>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {MY_EBOOKS.map(book => (
                <div key={book.id} className="bg-sacred-soft border-2 border-sacred rounded-[3.5rem] overflow-hidden shadow-2xl hover:border-accent transition-all group flex flex-col h-full">
                   <div className="aspect-[3/4] relative overflow-hidden shrink-0">
                      <img src={book.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={book.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-sacred via-transparent to-transparent opacity-80"></div>
                      <div className="absolute top-6 right-6">
                         <div className="p-3 bg-sacred/40 backdrop-blur-md rounded-2xl border border-white/10 text-accent">
                            <ShieldCheck size={20} />
                         </div>
                      </div>
                      <div className="absolute bottom-8 left-8 right-8">
                         <span className="px-5 py-2 bg-accent text-sacred font-black text-[9px] uppercase tracking-[0.3em] rounded-full shadow-2xl invert">OBRA ORIGINAL</span>
                      </div>
                   </div>
                   <div className="p-10 flex flex-col flex-1 space-y-6">
                      <h3 className="text-2xl font-black text-sacred uppercase tracking-tighter leading-tight italic min-h-[64px] group-hover:text-accent transition-colors">{book.title}</h3>
                      <p className="text-sacred-soft text-sm italic font-serif leading-relaxed line-clamp-3 flex-1">{book.description}</p>
                      
                      <div className="flex items-center justify-between border-t border-sacred pt-8 mt-4">
                         <div>
                            <p className="text-[9px] font-black text-sacred-soft uppercase tracking-widest mb-1">Marcelo Reinert</p>
                            <span className="text-xl font-black text-white italic">{book.price}</span>
                         </div>
                         <a 
                          href={book.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-5 bg-accent text-sacred rounded-3xl hover:opacity-90 transition-all shadow-accent invert flex items-center gap-3 group/btn"
                         >
                            <ShoppingBag size={20} /> 
                            <span className="font-black text-[11px] uppercase tracking-widest">ADQUIRIR</span>
                            <ExternalLink size={14} className="opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                         </a>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="p-12 md:p-20 bg-accent/5 border-2 border-accent/20 rounded-[4rem] text-center space-y-8 relative overflow-hidden shadow-inner">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 pointer-events-none">
                 <ShoppingBag size={400} />
              </div>
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mx-auto">
                <ShieldCheck size={40} />
              </div>
              <h4 className="text-2xl md:text-4xl font-black text-sacred uppercase tracking-[0.2em] italic">Segurança & Reconhecimento</h4>
              <p className="text-sacred-soft text-lg md:text-xl max-w-2xl mx-auto italic font-serif leading-relaxed">
                Cada obra adquirida através do catálogo de **Marcelo Reinert** fortalece a continuidade deste ecossistema e garante que mais conteúdos teológicos de alta qualidade sejam produzidos.
              </p>
              <div className="flex justify-center gap-8 opacity-40">
                 <div className="flex items-center gap-2 font-black text-[10px] text-sacred tracking-widest uppercase">
                    <Star size={14} className="text-accent" /> Autor Verificado
                 </div>
                 <div className="flex items-center gap-2 font-black text-[10px] text-sacred tracking-widest uppercase">
                    <Star size={14} className="text-accent" /> Checkout Clube de Autores
                 </div>
                 <div className="flex items-center gap-2 font-black text-[10px] text-sacred tracking-widest uppercase">
                    <Star size={14} className="text-accent" /> Suporte Dedicado
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TheologyLibrary;
