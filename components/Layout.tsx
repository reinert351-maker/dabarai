
import React, { useState, useRef, useEffect } from 'react';
import { ViewMode } from '../types';
import { NAV_ITEMS, TRANSLATIONS } from '../constants';
import { ChevronDown, Menu, X, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  userXp: number;
  language?: string;
  profileImage?: string | null;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, userXp, language = 'pt-br', profileImage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const level = Math.floor(userXp / 1000);
  const progress = (userXp % 1000) / 10;
  const t = TRANSLATIONS[language] || TRANSLATIONS['pt-br'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (view: ViewMode) => {
    onViewChange(view);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-sacred overflow-hidden text-sacred font-reading">
      
      {/* HEADER DINÂMICO */}
      <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-sacred-soft/80 border-b border-sacred shrink-0 z-[100] backdrop-blur-xl relative">
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="flex items-center gap-3 md:gap-4 relative" ref={dropdownRef}>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center shadow-accent shrink-0">
                <span className="text-sacred font-black text-xl italic invert">D</span>
              </div>
              <h1 className="text-lg md:text-2xl font-black text-accent font-divine tracking-tighter truncate uppercase hidden sm:block">DABAR AI</h1>
            </div>

            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl border transition-all ${isDropdownOpen ? 'bg-accent border-accent text-sacred invert' : 'bg-sacred-soft border-sacred text-sacred-soft hover:border-accent'}`}
            >
              {isDropdownOpen ? <X size={18} /> : <Menu size={18} />}
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hidden xs:block">Explorar</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-14 left-0 w-[85vw] max-w-xs md:w-72 bg-sacred-soft border-2 border-sacred rounded-[2rem] shadow-2xl p-3 animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden z-[110]">
                <div className="p-4 border-b border-sacred mb-2">
                   <p className="text-[9px] font-black text-sacred-soft uppercase tracking-widest">Navegação DABAR</p>
                </div>
                <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id as ViewMode)}
                        className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl transition-all ${
                          isActive 
                          ? 'bg-accent text-sacred font-black shadow-lg invert' 
                          : 'text-sacred-soft hover:bg-sacred hover:text-sacred'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-sacred-soft/20' : 'bg-sacred'}`}>
                          <Icon size={18} />
                        </div>
                        <span className="text-xs uppercase tracking-widest">{t.nav[item.id] || item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-8">
          <div className="hidden lg:flex flex-col items-end">
             <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">{t.common.level} {level}</span>
                <span className="text-[10px] font-black text-accent">{progress}%</span>
             </div>
             <div className="w-40 h-1.5 bg-sacred rounded-full overflow-hidden border border-sacred">
                <div 
                  className="h-full bg-accent transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                ></div>
             </div>
          </div>
          <button 
            onClick={() => onViewChange(ViewMode.SETTINGS)}
            className="flex items-center gap-2 md:gap-3 p-1 bg-sacred-soft border border-sacred rounded-2xl hover:border-accent transition-all group shrink-0 overflow-hidden"
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl object-cover border border-sacred group-hover:scale-105 transition-transform" 
                alt="Perfil" 
              />
            ) : (
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-sacred flex items-center justify-center text-accent border border-sacred group-hover:bg-accent group-hover:text-sacred transition-all">
                <User size={20} />
              </div>
            )}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <nav className="hidden lg:flex flex-col w-72 bg-sacred border-r border-sacred p-6 space-y-3 shrink-0 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewMode)}
                className={`flex items-center space-x-4 w-full px-5 py-4 rounded-2xl transition-all duration-300 relative group ${
                  isActive 
                  ? 'bg-accent text-sacred font-black scale-[1.02] shadow-accent invert' 
                  : 'text-sacred-soft hover:bg-sacred-soft hover:text-sacred'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-sacred/20' : 'bg-sacred-soft'}`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs uppercase tracking-widest">{t.nav[item.id] || item.label}</span>
              </button>
            );
          })}
        </nav>

        <main className="flex-1 relative flex flex-col bg-sacred overflow-hidden">
          <div className={`flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative ${activeView === ViewMode.COMMUNITY ? 'p-0' : 'p-4 md:p-10'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
