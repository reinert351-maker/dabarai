
import React, { useState, useEffect, useRef } from 'react';
import { COMMUNITY_MESSAGES } from '../constants';
import { 
  MessageCircle, 
  Send, 
  Users, 
  Heart, 
  MoreHorizontal, 
  Search,
  Check,
  Zap,
  Phone,
  Video,
  Smile,
  Globe,
  Paperclip,
  Sparkles,
  ChevronLeft,
  BellOff,
  Trash2,
  ShieldAlert,
  UserPlus,
  X,
  VolumeX,
  ShieldCheck
} from 'lucide-react';
import { Message } from '../types';

const GROUPS = [
  { id: 'general', name: 'Lobby Geral - Conversa Livre', members: 1542, icon: '🌟', lastMsg: 'Bem-vindo ao centro do Logos!' },
  { id: 'romans', name: 'Exegese de Romanos 8', members: 243, icon: '📜', lastMsg: 'O termo Abba é fascinante...' },
  { id: 'greek', name: 'Grego Koiné I', members: 89, icon: 'Ω', lastMsg: 'O particípio no v. 28 indica...' },
  { id: 'reformed', name: 'Teologia Reformada', members: 156, icon: '📖', lastMsg: 'A soberania de Deus é o pilar...' },
  { id: 'patristic', name: 'Pais da Igreja', members: 72, icon: '🏛️', lastMsg: 'Lendo Santo Agostinho hoje...' },
];

