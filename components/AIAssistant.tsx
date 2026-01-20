
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { StudyItem } from '../types';
import { Send, Bot, User, Sparkles, Wand2, RotateCcw, BookmarkPlus } from 'lucide-react';

interface AIAssistantProps {
  externalPrompt?: string | null;
  clearExternalPrompt?: () => void;
  onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void;
  onActionXp?: (amt: number, reason: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ externalPrompt, clearExternalPrompt, onSave, onActionXp }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Saudações! Eu sou o DABAR AI. Como posso iluminar seu estudo bíblico hoje?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (externalPrompt) {
      const runExternal = async () => {
        await handleSend(externalPrompt);
        if (clearExternalPrompt) clearExternalPrompt();
      };
      runExternal();
    }
  }, [externalPrompt]);

  const handleSend = async (customPrompt?: string) => {
    const textToSubmit = customPrompt || input;
    if (!textToSubmit.trim() || loading) return;

    if (!customPrompt) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSubmit }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ 
        role: m.role, 
        parts: [{ text: m.text }] 
      }));
      
      const response = await getGeminiResponse(textToSubmit, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
      onActionXp?.(40, 'Revelação Recebida');
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Erro ao conectar com o DABAR AI. Tente novamente.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResponse = (text: string) => {
    if (onSave) {
      onSave({
        title: `Orientação DABAR: ${text.substring(0, 30)}...`,
        content: text,
        type: 'Research'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col bg-slate-900/40 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl backdrop-blur-sm">
      <div className="p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h2 className="font-black text-slate-100 uppercase tracking-widest text-sm">Mentor DABAR AI</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase">Teologia Ativa em Tempo Real</p>
          </div>
        </div>
        <button onClick={() => {
          setMessages([{ role: 'model', text: 'Estudo reiniciado.' }]);
          onActionXp?.(5, 'Reconfiguração Mentora');
        }} className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white"><RotateCcw size={18} /></button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-700 ${msg.role === 'user' ? 'bg-slate-800' : 'bg-indigo-600'}`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className="relative group">
                <div className={`p-6 rounded-[1.5rem] text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-100 border border-slate-700'
                }`}>
                  {msg.text}
                </div>
                {msg.role === 'model' && idx > 0 && (
                  <button 
                    onClick={() => handleSaveResponse(msg.text)}
                    className="absolute -right-12 top-2 opacity-0 group-hover:opacity-100 text-indigo-400 hover:text-white transition-all"
                    title="Salvar no Scriptorium"
                  >
                    <BookmarkPlus size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="p-6 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-slate-400 font-black uppercase tracking-widest">
              Consultando a Palavra (DABAR)...
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-900/80 border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Aprofunde seu conhecimento com o DABAR AI..."
            className="w-full bg-slate-800/50 text-slate-100 rounded-2xl pl-6 pr-32 py-5 border-2 border-slate-700 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase shadow-lg disabled:opacity-50"
          >
            <Send size={16} className="inline mr-2" /> Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
