
import React, { useState, useRef, useEffect } from 'react';
import { STRONGS_DICTIONARY, THEOLOGICAL_PERSPECTIVES, BIBLE_BOOKS } from '../constants.tsx';
import { getGeminiResponse, generateBibleImage, getBibleVerses } from '../services/gemini.ts';
import { StudyItem, StrongEntry } from '../types.ts';
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
            </div>
          </div>

          <div className="bg-sacred rounded-[2.5rem] border border-sacred overflow-hidden shadow-2xl relative">
              <BookMetadataHeader book={currentBook} chapter={currentChapter} currentVersesCount={verses.length} />
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
           <button onClick={() => setSearchResult(null)} className="px-6 py-4 bg-sacred border border-sacred text-sacred-soft rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-accent transition-all">Voltar para Leitura</button>
        </div>
      )}
    </div>
  );
};

export default BibleReader;
