
import React, { useState, useRef, useEffect } from 'react';
import { STRONGS_DICTIONARY, THEOLOGICAL_PERSPECTIVES, BIBLE_BOOKS } from '../constants';
import { getGeminiResponse, generateBibleImage, getBibleVerses } from '../services/gemini';
import { StudyItem, StrongEntry } from '../types';
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
  BookmarkPlus,
  PenTool,
  Calendar,
  Layers,
  FileText,
  Hash
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

  const [showSelector, setShowSelector] = useState(false);
  const [selectorStep, setSelectorStep] = useState<'book' | 'chapter'>('book');

  useEffect(() => {
    const loadChapterData = async () => {
      setIsLoadingChapter(true);
      setChapterImg(null); 
      try {
        const data = await getBibleVerses(currentBook.name, currentChapter, translation);
        setVerses(data || []);
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

  const detectBookInQuery = (query: string) => {
    const q = query.toLowerCase();
    for (const book of BIBLE_BOOKS) {
      if (q.includes(book.name.toLowerCase())) return book;
    }
    return null;
  };

  const handleGlobalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSearch.trim() || isSearching) return;

    const query = globalSearch;
    setIsSearching(true);
    setSearchResult(query);
    setPerspectiveContent({});
    setGeneratedImg(null);
    onActionXp?.(30, 'Lançando Exegese');
    
    const detected = detectBookInQuery(query);
    if (detected) {
      setCurrentBook(detected);
      const match = query.match(/\d+/);
      if (match) setCurrentChapter(parseInt(match[0]));
    }

    generateBibleImage(query).then(img => setGeneratedImg(img));

    THEOLOGICAL_PERSPECTIVES.forEach(async (perspective) => {
      setLoadingStates(prev => ({ ...prev, [perspective.id]: true }));
      try {
        const prompt = `Como a ${perspective.name} interpreta o assunto "${query}"? Forneça uma análise profunda e acadêmica.`;
        const response = await getGeminiResponse(prompt);
        setPerspectiveContent(prev => ({ ...prev, [perspective.id]: response }));
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

  // Fixed renderVerseText: Cast dictionaryEntries to StrongEntry[] to avoid 'unknown' type error.
  const renderVerseText = (text: string) => {
    const dictionaryEntries = Object.values(STRONGS_DICTIONARY) as StrongEntry[];
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

  const BookMetadataHeader = ({ book, chapter, isStudyMode = false, currentVersesCount = 0 }: { book: any, chapter?: number, isStudyMode?: boolean, currentVersesCount?: number }) => {
    const isPsalms = book.name.toLowerCase() === 'salmos';
    return (
      <div className="bg-sacred-soft/60 p-6 md:p-10 border-b border-sacred relative overflow-hidden backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-accent/20 border border-accent/30 text-accent rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={10} /> {book.genre}
              </span>
              <span className="px-3 py-1 bg-sacred border border-sacred text-sacred-soft rounded-lg text-[9px] font-black uppercase tracking-widest">
                Livro {book.position}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-sacred italic tracking-tighter leading-none">
              {book.name}{!isStudyMode && chapter ? ` ${chapter}` : ''}
              {isStudyMode && <span className="text-accent ml-4 text-2xl md:text-4xl animate-pulse italic">Exegese</span>}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 pt-4 border-t border-sacred/50">
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-accent">
                    <PenTool size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Autor</span>
                  </div>
                  <span className="text-xs font-bold text-sacred">{book.author}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-accent">
                    <Calendar size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Escrito em</span>
                  </div>
                  <span className="text-xs font-bold text-sacred">{book.year}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-accent">
                    <Library size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-50">{isPsalms ? 'Total Salmos' : 'Total Cap.'}</span>
                  </div>
                  <span className="text-xs font-bold text-sacred">{book.chapters}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-accent">
                    <Hash size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Versículos</span>
                  </div>
                  <span className="text-xs font-bold text-sacred">{currentVersesCount || verses.length}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-accent">
                    <FileText size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Total Livro</span>
                  </div>
                  <span className="text-xs font-bold text-sacred">{book.verses.toLocaleString()}</span>
               </div>
            </div>
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
              placeholder="Pesquisar exegese (ex: Gênesis 1)..." 
              className="w-full bg-sacred border border-sacred rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-accent text-sacred font-medium"
            />
          </div>
          <button type="submit" disabled={isSearching} className="px-6 py-3.5 bg-accent text-sacred rounded-xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 invert">
            {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            ESTUDAR
          </button>
        </form>
      </div>

      {!searchResult ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-30">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button onClick={() => {setShowSelector(true); setSelectorStep('book');}} className="flex-1 md:flex-none flex items-center justify-between gap-4 px-6 py-4 bg-sacred-soft border border-sacred rounded-xl hover:border-accent transition-all">
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
              <BookMetadataHeader book={currentBook} chapter={currentChapter} currentVersesCount={verses.length} />
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden flex items-center justify-center bg-sacred">
                {chapterImg ? <img src={chapterImg} className="w-full h-full object-cover animate-in fade-in duration-1000" alt="IA" /> : <Loader2 className="animate-spin text-accent" size={32} />}
              </div>
              <div className="p-6 md:p-16 bg-sacred/30">
                {isLoadingChapter ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-accent" size={40} /></div> : (
                  <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
                    <div className="space-y-8">
                      {verses.map((v) => (
                        <div key={v.number} className="group relative">
                          <p className="text-lg md:text-2xl font-serif leading-relaxed text-sacred transition-all">
                            <span className="absolute -left-8 md:-left-12 top-1 text-accent/40 font-black text-xs">{v.number}</span>
                            {renderVerseText(v.text)}
                          </p>
                          <button 
                            onClick={() => handleSaveVerse(v)}
                            className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 text-accent transition-all hover:scale-125"
                            title="Salvar Versículo"
                          >
                            <BookmarkPlus size={22} />
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
        <div className="space-y-8">
           <div className="bg-sacred rounded-[2.5rem] border border-sacred overflow-hidden shadow-2xl backdrop-blur-sm">
              <BookMetadataHeader book={currentBook} chapter={currentChapter} isStudyMode={true} />
              <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
                 <h2 className="text-2xl font-black text-sacred uppercase tracking-tighter italic">Resultados: "{searchResult}"</h2>
                 <button onClick={() => setSearchResult(null)} className="px-6 py-4 bg-sacred border border-sacred text-sacred-soft rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-sacred transition-all">Voltar para Leitura</button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL SELETOR */}
      {showSelector && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-sacred/98 backdrop-blur-2xl">
          <div className="bg-sacred-soft border border-sacred w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-sacred flex justify-between items-center">
               <h3 className="text-xl font-black text-sacred uppercase tracking-widest">{selectorStep === 'book' ? 'Cânon Sagrado' : `${currentBook.name}`}</h3>
               <button onClick={() => setShowSelector(false)} className="p-4 bg-sacred rounded-2xl text-sacred-soft hover:text-sacred"><X size={24}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
               {selectorStep === 'book' ? (
                 <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {BIBLE_BOOKS.map(book => (
                      <button key={book.name} onClick={() => {setCurrentBook(book); setSelectorStep('chapter');}} className={`p-5 rounded-2xl border text-left transition-all ${currentBook.name === book.name ? 'bg-accent border-accent text-sacred invert' : 'bg-sacred border-sacred hover:border-accent/50'}`}>
                         <span className="font-bold text-sm truncate block">{book.name}</span>
                      </button>
                    ))}
                 </div>
               ) : (
                 <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 gap-3">
                    {Array.from({ length: currentBook.chapters }).map((_, i) => (
                      <button key={i+1} onClick={() => {setCurrentChapter(i+1); setShowSelector(false);}} className={`aspect-square flex items-center justify-center rounded-xl font-black text-sm border transition-all ${currentChapter === i+1 ? 'bg-accent border-accent text-sacred scale-110 invert' : 'bg-sacred border-sacred text-sacred-soft hover:text-sacred'}`}>{i + 1}</button>
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
             <button onClick={() => setSelectedWord(null)} className="w-full py-6 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-[0.4em] invert shadow-xl">CONCLUIR ANÁLISE</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default BibleReader;
