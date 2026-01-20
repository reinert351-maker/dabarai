
import React, { useState, useRef, useEffect } from 'react';
import { STRONGS_DICTIONARY, THEOLOGICAL_PERSPECTIVES, BIBLE_BOOKS } from '../constants';
import { getGeminiResponse, generateBibleImage, getBibleVerses } from '../services/gemini';
import { StudyItem } from '../types';
import { 
  Search, 
  X, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ChevronDown,
  Library,
  BookMarked,
  ScrollText,
  Bookmark,
  Info,
  Milestone,
  BookmarkPlus
} from 'lucide-react';

interface VerseData {
  number: number;
  text: string;
}

interface BibleReaderProps {
  onDeepStudy?: (prompt: string) => void;
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const BibleReader: React.FC<BibleReaderProps> = ({ onDeepStudy, onSave, onActionXp }) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [activePerspectiveId, setActivePerspectiveId] = useState(THEOLOGICAL_PERSPECTIVES[0].id);
  const [perspectiveContent, setPerspectiveContent] = useState<Record<string, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [translation, setTranslation] = useState('NVI');

  const [currentBook, setCurrentBook] = useState(BIBLE_BOOKS[0]);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [verses, setVerses] = useState<VerseData[]>([]);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);
  const [chapterImg, setChapterImg] = useState<string | null>(null);

  const [detectedBookMatch, setDetectedBookMatch] = useState<any>(null);
  const [detectedChapter, setDetectedChapter] = useState<number | undefined>(undefined);

  const [showSelector, setShowSelector] = useState(false);
  const [selectorStep, setSelectorStep] = useState<'book' | 'chapter'>('book');

  useEffect(() => {
    const loadChapterData = async () => {
      setIsLoadingChapter(true);
      setChapterImg(null); 
      try {
        const data = await getBibleVerses(currentBook.name, currentChapter, translation);
        setVerses(data);
        const img = await generateBibleImage(`${currentBook.name} capítulo ${currentChapter}`);
        setChapterImg(img);
        onActionXp?.(10, 'Sincronia de Manuscritos');
      } catch (err) {
        console.error("Erro ao carregar dados do capítulo");
      } finally {
        setIsLoadingChapter(false);
      }
    };
    loadChapterData();
  }, [currentBook, currentChapter, translation]);

  const handleGlobalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSearch.trim() || isSearching) return;

    const query = globalSearch;
    setIsSearching(true);
    setSearchResult(query);
    setPerspectiveContent({});
    setGeneratedImg(null);
    onActionXp?.(30, 'Lançando Exegese');
    
    const bookMatch = BIBLE_BOOKS.find(b => query.toLowerCase().includes(b.name.toLowerCase()));
    const chapterMatch = query.match(/\d+/);
    
    setDetectedBookMatch(bookMatch || null);
    setDetectedChapter(chapterMatch ? parseInt(chapterMatch[0]) : undefined);
    
    generateBibleImage(query).then(img => setGeneratedImg(img));

    const initialLoading: Record<string, boolean> = {};
    THEOLOGICAL_PERSPECTIVES.forEach(p => initialLoading[p.id] = true);
    setLoadingStates(initialLoading);

    THEOLOGICAL_PERSPECTIVES.forEach(async (perspective) => {
      try {
        const prompt = `Como a ${perspective.name} interpreta o assunto "${query}"? Forneça uma análise profunda e acadêmica.`;
        const response = await getGeminiResponse(prompt);
        setPerspectiveContent(prev => ({ ...prev, [perspective.id]: response }));
      } catch (error) {
        setPerspectiveContent(prev => ({ ...prev, [perspective.id]: "Erro na conexão DABAR." }));
      } finally {
        setLoadingStates(prev => ({ ...prev, [perspective.id]: false }));
      }
    });

    setIsSearching(false);
  };

  const handleSaveVerse = (v: VerseData) => {
    if (onSave) {
      onSave({
        title: `${currentBook.name} ${currentChapter}:${v.number} (${translation})`,
        content: v.text,
        type: 'Verse'
      });
    }
  };

  const renderVerseText = (text: string) => {
    const dictionaryEntries = Object.values(STRONGS_DICTIONARY);
    const parts = text.split(/(\s+)/);

    return parts.map((part, i) => {
      const cleanPart = part.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
      const entry = dictionaryEntries.find(e => e.word.toLowerCase() === cleanPart.toLowerCase());
      
      if (entry) {
        return (
          <span 
            key={i} 
            onClick={() => setSelectedWord(entry)}
            className="text-accent border-b border-accent/20 cursor-help hover:text-accent/60 transition-colors select-none"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const BookMetadataHeader = ({ book, chapter, versesCount, customTitle }: { book?: any, chapter?: number, versesCount?: number, customTitle?: string }) => {
    if (!book && !customTitle) return null;
    const displayTitle = customTitle || `${book.name}${chapter ? ` ${chapter}` : ''}`;

    return (
      <div className="bg-sacred-soft/40 p-6 md:p-8 border-b border-sacred">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            {book && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-accent text-sacred rounded-lg text-[9px] font-black uppercase tracking-widest invert">{book.genre}</span>
                <span className="px-3 py-1 bg-sacred border border-sacred text-sacred-soft rounded-lg text-[9px] font-black uppercase tracking-widest">Livro {book.position}</span>
              </div>
            )}
            <h2 className="text-3xl md:text-5xl font-serif font-black text-sacred italic tracking-tighter leading-none">
              {displayTitle}
            </h2>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      
      <div className="bg-sacred-soft/90 p-3 rounded-2xl md:rounded-[2.5rem] border border-sacred shadow-2xl backdrop-blur-lg sticky top-0 z-40 transition-all">
        <form onSubmit={handleGlobalSearch} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sacred-soft" size={20} />
            <input 
              type="text" 
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Pesquisar exegese..." 
              className="w-full bg-sacred border border-sacred rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-accent text-sacred"
            />
          </div>
          <button 
            type="submit"
            disabled={isSearching}
            className="px-6 py-3.5 bg-accent text-sacred rounded-xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 invert"
          >
            {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            ESTUDAR
          </button>
        </form>
      </div>

      {!searchResult ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-30">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button 
                onClick={() => {setShowSelector(true); setSelectorStep('book');}}
                className="flex-1 md:flex-none flex items-center justify-between gap-4 px-6 py-4 bg-sacred-soft border border-sacred rounded-xl hover:border-accent/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <BookMarked className="text-accent" size={20} />
                  <span className="text-xs font-black text-sacred uppercase tracking-tighter">{currentBook.name} {currentChapter}</span>
                </div>
                <ChevronDown size={14} className="text-sacred-soft" />
              </button>
              
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentChapter(prev => Math.max(1, prev - 1))} className="p-4 bg-sacred-soft text-sacred-soft rounded-xl border border-sacred hover:text-sacred transition-all"><ChevronLeft size={20} /></button>
                <button onClick={() => setCurrentChapter(prev => Math.min(currentBook.chapters, prev + 1))} className="p-4 bg-sacred-soft text-sacred-soft rounded-xl border border-sacred hover:text-sacred transition-all"><ChevronRight size={20} /></button>
              </div>
            </div>

            <div className="flex bg-sacred p-1 rounded-xl border border-sacred">
              {['NVI', 'ARC', 'KJA', 'HEB'].map((t) => (
                <button key={t} onClick={() => setTranslation(t)} className={`px-4 py-2 rounded-lg text-[9px] font-black tracking-widest transition-all ${translation === t ? 'bg-accent text-sacred shadow-md invert' : 'text-sacred-soft hover:text-sacred'}`}>{t}</button>
              ))}
            </div>
          </div>

          <div className="bg-sacred rounded-[2.5rem] border border-sacred overflow-hidden shadow-2xl relative">
              <BookMetadataHeader book={currentBook} chapter={currentChapter} versesCount={verses.length} />

              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden flex items-center justify-center bg-sacred">
                {chapterImg ? (
                  <>
                    <img src={chapterImg} className="w-full h-full object-cover animate-in fade-in duration-1000" alt="IA" />
                    <div className="absolute inset-0 bg-gradient-to-t from-sacred via-transparent to-transparent"></div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-5 p-12">
                    <Loader2 className="animate-spin text-accent" size={32} />
                    <p className="font-black text-[10px] text-sacred-soft uppercase tracking-widest animate-pulse">Revelando Logos...</p>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-16 bg-sacred/30">
                {isLoadingChapter ? (
                  <div className="flex flex-col items-center justify-center gap-6 py-20">
                    <Loader2 className="animate-spin text-accent" size={40} />
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
                    <div className="space-y-8">
                      {verses.map((v) => (
                        <div key={v.number} className="group relative">
                          <p className="text-lg md:text-2xl font-serif leading-relaxed text-sacred group transition-all">
                            <span className="absolute -left-8 md:-left-12 top-1 text-accent/40 font-black text-xs">{v.number}</span>
                            {renderVerseText(v.text)}
                          </p>
                          <button 
                            onClick={() => handleSaveVerse(v)}
                            className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 text-accent transition-all"
                          >
                            <BookmarkPlus size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
          </div>
        </>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 relative">
           <div className="bg-sacred rounded-[2.5rem] border border-sacred overflow-hidden shadow-2xl backdrop-blur-sm p-6 md:p-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                 <h2 className="text-2xl font-black text-sacred uppercase tracking-tighter italic">"{searchResult}"</h2>
                 <button onClick={() => setSearchResult(null)} className="px-6 py-4 bg-sacred border border-sacred text-sacred-soft rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-sacred transition-all">
                    Fechar
                 </button>
              </div>
           </div>
           
           <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar sticky top-24 z-30">
              {THEOLOGICAL_PERSPECTIVES.map(p => (
                <button 
                  key={p.id} 
                  onClick={() => setActivePerspectiveId(p.id)} 
                  className={`px-6 py-4 rounded-xl shrink-0 font-black text-[9px] uppercase tracking-[0.2em] border transition-all ${
                    activePerspectiveId === p.id 
                    ? 'bg-accent border-accent text-sacred shadow-xl scale-105 invert' 
                    : 'bg-sacred border-sacred text-sacred-soft hover:border-accent/40'
                  }`}
                >
                  {p.name}
                </button>
              ))}
           </div>

           <div className="bg-sacred-soft/40 p-8 md:p-16 rounded-[3rem] border border-sacred shadow-2xl">
              {loadingStates[activePerspectiveId] ? (
                 <div className="flex flex-col items-center justify-center h-64 gap-6">
                    <Loader2 className="animate-spin text-accent" size={40} />
                 </div>
              ) : (
                <div className="prose prose-invert max-w-none text-sacred font-serif text-lg md:text-xl leading-relaxed">
                  {perspectiveContent[activePerspectiveId] || "Carregando exegese profunda..."}
                </div>
              )}
           </div>
        </div>
      )}

      {/* MODAL SELETOR */}
      {showSelector && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-sacred/98 backdrop-blur-2xl">
          <div className="bg-sacred-soft border border-sacred w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-sacred flex justify-between items-center">
               <h3 className="text-xl font-black text-sacred uppercase tracking-widest">
                  {selectorStep === 'book' ? 'Cânon Sagrado' : `${currentBook.name}`}
               </h3>
               <button onClick={() => setShowSelector(false)} className="p-4 bg-sacred rounded-2xl text-sacred-soft hover:text-sacred"><X size={24}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
               {selectorStep === 'book' ? (
                 <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {BIBLE_BOOKS.map(book => (
                      <button 
                        key={book.name} 
                        onClick={() => {setCurrentBook(book); setSelectorStep('chapter');}} 
                        className={`p-5 rounded-2xl border text-left transition-all ${currentBook.name === book.name ? 'bg-accent border-accent text-sacred invert' : 'bg-sacred border-sacred hover:border-accent/50'}`}
                      >
                         <span className="font-bold text-sm truncate block">{book.name}</span>
                      </button>
                    ))}
                 </div>
               ) : (
                 <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 gap-3">
                    {Array.from({ length: currentBook.chapters }).map((_, i) => (
                      <button 
                        key={i+1} 
                        onClick={() => {setCurrentChapter(i+1); setShowSelector(false);}} 
                        className={`aspect-square flex items-center justify-center rounded-xl font-black text-sm border transition-all ${currentChapter === i+1 ? 'bg-accent border-accent text-sacred scale-110 invert' : 'bg-sacred border-sacred text-sacred-soft hover:text-sacred'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL LEXICO */}
      {selectedWord && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-sacred/96 backdrop-blur-3xl">
           <div className="bg-sacred-soft border-2 border-accent/20 w-full max-w-2xl p-10 md:p-16 rounded-[3.5rem] shadow-2xl relative">
             <button onClick={() => setSelectedWord(null)} className="absolute top-8 right-8 p-3 text-sacred-soft hover:text-sacred"><X size={24} /></button>
             <h3 className="text-5xl font-serif font-black text-sacred tracking-tighter mb-2 italic">{selectedWord.word}</h3>
             <p className="text-xl italic font-serif text-accent/80 mb-10">{selectedWord.original} • {selectedWord.pronunciation}</p>
             <div className="bg-sacred/50 p-8 rounded-[2rem] border border-sacred mb-10">
                <p className="text-xl text-sacred leading-relaxed font-serif italic">"{selectedWord.definition}"</p>
                <p className="text-xs text-sacred-soft font-bold uppercase tracking-widest mt-6 pt-6 border-t border-sacred/50">Etimologia: {selectedWord.etymology}</p>
             </div>
             <button 
              onClick={() => setSelectedWord(null)}
              className="w-full py-6 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-[0.4em] invert shadow-xl"
             >
               CONCLUIR ANÁLISE
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default BibleReader;