const DIRECT_MESSAGES = [
  { id: 'dm1', name: 'Pastor André', status: 'online', avatar: 'https://i.pravatar.cc/150?u=andre', lastMsg: 'Pode me enviar o PDF de Grudem?' },
  { id: 'dm2', name: 'Maria Silva', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=maria', lastMsg: 'Amém! Vou orar por isso.' },
  { id: 'dm3', name: 'Prof. Lucas', status: 'online', avatar: 'https://i.pravatar.cc/150?u=lucas', lastMsg: 'A aula de amanhã será sobre o Logos.' },
];

const INITIAL_CONTENT: Record<string, Message[]> = {
  general: [
    { id: 'gen1', user: 'Logos Bot', text: 'Este é o Lobby Geral! Sinta-se à vontade para compartilhar reflexões com todos os usuários da plataforma.', timestamp: 'Hoje', avatar: 'https://i.pravatar.cc/150?u=bot' },
    { id: 'gen2', user: 'Carlos M.', text: 'Alguém estudando o Pentateuco agora?', timestamp: '12:30', avatar: 'https://i.pravatar.cc/150?u=carlos' }
  ],
  romans: [...COMMUNITY_MESSAGES],
  greek: [
    { id: 'g1', user: 'Prof. Lucas', text: 'Bom dia! Hoje vamos analisar o particípio no v. 28.', timestamp: '08:00', avatar: 'https://i.pravatar.cc/150?u=lucas' },
    { id: 'g2', user: 'Ana Paula', text: 'Professor, esse aspecto verbal indica ação contínua?', timestamp: '08:15', avatar: 'https://i.pravatar.cc/150?u=ana' }
  ],
  dm1: [
    { id: 'd1', user: 'Pastor André', text: 'Olá irmão! Conseguiu avançar no estudo de ontem?', timestamp: 'Ontem', avatar: 'https://i.pravatar.cc/150?u=andre' },
    { id: 'd2', user: 'Você', text: 'Sim, Pastor! Romanos 8 é inesgotável.', timestamp: '10:00', avatar: 'https://i.pravatar.cc/150?u=me' }
  ]
};

interface CommunityProps {
  onActionXp?: (amt: number, reason: string) => void;
}

const Community: React.FC<CommunityProps> = ({ onActionXp }) => {
  const [chatType, setChatType] = useState<'groups' | 'direct'>('groups');
  const [activeChatId, setActiveChatId] = useState('general');
  const [showSidebar, setShowSidebar] = useState(true);
  const [groupMessages, setGroupMessages] = useState<Record<string, Message[]>>(INITIAL_CONTENT);
  const [mutedChats, setMutedChats] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChatTypeChange = (type: 'groups' | 'direct') => {
    setChatType(type);
    setActiveChatId(type === 'groups' ? 'general' : DIRECT_MESSAGES[0].id);
    setShowMoreMenu(false);
  };

  const activeChat = chatType === 'groups' 
    ? GROUPS.find(g => g.id === activeChatId) || GROUPS[0]
    : DIRECT_MESSAGES.find(dm => dm.id === activeChatId) || DIRECT_MESSAGES[0];

  const currentMessages = groupMessages[activeChatId] || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages, activeChatId]);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setShowSidebar(false);
    setShowMoreMenu(false);
    onActionXp?.(2, 'Acesso ao Concílio');
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const messageText = input.trim();
    if (!messageText) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'Você',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://i.pravatar.cc/150?u=me'
    };
    
    setGroupMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));
    
    setInput('');
    onActionXp?.(5, 'Edificação Mútua');

    if (chatType === 'direct') {
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          user: activeChat.name,
          text: 'Amém! Recebi sua mensagem. Que o Logos te guie.',
          timestamp: 'Agora',
          avatar: (activeChat as any).avatar || 'https://i.pravatar.cc/150?u=bot'
        };
        setGroupMessages(prev => ({
          ...prev,
          [activeChatId]: [...(prev[activeChatId] || []), reply]
        }));
      }, 1500);
    }
  };

  const handleVideoCall = () => {
    onActionXp?.(15, 'Koinonia por Vídeo');
    const systemMsg: Message = {
      id: `sys-${Date.now()}`,
      user: 'SISTEMA',
      text: `Iniciando Conferência Ministerial com ${activeChat.name}... Aguardando conexão.`,
      timestamp: 'Agora',
      avatar: 'https://i.pravatar.cc/150?u=system'
    };
    setGroupMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), systemMsg]
    }));
  };

  const handleMenuAction = (actionId: string) => {
    setShowMoreMenu(false);
    
    switch (actionId) {
      case 'mute':
        if (mutedChats.includes(activeChatId)) {
          setMutedChats(prev => prev.filter(id => id !== activeChatId));
          onActionXp?.(2, 'Concílio Reativado');
        } else {
          setMutedChats(prev => [...prev, activeChatId]);
          onActionXp?.(2, 'Concílio Silenciado');
        }
        break;
      
      case 'clear':
        if (confirm("Deseja realmente limpar o histórico deste concílio?")) {
           setGroupMessages(prev => ({
             ...prev,
             [activeChatId]: [
               { id: `clear-${Date.now()}`, user: 'SISTEMA', text: 'O histórico deste concílio foi purificado.', timestamp: 'Agora', avatar: 'https://i.pravatar.cc/150?u=system' }
             ]
           }));
           onActionXp?.(10, 'Purificação de Histórico');
        }
        break;

      case 'report':
        const reportMsg: Message = {
          id: `report-${Date.now()}`,
          user: 'SISTEMA',
          text: `ALERTA: Denúncia de heresia registrada. Os Inquisidores do Logos analisarão as últimas mensagens deste concílio.`,
          timestamp: 'Agora',
          avatar: 'https://i.pravatar.cc/150?u=inquisition'
        };
        setGroupMessages(prev => ({
          ...prev,
          [activeChatId]: [...(prev[activeChatId] || []), reportMsg]
        }));
        onActionXp?.(20, 'Zelo Doutrinário');
        break;

      case 'members':
        // Fix: Use property check for 'members' on the union type before access
        const memberCount = 'members' in activeChat ? activeChat.members : 0;
        alert(`Membros Ativos em ${activeChat.name}:\n- Pastor André\n- Maria Silva\n- Prof. Lucas\n- Você\n- +${Math.max(0, memberCount - 4)} outros...`);
        break;
    }
  };

  const menuActions = [
    { id: 'mute', label: mutedChats.includes(activeChatId) ? 'Reativar Notificações' : 'Silenciar Concílio', icon: BellOff, color: 'text-slate-400' },
    { id: 'clear', label: 'Limpar Histórico', icon: Trash2, color: 'text-slate-400' },
    { id: 'members', label: 'Ver Membros', icon: Users, color: 'text-slate-400' },
    { id: 'report', label: 'Denunciar Heresia', icon: ShieldAlert, color: 'text-rose-500' },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden animate-in fade-in duration-700 bg-slate-950">
      
      {/* 📱 SIDEBAR DE CONVERSAS */}
      <div className={`${showSidebar ? 'flex' : 'hidden'} lg:flex w-full lg:w-[350px] flex-col border-r border-slate-800 bg-slate-900/50 shrink-0 h-full`}>
         <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-black text-white mb-6 tracking-tighter flex items-center gap-3">
               <Globe className="text-amber-500" size={20} /> COMUNIDADE
            </h2>
            <div className="flex bg-slate-800/50 p-1 rounded-2xl border border-slate-700 mb-4">
              <button onClick={() => handleChatTypeChange('groups')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chatType === 'groups' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Concílios</button>
              <button onClick={() => handleChatTypeChange('direct')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chatType === 'direct' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Mensagens</button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <input type="text" placeholder="Filtrar..." className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-amber-500/50" />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
            {(chatType === 'groups' ? GROUPS : DIRECT_MESSAGES).map((item: any) => (
              <button 
                key={item.id} 
                onClick={() => handleSelectChat(item.id)} 
                className={`w-full flex items-center gap-4 p-4 rounded-[2rem] border transition-all text-left group ${
                  activeChatId === item.id 
                  ? 'bg-amber-500/10 border-amber-500/30' 
                  : 'border-transparent hover:bg-slate-800/40'
                }`}
              >
                {chatType === 'groups' ? (
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${activeChatId === item.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {item.icon}
                  </div>
                ) : (
                  <div className="relative shrink-0">
                    <img src={item.avatar} className="w-12 h-12 rounded-2xl border border-slate-800" alt="" />
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${item.status === 'online' ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-2">
                       <span className={`text-[11px] font-black uppercase truncate ${activeChatId === item.id ? 'text-amber-500' : 'text-slate-100'}`}>{item.name}</span>
                       {mutedChats.includes(item.id) && <VolumeX size={10} className="text-slate-600" />}
                    </div>
                    {/* Fix: Property 'members' does not exist on type union. Narrow with 'in' operator. */}
                    <span className="text-[9px] text-slate-600 font-bold shrink-0">{'members' in item ? `${item.members}` : ''}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{item.lastMsg}</p>
                </div>
              </button>
            ))}
         </div>
      </div>

      {/* 💬 CHAT PRINCIPAL */}
      <div className={`${!showSidebar ? 'flex' : 'hidden'} lg:flex flex-1 flex flex-col min-w-0 bg-slate-950 relative h-full`}>
        
        {/* Header do Chat */}
        <header className="px-4 py-3 md:px-6 md:py-6 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between shrink-0 z-50 backdrop-blur-md relative">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
             <button onClick={() => setShowSidebar(true)} className="lg:hidden p-2 text-slate-400 hover:text-white"><ChevronLeft size={24} /></button>

             {chatType === 'groups' ? (
               <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-xl ${activeChatId === 'general' ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-800 text-amber-500'}`}>
                 {(activeChat as any).icon}
               </div>
             ) : (
               <img src={(activeChat as any).avatar} className="w-10 h-10 md:w-14 md:h-14 rounded-2xl border-2 border-amber-500/20 shadow-xl" alt="" />
             )}
             <div className="min-w-0">
               <div className="flex items-center gap-2">
                  <h2 className="text-sm md:text-2xl font-black text-white uppercase tracking-tighter leading-none truncate">{activeChat.name}</h2>
                  {mutedChats.includes(activeChatId) && <VolumeX size={14} className="text-amber-500/50" />}
               </div>
               <div className="flex items-center gap-2 mt-1 md:mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase tracking-widest truncate">Ativo Agora</p>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2 relative" ref={menuRef}>
             <button 
               onClick={handleVideoCall}
               className="p-2.5 md:p-3 bg-slate-800/50 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-all hover:bg-slate-700 active:scale-95"
               title="Chamada de Vídeo"
             >
                <Video size={18} />
             </button>
             
             <button 
               onClick={() => setShowMoreMenu(!showMoreMenu)}
               className={`p-2.5 md:p-3 rounded-xl border transition-all active:scale-95 ${showMoreMenu ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-lg' : 'bg-slate-800/50 text-slate-400 hover:text-white border-slate-700'}`}
               title="Mais Opções"
             >
                <MoreHorizontal size={18} />
             </button>

             {/* MENU DROPDOWN REAL */}
             {showMoreMenu && (
               <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Concílio DABAR</span>
                    <button onClick={() => setShowMoreMenu(false)} className="text-slate-600 hover:text-white transition-colors"><X size={14} /></button>
                  </div>
                  <div className="p-2">
                    {menuActions.map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <button 
                          key={i}
                          onClick={() => handleMenuAction(action.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition-colors text-left group"
                        >
                          <Icon size={16} className={`${action.color} group-hover:scale-110 transition-transform`} />
                          <span className="text-xs font-black text-slate-200 uppercase tracking-tight">{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-3 bg-slate-950/50">
                    <button className="w-full py-2 bg-slate-800 rounded-xl text-[8px] font-black text-slate-500 uppercase tracking-widest hover:text-amber-500 transition-colors">
                      Adicionar ao Scriptorium
                    </button>
                  </div>
               </div>
             )}
          </div>
        </header>

        {/* Área de Mensagens */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth no-scrollbar relative">
           <div className="absolute top-0 left-0 w-full h-16 md:h-32 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10"></div>
           
           {currentMessages.map((msg) => (
             <div key={msg.id} className={`flex gap-3 md:gap-5 group animate-in ${msg.user === 'Você' ? 'flex-row-reverse slide-in-from-right-4' : msg.user === 'SISTEMA' ? 'justify-center slide-in-from-top-2' : 'flex-row slide-in-from-left-4'}`}>
                {msg.user !== 'Você' && msg.user !== 'SISTEMA' && <img src={msg.avatar} className="w-8 h-8 md:w-11 md:h-11 rounded-2xl border-2 border-slate-800 mt-1 shrink-0 shadow-lg" alt="" />}
                
                <div className={`flex flex-col ${msg.user === 'Você' ? 'items-end' : msg.user === 'SISTEMA' ? 'items-center' : 'items-start'} ${msg.user === 'SISTEMA' ? 'w-full' : 'max-w-[85%] md:max-w-[80%]'}`}>
                   {msg.user !== 'SISTEMA' && (
                     <div className="flex items-center gap-2 md:gap-3 mb-1 px-1">
                        <span className={`font-black text-[8px] md:text-[10px] uppercase tracking-widest ${msg.user === 'Você' ? 'text-amber-500' : 'text-slate-100'}`}>{msg.user}</span>
                        <span className="text-[7px] md:text-[8px] text-slate-600 font-bold">{msg.timestamp}</span>
                     </div>
                   )}
                   <div className={`p-3 md:p-5 rounded-[1.2rem] md:rounded-[1.8rem] text-xs md:text-sm leading-relaxed shadow-xl relative ${
                     msg.user === 'Você' 
                     ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none' 
                     : msg.user === 'SISTEMA'
                     ? 'bg-slate-900/50 border border-slate-800/50 text-amber-500/80 italic font-black text-[9px] uppercase tracking-widest text-center px-6 py-2'
                     : 'bg-slate-900 border border-slate-800 rounded-tl-none text-slate-200'
                   }`}>
                      {msg.text}
                      {msg.user === 'Você' && <Check size={10} className="absolute bottom-1 right-3 opacity-40" />}
                   </div>
                </div>
             </div>
           ))}
           <div className="h-4"></div>
        </div>

        {/* 🚀 RODAPÉ DE MENSAGEM */}
        <div className="p-3 md:p-6 bg-slate-900/90 border-t border-slate-800 backdrop-blur-2xl shrink-0 z-40">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-2 md:gap-3">
            <button type="button" className="p-3 md:p-4 bg-slate-800/80 text-slate-400 hover:text-white rounded-xl md:rounded-2xl border border-slate-700 transition-all shrink-0">
               <Paperclip size={18} />
            </button>
            <div className="relative flex-1">
               <Smile className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-amber-500 cursor-pointer hidden md:block" size={18} />
               <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder={activeChatId === 'general' ? "Compartilhe o Logos..." : `Falar com ${activeChat.name}...`}
                 className="w-full bg-slate-950 text-slate-100 rounded-[1.2rem] md:rounded-[2rem] pl-4 md:pl-12 py-3 md:py-5 pr-4 border-2 border-slate-800 focus:outline-none focus:border-amber-500/50 transition-all text-xs md:text-sm font-medium shadow-inner"
               />
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              className={`p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] transition-all flex items-center justify-center shadow-2xl shrink-0 ${
                input.trim() 
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 shadow-amber-500/20' 
                : 'bg-slate-800 text-slate-600 border border-slate-700'
              }`}
            >
              <Send size={18} md:size={20} strokeWidth={2.5} />
            </button>
          </form>
          <div className="mt-2 md:mt-3 flex justify-center items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
             <p className="text-[7px] md:text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Criptografia Logos End-to-End</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
