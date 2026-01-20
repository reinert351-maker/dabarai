
import React, { useState } from 'react';
import { THEOLOGICAL_PERSPECTIVES } from '../constants';
import { TheologicalPerspective, StudyItem } from '../types';
import { getGeminiResponse } from '../services/gemini';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  PlayCircle, 
  BookOpen, 
  Download, 
  Share2, 
  ArrowLeft, 
  Sparkles, 
  Wand2, 
  Loader2,
  FileText,
  Quote as QuoteIcon,
  Layers,
  Info,
  BookmarkPlus
} from 'lucide-react';

interface TheologyLibraryProps {
  onDeepStudy?: (prompt: string) => void;
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const TheologyLibrary: React.FC<TheologyLibraryProps> = ({ onDeepStudy, onSave, onActionXp }) => {
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
    A tese deve conter: 
    1. Introdução histórica detalhada. 
    2. Análise dos 5 principais pilares dogmáticos com referências bíblicas. 
    3. Comparação com pelo menos duas outras vertentes. 
    4. Críticas contemporâneas e respostas apologéticas. 
    5. Conclusão sobre a relevância atual sob a ótica do DABAR AI. 
    Use tom acadêmico e teologia de alto nível.`;

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

  const handleSaveThesis = () => {
    if (onSave && thesisContent && selected) {
      onSave({
        title: `Tratado: ${selected.name}`,
        content: thesisContent,
        type: 'Research'
      });
    }
  };

  if (readingArticle) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500 pb-20">
        <button 
          onClick={() => {setReadingArticle(null); setThesisContent(null);}}
          className="flex items-center gap-3 text-slate-400 hover:text-white font-black text-xs uppercase tracking-widest group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Biblioteca
        </button>
        
        <div className="bg-slate-900/50 p-6 md:p-20 rounded-[2.5rem] md:rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 via-indigo-600 to-amber-600"></div>
          
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] bg-amber-500/10 px-6 py-2.5 rounded-full border border-amber-500/20">
                Tese DABAR AI • {selected?.name}
              </span>
              <h1 className="text-3xl md:text-6xl font-serif font-black text-white leading-tight italic tracking-tighter break-words">
                {readingArticle.title}
              </h1>
            </div>
            <div className="flex gap-3">
               <button 
                onClick={handleSaveThesis}
                className="p-4 bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-2xl border border-transparent transition-all shadow-xl"
                title="Salvar no Scriptorium DABAR"
               >
                 <BookmarkPlus size={20} />
               </button>
               <button className="p-4 bg-slate-800 text-slate-400 hover:text-white rounded-2xl border border-slate-700 transition-all"><Download size={20} /></button>
            </div>
          </div>

          <div className="flex items-center gap-5 mb-12 border-b border-slate-800/50 pb-12">
             <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl border border-indigo-400/20">
                <Sparkles size={28} />
             </div>
             <div>
                <p className="font-black text-slate-100 uppercase text-[10px] md:text-sm tracking-widest">Compilador Teológico DABAR AI</p>
                <p className="text-[8px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">Sincronizado Academicamente</p>
             </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-base md:text-xl leading-relaxed space-y-8 font-serif">
             {thesisContent ? (
               <div className="whitespace-pre-wrap animate-in fade-in duration-1000">
                  {thesisContent}
               </div>
             ) : (
               <>
                 <p className="first-letter:text-5xl md:first-letter:text-7xl first-letter:font-black first-letter:text-amber-500 first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                    A estrutura fundamental de {selected?.name} reside na compreensão de que a revelação divina não é apenas um conjunto de proposições lógicas, mas uma manifestação dinâmica da glória de Deus na história humana.
                 </p>
               </>
             )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-black font-serif text-slate-100 tracking-tighter uppercase italic">Cátedras</h2>
          <p className="text-slate-400 text-sm md:text-xl font-medium mt-1">20 correntes de pensamento teológico profundo.</p>
        </div>
        <div className="relative group flex-1 md:max-w-md w-full">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Pesquisar dogmas..." 
            className="bg-slate-900 border-2 border-slate-800 rounded-2xl md:rounded-3xl pl-14 pr-6 py-4 md:py-5 text-xs md:text-sm focus:outline-none focus:border-amber-500 w-full transition-all shadow-2xl"
          />
        </div>
      </div>

      {!selected ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-in fade-in zoom-in duration-500">
          {THEOLOGICAL_PERSPECTIVES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="group text-left bg-slate-900/40 border border-slate-800 p-5 md:p-8 lg:p-10 rounded-[1.5rem] md:rounded-[2.5rem] hover:border-amber-500/50 hover:bg-slate-900/60 transition-all shadow-xl hover:-translate-y-1 relative overflow-hidden min-h-[200px] sm:min-h-[300px] flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] -translate-x-12 -translate-y-12 group-hover:bg-amber-500/10 transition-all"></div>
              
              <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-800 rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-all shadow-lg border border-slate-700">
                <FileText size={20} className="md:size-24 group-hover:scale-110 transition-transform" />
              </div>
              
              <h3 className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100 mb-2 md:mb-4 uppercase tracking-tighter leading-none italic break-words transition-all group-hover:text-amber-500">
                {p.name}
              </h3>
              
              <p className="text-[10px] md:text-sm text-slate-500 line-clamp-2 sm:line-clamp-3 leading-tight md:leading-relaxed mb-4 md:mb-6 font-medium flex-1">
                {p.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/50">
                {p.keyPrinciples.slice(0, 2).map(principle => (
                  <span key={principle} className="text-[7px] md:text-[9px] px-2 py-1 md:px-3 md:py-1.5 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-500 font-black uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                    {principle}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-in slide-in-from-right duration-500 space-y-8 md:space-y-12">
          <button 
            onClick={() => setSelected(null)}
            className="flex items-center gap-3 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} /> Voltar ao Cânon
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-8 md:space-y-10">
              <div className="p-8 md:p-14 lg:p-20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-800 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none rotate-12 scale-150">
                  <BookOpen size={250} />
                </div>
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                    <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Acadêmico</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-6 md:mb-8 tracking-tighter italic break-words leading-none">{selected.name}</h1>
                <p className="text-base md:text-xl lg:text-2xl text-slate-300 leading-relaxed mb-8 md:mb-12 font-medium max-w-3xl">{selected.description}</p>
                
                <div className="flex flex-wrap gap-4 md:gap-5">
                  <button 
                    onClick={generateDeepThesis}
                    disabled={isGeneratingTesis}
                    className="flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-amber-500 text-slate-900 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[11px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-amber-400 shadow-2xl transition-all disabled:opacity-50 invert"
                  >
                    {isGeneratingTesis ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                    GERAR TRATADO
                  </button>
                  <button 
                    onClick={() => onDeepStudy?.(`Realize uma comparação crítica entre a ${selected?.name} e a Teologia Reformada, focando em Soteriologia.`)}
                    className="flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-slate-800 text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[11px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-slate-700 shadow-xl border border-slate-700 transition-all"
                  >
                    <Layers size={18} /> ANALISADOR
                  </button>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-3xl font-black text-slate-100 flex items-center gap-4 uppercase tracking-tighter italic">
                    <BookOpen size={24} className="text-amber-500" /> Corpo Docente
                  </h3>
                  <div className="h-[1px] flex-1 bg-slate-800 ml-6"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {selected.notableFigures.map((figure, i) => (
                    <div key={figure} className="p-5 md:p-8 bg-slate-900/40 rounded-2xl md:rounded-3xl border border-slate-800 hover:border-amber-500/30 transition-all group flex items-center gap-4 md:gap-6 shadow-xl">
                       <img src={`https://i.pravatar.cc/100?u=${figure}`} className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl border-2 border-slate-800 group-hover:scale-105 transition-transform" alt="" />
                       <div className="min-w-0">
                          <p className="font-black text-slate-100 uppercase text-[10px] md:text-sm tracking-tight truncate">{figure}</p>
                          <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Doutor da Cátedra</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
               <div className="p-6 md:p-10 bg-slate-900/60 rounded-[2rem] md:rounded-[3rem] border border-slate-800 shadow-2xl">
                  <h4 className="font-black text-slate-400 mb-6 md:mb-8 uppercase text-[9px] tracking-[0.4em] flex items-center gap-3">
                    <Info size={14} className="text-amber-500" /> Pilares
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    {selected.keyPrinciples.map(principle => (
                      <div key={principle} className="flex flex-col gap-1 p-4 bg-slate-950/50 rounded-xl md:rounded-2xl border border-slate-800/50 hover:border-amber-500/20 transition-all">
                        <span className="font-black text-[9px] md:text-xs text-amber-500 uppercase tracking-widest">{principle}</span>
                        <p className="text-[9px] md:text-[11px] text-slate-500 font-medium leading-tight">Análise profunda sob a ótica de {selected.name}.</p>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="p-6 md:p-10 bg-gradient-to-br from-indigo-900/40 to-slate-900 rounded-[2rem] md:rounded-[3rem] border border-indigo-500/20 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-indigo-500/10 rotate-12 transition-transform group-hover:rotate-45">
                    <Layers size={100} />
                  </div>
                  <h4 className="font-black text-indigo-400 mb-4 uppercase text-[10px] tracking-[0.3em]">Hermenêutica</h4>
                  <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed mb-6 md:mb-10 font-medium">Use nosso motor IA para comparar divergências entre {selected.name} e outras vertentes.</p>
                  <button 
                    onClick={() => {
                      onActionXp?.(30, 'Análise Comparativa');
                      onDeepStudy?.(`Realize um Comparativo Hermenêutico exaustivo: Compare a vertente ${selected?.name} com as outras principais vertentes teológicas (como Reformada, Pentecostal e Católica). Analise as divergências em Soteriologia, Eclesiologia e Bibliologia, usando o DABAR AI para uma síntese acadêmica.`);
                    }}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-900/50"
                  >
                    Lançar Analisador
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheologyLibrary;
