
import React, { useState, useEffect } from 'react';
import { StudyItem } from '../types';
import { getScriptoriumInsights } from '../services/gemini';
import { 
  FileText, 
  Trash2, 
  Download, 
  FileDown, 
  Search, 
  Edit3, 
  Save, 
  X, 
  BookMarked, 
  Brain, 
  Quote as QuoteIcon, 
  StickyNote,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  Link as LinkIcon,
  Loader2,
  Library,
  Network,
  Type as FontIcon,
  Tag,
  FileBadge
} from 'lucide-react';

interface MyStudiesProps {
  items: StudyItem[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StudyItem>) => void;
  onSaveNote: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
}

const MyStudies: React.FC<MyStudiesProps> = ({ items, onDelete, onUpdate, onSaveNote }) => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editType, setEditType] = useState<StudyItem['type']>('Note');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [insights, setInsights] = useState<any>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'All' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedItem = items.find(i => i.id === selectedId);

  const handleSelectItem = async (item: StudyItem) => {
    setSelectedId(item.id);
    setInsights(null);
    setIsLoadingInsights(true);
    
    const historySummary = items
      .filter(i => i.id !== item.id)
      .slice(0, 5)
      .map(i => i.title)
      .join(', ');

    try {
      const result = await getScriptoriumInsights(`Nota atual: ${item.content}. Histórico do usuário: ${historySummary}.`);
      setInsights(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleEdit = (item: StudyItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditType(item.type);
    setIsAddingNote(true);
  };

  const handleSave = () => {
    if (!editTitle.trim() || !editContent.trim()) return;

    if (editingId) {
      onUpdate(editingId, { title: editTitle, content: editContent, type: editType });
    } else {
      onSaveNote({
        title: editTitle,
        content: editContent,
        type: editType
      });
    }
    closeEditor();
  };

  const closeEditor = () => {
    setIsAddingNote(false);
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
    setEditType('Note');
  };

  const exportToPdf = (item: StudyItem) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${item.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
            body { font-family: 'Playfair Display', serif; padding: 60px; line-height: 1.8; color: #0f172a; background: #fff; }
            .header { border-bottom: 3px solid #f59e0b; padding-bottom: 20px; margin-bottom: 40px; }
            .meta { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; font-weight: bold; margin-bottom: 10px; }
            h1 { font-size: 36px; margin: 0; color: #1e293b; italic: true; }
            .content { font-size: 18px; white-space: pre-wrap; font-style: italic; color: #334155; }
            .footer { margin-top: 60px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 10px; color: #94a3b8; text-align: center; letter-spacing: 3px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="meta">DABAR AI SCRIPTORIUM • ${item.type} • ${item.timestamp}</div>
            <h1>${item.title}</h1>
          </div>
          <div class="content">${item.content}</div>
          <div class="footer">DOCUMENTO CONSAGRADO - DABAR AI O LOGOS DIGITAL</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const exportToWord = (item: StudyItem) => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${item.title}</title></head>
      <body style="font-family: 'Times New Roman', serif;">
        <p style="font-size: 10pt; color: #666;">DABAR AI SCRIPTORIUM | ${item.type} | ${item.timestamp}</p>
        <h1 style="color: #1e293b;">${item.title}</h1>
        <hr/>
        <p style="font-style: italic; font-size: 12pt;">${item.content.replace(/\n/g, '<br/>')}</p>
        <br/><br/>
        <p style="font-size: 8pt; color: #999; text-align: center;">Gerado via DABAR AI - O Logos Digital</p>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.title.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-sacred-soft/30 p-10 rounded-[4rem] border border-sacred shadow-xl">
        <div>
          <h2 className="text-5xl md:text-7xl font-black font-serif text-sacred tracking-tighter uppercase italic leading-none">Scriptorium</h2>
          <p className="text-sacred-soft text-xl font-medium mt-4 italic max-w-lg">Onde a Palavra se torna sua história pessoal de revelação.</p>
        </div>
        <button 
          onClick={() => {setIsAddingNote(true); setEditingId(null); setEditTitle(''); setEditContent(''); setEditType('Note');}}
          className="px-10 py-5 bg-accent text-sacred rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:opacity-90 transition-all shadow-accent invert"
        >
          <Plus size={20} /> Nova Revelação
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-sacred-soft border-2 border-sacred p-2 rounded-[2.5rem] shadow-inner overflow-hidden">
             {['All', 'Verse', 'Research', 'Note', 'Atlas', 'Debate', 'Connection'].map(type => (
               <button
                key={type}
                onClick={() => setFilter(type)}
                className={`w-full text-left px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-4 ${filter === type ? 'bg-accent text-sacred invert shadow-lg' : 'text-sacred-soft hover:text-sacred hover:bg-sacred/40'}`}
               >
                 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
                 {type === 'All' ? 'Arquivos Totais' : type}
               </button>
             ))}
           </div>
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-sacred-soft group-focus-within:text-accent transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Perscrutar notas..." 
                className="w-full bg-sacred-soft border-2 border-sacred rounded-[2rem] pl-14 pr-6 py-5 text-sm focus:outline-none focus:border-accent text-sacred shadow-xl" 
              />
           </div>
        </div>

        <div className="lg:col-span-6 space-y-8">
           {filteredItems.length > 0 ? filteredItems.map(item => (
             <div 
              key={item.id} 
              onClick={() => handleSelectItem(item)}
              className={`bg-sacred-soft/40 border-2 p-10 rounded-[3.5rem] shadow-2xl transition-all cursor-pointer group relative overflow-hidden ${selectedId === item.id ? 'border-accent ring-4 ring-accent/10' : 'border-sacred hover:border-accent/40'}`}
             >
               <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-sacred/30 pb-4">
                    <span className="text-[10px] font-black px-4 py-1.5 bg-sacred border border-sacred rounded-full text-accent uppercase tracking-[0.2em]">{item.type}</span>
                    <span className="text-[9px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2">
                       <Calendar size={12} /> {item.timestamp}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-sacred uppercase tracking-tighter italic leading-tight group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-sacred-soft text-lg italic font-serif line-clamp-4 leading-relaxed border-l-4 border-accent/20 pl-8">{item.content}</p>
                  
                  <div className="flex flex-wrap gap-4 pt-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                     <button onClick={(e) => { e.stopPropagation(); handleEdit(item); }} className="px-5 py-3 bg-sacred border border-sacred rounded-2xl text-sacred-soft hover:text-accent hover:border-accent transition-all flex items-center gap-2 text-[10px] font-black uppercase"><Edit3 size={14}/> Editar</button>
                     <button onClick={(e) => { e.stopPropagation(); exportToPdf(item); }} className="px-5 py-3 bg-sacred border border-emerald-500/20 rounded-2xl text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase"><FileDown size={14}/> PDF</button>
                     <button onClick={(e) => { e.stopPropagation(); exportToWord(item); }} className="px-5 py-3 bg-sacred border border-blue-500/20 rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase"><FileText size={14}/> Word</button>
                     <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="px-5 py-3 bg-sacred border border-rose-500/20 rounded-2xl text-rose-500 hover:text-white hover:bg-rose-500 transition-all flex items-center gap-2 text-[10px] font-black uppercase"><Trash2 size={14}/> Apagar</button>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-accent group-hover:scale-110 transition-transform">
                  <Library size={150} />
               </div>
             </div>
           )) : (
             <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                <FileText size={80} className="text-sacred-soft" />
                <p className="text-xl font-serif italic text-sacred-soft uppercase tracking-widest">Nenhuma revelação catalogada nesta categoria.</p>
             </div>
           )}
        </div>

        <div className="lg:col-span-3">
           <div className="bg-gradient-to-br from-sacred-soft to-sacred border-2 border-sacred rounded-[3.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] sticky top-24 min-h-[550px] flex flex-col relative overflow-hidden">
              <h4 className="text-[10px] font-black text-sacred-soft uppercase tracking-[0.4em] mb-12 flex items-center gap-4 relative z-10">
                 <Sparkles className="text-accent animate-pulse" size={18} /> Epifanias Semânticas
              </h4>
              
              {selectedItem && (
                 <div className="mb-10 p-6 bg-sacred/40 border border-sacred rounded-3xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 relative z-10">
                    <p className="text-[9px] font-black text-accent uppercase tracking-widest">Ações de Exportação</p>
                    <div className="grid grid-cols-2 gap-3">
                       <button 
                        onClick={() => exportToPdf(selectedItem)}
                        className="flex flex-col items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                       >
                          <FileDown size={20} />
                          <span className="text-[8px] font-black uppercase">Gerar PDF</span>
                       </button>
                       <button 
                        onClick={() => exportToWord(selectedItem)}
                        className="flex flex-col items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                       >
                          <FileText size={20} />
                          <span className="text-[8px] font-black uppercase">Gerar Word</span>
                       </button>
                    </div>
                 </div>
              )}

              {isLoadingInsights ? (
                 <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center animate-in fade-in">
                    <Loader2 className="animate-spin text-accent" size={48} />
                    <p className="text-[10px] font-black text-sacred-soft uppercase tracking-[0.3em]">Cruzando seu Histórico Teológico...</p>
                 </div>
              ) : insights ? (
                 <div className="space-y-10 animate-in slide-in-from-right-8 duration-700 relative z-10">
                    <div className="space-y-4 group">
                       <div className="flex items-center gap-3 text-accent group-hover:scale-105 transition-transform origin-left">
                          <LinkIcon size={16} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Teia do Cânon</span>
                       </div>
                       <p className="text-sm text-sacred font-bold font-serif italic leading-relaxed border-l-2 border-accent/30 pl-6">{insights["Conexão Bíblica"]}</p>
                    </div>

                    <div className="space-y-4 group">
                       <div className="flex items-center gap-3 text-indigo-400 group-hover:scale-105 transition-transform origin-left">
                          <Library size={16} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Voz dos Séculos</span>
                       </div>
                       <p className="text-sm text-sacred font-bold font-serif italic leading-relaxed border-l-2 border-indigo-400/30 pl-6">{insights["Eco Histórico"]}</p>
                    </div>

                    <div className="space-y-4 group">
                       <div className="flex items-center gap-3 text-emerald-400 group-hover:scale-105 transition-transform origin-left">
                          <Network size={16} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sincronia Pessoal</span>
                       </div>
                       <p className="text-xs text-sacred-soft font-bold uppercase tracking-widest leading-relaxed opacity-70 italic">
                          "DABAR AI: Esta nota se conecta ao seu estudo anterior sobre '{insights["Raiz Original"]}'."
                       </p>
                    </div>
                 </div>
              ) : (
                 <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center opacity-20">
                    <BookMarked size={60} className="text-accent" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] max-w-[150px]">Selecione um pergaminho para despertar o Mentor IA.</p>
                 </div>
              )}
           </div>
        </div>
      </div>

      {/* MODAL EDITOR DE NOTAS (CÓDICE) */}
      {isAddingNote && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-sacred/95 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="bg-sacred-soft border-2 border-sacred w-full max-w-4xl rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]">
              
              <div className="p-10 border-b border-sacred flex justify-between items-center bg-sacred/20">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center text-sacred shadow-accent invert">
                       <StickyNote size={32} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-sacred uppercase tracking-tighter italic">
                          {editingId ? 'Refinar Revelação' : 'Nova Revelação'}
                       </h3>
                       <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">Códice de Escrita DABAR</p>
                    </div>
                 </div>
                 <button onClick={closeEditor} className="p-4 bg-sacred rounded-2xl text-sacred-soft hover:text-white transition-all">
                    <X size={28} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 md:p-16 space-y-10 no-scrollbar">
                 <div className="space-y-4">
                    <label className="flex items-center gap-3 text-[10px] font-black text-sacred-soft uppercase tracking-widest ml-4">
                       <FontIcon size={14} className="text-accent" /> Título do Pergaminho
                    </label>
                    <input 
                      type="text" 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Ex: Reflexão sobre a Graça em Efésios 2"
                      className="w-full bg-sacred border-2 border-sacred rounded-3xl px-10 py-6 text-2xl font-black text-sacred focus:outline-none focus:border-accent italic tracking-tighter transition-all"
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="flex items-center gap-3 text-[10px] font-black text-sacred-soft uppercase tracking-widest ml-4">
                          <Tag size={14} className="text-accent" /> Categoria Teológica
                       </label>
                       <select 
                         value={editType}
                         onChange={(e) => setEditType(e.target.value as any)}
                         className="w-full bg-sacred border-2 border-sacred rounded-3xl px-8 py-5 text-sm font-black text-sacred uppercase tracking-widest focus:outline-none focus:border-accent"
                       >
                          <option value="Note">Nota Pessoal</option>
                          <option value="Research">Pesquisa Acadêmica</option>
                          <option value="Verse">Exegese de Versículo</option>
                          <option value="Debate">Relato de Debate</option>
                       </select>
                    </div>
                    <div className="flex items-center justify-end">
                       <div className="p-4 bg-sacred rounded-2xl border border-sacred text-sacred-soft text-[10px] font-black uppercase tracking-widest">
                          Caracteres: {editContent.length}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="flex items-center gap-3 text-[10px] font-black text-sacred-soft uppercase tracking-widest ml-4">
                       <Edit3 size={14} className="text-accent" /> Corpo da Revelação
                    </label>
                    <textarea 
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder="Escreva sua revelação aqui... A Memória Semântica processará seu conteúdo após salvar."
                      className="w-full bg-sacred border-2 border-sacred rounded-[3rem] p-10 text-xl font-serif italic text-sacred leading-relaxed min-h-[400px] focus:outline-none focus:border-accent transition-all resize-none"
                    />
                 </div>
              </div>

              <div className="p-10 border-t border-sacred bg-sacred/20">
                 <button 
                  onClick={handleSave}
                  className="w-full py-6 bg-accent text-sacred rounded-3xl font-black text-xs uppercase tracking-[0.5em] invert shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-4"
                 >
                    <Save size={24} /> CONSAGRAR NO SCRIPTORIUM
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MyStudies;
