
import React, { useState } from 'react';
import { StudyItem } from '../types';
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
  Calendar
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
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'All' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleEdit = (item: StudyItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
  };

  const handleSave = () => {
    if (editingId) {
      onUpdate(editingId, { title: editTitle, content: editContent });
      setEditingId(null);
    }
  };

  const exportToWord = (item: StudyItem) => {
    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${item.title}</title>
      <style>
        body { font-family: 'Times New Roman', serif; line-height: 1.6; }
        h1 { color: #f59e0b; text-align: center; font-variant: small-caps; }
        .meta { color: #666; font-size: 10pt; text-align: right; margin-bottom: 20pt; }
        .content { white-space: pre-wrap; margin-top: 10pt; }
      </style>
      </head>
      <body>
        <h1>${item.title.toUpperCase()}</h1>
        <div class="meta">DABAR AI - Scriptorium | ${item.timestamp} | Tipo: ${item.type}</div>
        <div class="content">${item.content}</div>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.title.replace(/\s+/g, '_')}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToPdf = (item: StudyItem) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${item.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;700&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 50px; color: #020617; line-height: 1.8; }
            h1 { font-family: 'Playfair Display', serif; color: #b45309; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; margin-bottom: 5px; font-size: 32pt; }
            .type { font-weight: bold; text-transform: uppercase; color: #f59e0b; letter-spacing: 2px; font-size: 9pt; }
            .meta { color: #64748b; font-size: 10pt; margin-bottom: 40px; }
            .content { font-size: 14pt; color: #1e293b; background: #f8fafc; padding: 30px; border-radius: 15px; border: 1px solid #e2e8f0; }
            .footer { margin-top: 60px; text-align: center; font-size: 8pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="type">${item.type}</div>
          <h1>${item.title}</h1>
          <div class="meta">Registrado no DABAR AI em ${item.timestamp}</div>
          <div class="content">${item.content.replace(/\n/g, '<br>')}</div>
          <div class="footer">Este documento é parte integrante do santuário digital DABAR AI.</div>
          <script>window.print(); setTimeout(window.close, 500);</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleAddNote = () => {
    if (editTitle.trim() && editContent.trim()) {
      onSaveNote({ title: editTitle, content: editContent, type: 'Note' });
      setEditTitle('');
      setEditContent('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl font-black font-serif text-sacred tracking-tighter uppercase italic">Scriptorium</h2>
          <p className="text-sacred-soft text-xl font-medium mt-2 italic">Seu arquivo sagrado de revelações (Dabar).</p>
        </div>
        <div className="flex gap-4">
           <button 
            onClick={() => {setIsAddingNote(true); setEditingId(null); setEditTitle(''); setEditContent('');}}
            className="px-8 py-4 bg-accent text-sacred rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-90 transition-all shadow-accent invert"
           >
             <Plus size={18} /> Nova Nota
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar de Filtros */}
        <div className="w-full md:w-64 space-y-6">
           <div className="bg-sacred-soft border border-sacred p-1 rounded-2xl shadow-inner">
             {['All', 'Verse', 'Research', 'Quote', 'Note'].map(type => (
               <button
                key={type}
                onClick={() => setFilter(type)}
                className={`w-full text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${filter === type ? 'bg-accent text-sacred invert shadow-lg' : 'text-sacred-soft hover:text-sacred'}`}
               >
                 {type === 'All' && <FileText size={14} />}
                 {type === 'Verse' && <BookMarked size={14} />}
                 {type === 'Research' && <Brain size={14} />}
                 {type === 'Quote' && <QuoteIcon size={14} />}
                 {type === 'Note' && <StickyNote size={14} />}
                 {type === 'All' ? 'Todos' : type === 'Verse' ? 'Versículos' : type === 'Research' ? 'Exegeses' : type === 'Quote' ? 'Citações' : 'Notas'}
               </button>
             ))}
           </div>

           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sacred-soft group-focus-within:text-accent transition-colors" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar arquivo..." 
                className="w-full bg-sacred-soft border border-sacred rounded-xl pl-10 pr-4 py-4 text-xs focus:outline-none focus:border-accent text-sacred" 
              />
           </div>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 space-y-6">
          {filteredItems.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-6 opacity-30">
               <div className="w-20 h-20 border-2 border-dashed border-sacred rounded-full flex items-center justify-center">
                  <FileText size={32} />
               </div>
               <p className="text-xs font-black uppercase tracking-widest text-center">Nenhum registro encontrado no Scriptorium DABAR.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
               {filteredItems.map(item => (
                 <div 
                  key={item.id} 
                  className="bg-sacred-soft/40 border border-sacred p-8 rounded-[2.5rem] shadow-xl hover:border-accent/30 transition-all group relative overflow-hidden"
                 >
                   <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-125 transition-transform">
                      {item.type === 'Verse' && <BookMarked size={120} />}
                      {item.type === 'Research' && <Brain size={120} />}
                      {item.type === 'Quote' && <QuoteIcon size={120} />}
                      {item.type === 'Note' && <StickyNote size={120} />}
                   </div>

                   <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                      <div className="space-y-4 flex-1">
                         <div className="flex items-center gap-4">
                            <span className="text-[8px] font-black px-3 py-1 bg-sacred border border-sacred rounded-lg text-accent uppercase tracking-widest">{item.type}</span>
                            <span className="text-[8px] font-black text-sacred-soft flex items-center gap-2 uppercase tracking-widest"><Calendar size={10} /> {item.timestamp}</span>
                         </div>
                         <h3 className="text-2xl font-black text-sacred uppercase tracking-tight italic">{item.title}</h3>
                         <div className="text-sacred-soft leading-relaxed text-sm italic font-serif whitespace-pre-wrap border-l-2 border-sacred/50 pl-6">
                            {item.content}
                         </div>
                      </div>

                      <div className="flex md:flex-col gap-3 shrink-0">
                         <button onClick={() => handleEdit(item)} className="p-4 bg-sacred border border-sacred rounded-2xl text-sacred-soft hover:text-accent hover:border-accent transition-all shadow-lg" title="Editar"><Edit3 size={18} /></button>
                         <button onClick={() => exportToPdf(item)} className="p-4 bg-sacred border border-sacred rounded-2xl text-sacred-soft hover:text-emerald-500 hover:border-emerald-500/50 transition-all shadow-lg" title="Exportar PDF"><FileDown size={18} /></button>
                         <button onClick={() => exportToWord(item)} className="p-4 bg-sacred border border-sacred rounded-2xl text-sacred-soft hover:text-blue-500 hover:border-blue-500/50 transition-all shadow-lg" title="Exportar Word"><Download size={18} /></button>
                         <button onClick={() => onDelete(item.id)} className="p-4 bg-sacred border border-sacred rounded-2xl text-sacred-soft hover:text-crimson hover:border-crimson/50 transition-all shadow-lg" title="Excluir"><Trash2 size={18} /></button>
                      </div>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Editor (Edit & Add) */}
      {(editingId || isAddingNote) && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-sacred/95 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="bg-sacred-soft border-2 border-sacred w-full max-w-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl space-y-8">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Edit3 className="text-accent" size={24} />
                    <h3 className="text-xl font-black text-sacred uppercase tracking-tighter">{isAddingNote ? 'Nova Nota DABAR' : 'Refinar Estudo'}</h3>
                 </div>
                 <button onClick={() => {setEditingId(null); setIsAddingNote(false);}} className="p-3 bg-sacred rounded-xl text-sacred-soft hover:text-sacred"><X size={20}/></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-sacred-soft uppercase tracking-widest ml-1">Título do Estudo</label>
                    <input 
                      type="text" 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Ex: Reflexões sobre a Palavra (Dabar)..."
                      className="w-full bg-sacred border border-sacred rounded-2xl px-6 py-4 text-sacred font-bold focus:outline-none focus:border-accent"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-sacred-soft uppercase tracking-widest ml-1">Conteúdo e Meditações</label>
                    <textarea 
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={8}
                      placeholder="Comece a escrever sua tese ou meditação baseada no Dabar..."
                      className="w-full bg-sacred border border-sacred rounded-3xl px-6 py-6 text-sacred font-medium leading-relaxed focus:outline-none focus:border-accent no-scrollbar"
                    />
                 </div>
              </div>

              <div className="flex justify-end pt-4">
                 <button 
                  onClick={isAddingNote ? handleAddNote : handleSave}
                  className="px-12 py-5 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-[0.4em] flex items-center gap-4 hover:opacity-90 shadow-accent invert"
                 >
                    <Save size={18} /> {isAddingNote ? 'CONSAGRAR NOTA' : 'ATUALIZAR ARQUIVO'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MyStudies;
