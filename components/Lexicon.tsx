
import React, { useState } from 'react';
import { STRONGS_DICTIONARY, HISTORICAL_QUOTES } from '../constants';
import { getGeminiResponse } from '../services/gemini';
import { 
  Search, 
  Book, 
  Languages, 
  Loader2, 
  Sparkles, 
  Languages as LangIcon,
  BookmarkPlus,
  Info,
  Hash,
  Filter,
  Award,
  Quote as QuoteIcon,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { StudyItem, StrongEntry, Quote } from '../types';

interface LexiconProps {
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const Lexicon: React.FC<LexiconProps> = ({ onSave, onActionXp }) => {
  const [activeTab, setActiveTab] = useState<'Strong' | 'Antologia'>('Strong');
  const [searchQuery, setSearchQuery] = useState('');
  const [strongResult, setStrongResult] = useState<StrongEntry | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [quoteFilter, setQuoteFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredQuotes = HISTORICAL_QUOTES.filter(q => {
    const matchesSearch = q.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = quoteFilter === 'All' || q.author === quoteFilter;
    const matchesCategory = categoryFilter === 'All' || q.category === categoryFilter;
    return matchesSearch && matchesAuthor && matchesCategory;
  });

  const authors = Array.from(new Set(HISTORICAL_QUOTES.map(q => q.author))).sort();
  const categories = Array.from(new Set(HISTORICAL_QUOTES.filter(q => q.category).map(q => q.category as string))).sort();

  const handleStrongSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setStrongResult(null);

    const upperQuery = searchQuery.trim().toUpperCase();
    if (STRONGS_DICTIONARY[upperQuery]) {
      setStrongResult(STRONGS_DICTIONARY[upperQuery]);
      setIsSearching(false);
      onActionXp?.(5, 'Consulta Léxica');
      return;
    }

    try {
      const prompt = `Aja como o dicionário Strong completo. Forneça a entrada léxica detalhada para o termo ou número Strong: "${searchQuery}". 
      Retorne APENAS um JSON no formato: {
        "word": "palavra em português",
        "original": "original em grego/hebraico com transliteração",
        "pronunciation": "pronúncia fonética",
        "number": "número Strong (ex: G3056 ou H7225)",
        "definition": "definição teológica profunda",
        "etymology": "origem da palavra"
      }`;
      
      const response = await getGeminiResponse(prompt);
      const data = JSON.parse(response);
      setStrongResult(data);
      onActionXp?.(15, 'Revelação Etimológica');
    } catch (err) {
      console.error("Erro na busca léxica:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const saveQuote = (q: Quote) => {
    onSave?.({
      title: `Citação: ${q.author}`,
      content: q.text,
      type: 'Quote'
    });
  };

  const saveStrong = (s: StrongEntry) => {
    onSave?.({
      title: `Léxico: ${s.word} (${s.number})`,
      content: `${s.original}\nPronúncia: ${s.pronunciation}\nDefinição: ${s.definition}\nEtimologia: ${s.etymology}`,
      type: 'Research'
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      
      <div className="bg-sacred-soft/40 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-sacred shadow-2xl relative overflow-hidden">
        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-3xl md:text-6xl font-serif font-black text-sacred flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 uppercase tracking-tighter leading-none italic">
            <span className="flex items-center gap-4">
              <LangIcon className="text-accent" size={32} />
              Léxico & Sabedoria
            </span>
          </h2>
          <p className="text-sacred-soft text-sm md:text-lg font-medium max-w-2xl mx-auto font-serif italic">
            O repositório definitivo de línguas originais e pensamentos dos santos.
          </p>
        </div>
      </div>

      <div className="flex justify-center w-full px-2">
        <div className="bg-sacred-soft border-2 border-sacred p-1.5 rounded-[2rem] flex w-full max-w-2xl shadow-2xl">
           <button
             onClick={() => {setActiveTab('Strong'); setSearchQuery(''); setStrongResult(null);}}
             className={`flex-1 flex items-center justify-center gap-3 px-4 py-4 md:py-5 rounded-3xl text-[10px] md:text-xs font-black tracking-widest transition-all ${activeTab === 'Strong' ? 'bg-accent text-sacred shadow-lg invert scale-[1.02]' : 'text-sacred-soft hover:text-sacred'}`}
           >
             <BookOpen size={18} />
             DICIONÁRIO STRONG
           </button>
           <button
             onClick={() => {setActiveTab('Antologia'); setSearchQuery(''); setStrongResult(null);}}
             className={`flex-1 flex items-center justify-center gap-3 px-4 py-4 md:py-5 rounded-3xl text-[10px] md:text-xs font-black tracking-widest transition-all ${activeTab === 'Antologia' ? 'bg-accent text-sacred shadow-lg invert scale-[1.02]' : 'text-sacred-soft hover:text-sacred'}`}
           >
             <Award size={18} />
             ANTOLOGIA ({HISTORICAL_QUOTES.length})
           </button>
        </div>
      </div>

      {activeTab === 'Strong' ? (
        <div className="space-y-8 animate-in slide-in-from-left-4 duration-500 pt-4">
           <div className="max-w-3xl mx-auto">
              <form onSubmit={handleStrongSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                  <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-sacred-soft group-focus-within:text-accent" size={20} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Número Strong (ex: G3056) ou palavra..." 
                    className="w-full bg-sacred-soft border-2 border-sacred rounded-2xl md:rounded-[2rem] pl-14 pr-6 py-4 md:py-5 text-sacred font-bold focus:outline-none focus:border-accent shadow-xl"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="px-8 py-4 md:py-0 bg-accent text-sacred rounded-2xl md:rounded-[2rem] font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 invert disabled:opacity-50"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                  BUSCAR
                </button>
              </form>
           </div>

           {strongResult ? (
             <div className="bg-sacred-soft/60 border-2 border-sacred p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl animate-in zoom-in duration-500 relative">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                   <div className="space-y-6 w-full lg:w-1/3">
                      <div className="flex items-center gap-4">
                         <span className="px-5 py-2 bg-accent text-sacred font-black text-[10px] rounded-full invert shadow-lg">{strongResult.number}</span>
                         <span className="text-[9px] font-black text-sacred-soft uppercase tracking-widest">Léxico DABAR</span>
                      </div>
                      <h3 className="text-4xl md:text-7xl font-serif font-black text-sacred tracking-tighter leading-none italic">{strongResult.word}</h3>
                      <div className="p-6 bg-sacred/50 rounded-3xl border border-sacred block">
                         <p className="text-3xl font-divine text-accent italic">{strongResult.original}</p>
                         <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest mt-3">Pronúncia: {strongResult.pronunciation}</p>
                      </div>
                   </div>

                   <div className="flex-1 w-full space-y-8 bg-sacred-soft/40 p-6 md:p-10 rounded-[2rem] border border-sacred backdrop-blur-sm">
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-3">
                            <Info size={14} className="text-accent" /> Definição Teológica
                         </h4>
                         <p className="text-lg md:text-xl text-sacred leading-relaxed font-serif italic">{strongResult.definition}</p>
                      </div>
                      <div className="pt-6 border-t border-sacred space-y-4">
                         <h4 className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">Etimologia & Origem</h4>
                         <p className="text-xs md:text-sm text-sacred-soft font-medium leading-relaxed uppercase tracking-wider">{strongResult.etymology}</p>
                      </div>
                      <button 
                        onClick={() => saveStrong(strongResult)}
                        className="w-full py-5 bg-sacred border border-accent/20 text-accent rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-sacred transition-all flex items-center justify-center gap-3"
                      >
                         <BookmarkPlus size={18} /> SALVAR NO SCRIPTORIUM
                      </button>
                   </div>
                </div>
             </div>
           ) : !isSearching && (
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.values(STRONGS_DICTIONARY).map((s: any) => (
                   <button 
                    key={s.number} 
                    onClick={() => {setStrongResult(s); window.scrollTo({top: 0, behavior: 'smooth'});}}
                    className="p-5 md:p-6 bg-sacred-soft/40 border border-sacred rounded-2xl text-center hover:border-accent/40 transition-all group"
                   >
                      <span className="text-[8px] font-black text-accent block mb-2 opacity-50">{s.number}</span>
                      <span className="text-base md:text-lg font-black text-sacred group-hover:text-accent block leading-none truncate">{s.word}</span>
                   </button>
                ))}
             </div>
           )}
        </div>
      ) : (
        <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pt-4">
           
           <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-sacred-soft group-focus-within:text-accent" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar citação ou autor..." 
                  className="w-full bg-sacred-soft border-2 border-sacred rounded-2xl md:rounded-[2rem] pl-14 pr-6 py-4 md:py-5 text-sacred font-bold focus:outline-none focus:border-accent shadow-xl"
                />
              </div>
              <div className="flex gap-2">
                 <select 
                   value={quoteFilter}
                   onChange={(e) => setQuoteFilter(e.target.value)}
                   className="bg-sacred-soft border-2 border-sacred rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest text-sacred focus:outline-none focus:border-accent"
                 >
                    <option value="All">Todos Autores</option>
                    {authors.map(a => <option key={a} value={a}>{a}</option>)}
                 </select>
                 <select 
                   value={categoryFilter}
                   onChange={(e) => setCategoryFilter(e.target.value)}
                   className="bg-sacred-soft border-2 border-sacred rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest text-sacred focus:outline-none focus:border-accent"
                 >
                    <option value="All">Todas Categorias</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredQuotes.map((q, i) => (
                <div 
                  key={i} 
                  className="bg-sacred-soft/30 border border-sacred p-8 md:p-10 rounded-[2.5rem] shadow-xl hover:border-accent/40 transition-all group flex flex-col min-h-[250px] relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-accent pointer-events-none group-hover:scale-125 transition-transform">
                      <QuoteIcon size={120} />
                   </div>
                   
                   <div className="mb-4">
                      {q.category && (
                        <span className="text-[8px] font-black text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest border border-accent/20">
                          {q.category}
                        </span>
                      )}
                   </div>

                   <div className="flex-1 relative z-10">
                      <p className="text-lg md:text-xl font-serif italic text-sacred leading-relaxed mb-8">
                        "{q.text}"
                      </p>
                   </div>
                   
                   <div className="pt-6 border-t border-sacred flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-sacred rounded-xl flex items-center justify-center text-accent border border-accent/20 shadow-lg">
                            <span className="font-black text-xs italic uppercase">{q.author[0]}</span>
                         </div>
                         <div>
                            <span className="text-[10px] font-black text-accent uppercase tracking-widest block">{q.author}</span>
                            <span className="text-[8px] text-sacred-soft font-bold uppercase tracking-[0.2em]">Santos do Logos</span>
                         </div>
                      </div>
                      <button 
                        onClick={() => {
                          saveQuote(q);
                          onActionXp?.(5, 'Preservação de Sabedoria');
                        }}
                        className="p-3 bg-sacred rounded-xl border border-sacred text-sacred-soft hover:text-accent hover:border-accent transition-all shadow-md group/btn"
                      >
                         <BookmarkPlus size={18} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
           
           {filteredQuotes.length === 0 && (
             <div className="py-20 flex flex-col items-center justify-center gap-4 opacity-40">
                <Search size={48} className="text-sacred-soft" />
                <p className="text-xs font-black uppercase tracking-widest">Nenhuma sabedoria encontrada para esta busca.</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default Lexicon;
