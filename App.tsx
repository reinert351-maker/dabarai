
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import BibleReader from './components/BibleReader.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import InteractiveMap from './components/InteractiveMap.tsx';
import TheologyLibrary from './components/TheologyLibrary.tsx';
import Gamification from './components/Gamification.tsx';
import Timeline from './components/Timeline.tsx';
import Community from './components/Community.tsx';
import Settings from './components/Settings.tsx';
import MyStudies from './components/MyStudies.tsx';
import Lexicon from './components/Lexicon.tsx';
import Academy from './components/Academy.tsx';
import DabarVision from './components/DabarVision.tsx';
import DabarVoice from './components/DabarVoice.tsx';
import DabarVariants from './components/DabarVariants.tsx';
import Archeology360 from './components/Archeology360.tsx';
import DabarHarmony from './components/DabarHarmony.tsx';
import DabarDebates from './components/DabarDebates.tsx';
import DabarNetwork from './components/DabarNetwork.tsx';
import DabarAtlas from './components/DabarAtlas.tsx';
import DabarMelos from './components/DabarMelos.tsx';
import DabarPrism from './components/DabarPrism.tsx';
import ActivationGate from './components/ActivationGate.tsx';
import { ViewMode, StudyItem } from './types.ts';
import { TRANSLATIONS } from './constants.tsx';
import { Sparkles, Trophy, Zap, BookmarkPlus } from 'lucide-react';

const App: React.FC = () => {
  const [isActivated, setIsActivated] = useState<boolean>(() => {
    return localStorage.getItem('dabar_license_key') !== null;
  });
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.BIBLE);
  const [externalAIPrompt, setExternalAIPrompt] = useState<string | null>(null);
  const [userXp, setUserXp] = useState(() => {
    const saved = localStorage.getItem('dabar_user_xp');
    return saved ? parseInt(saved) : 12450;
  });
  const [savedStudies, setSavedStudies] = useState<StudyItem[]>(() => {
    const saved = localStorage.getItem('logos_saved_studies');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('logos_settings');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      accentColor: 'amber',
      fontSize: 'medium',
      language: 'pt-br',
      fontFamily: 'serif',
      aiDepth: 'academic',
      aiModel: 'pro',
      visualEffects: true,
      profileImage: null,
      userName: 'Estudante Logos'
    };
  });

  const [lastNotification, setLastNotification] = useState<{ text: string, type: 'xp' | 'info' | 'level' } | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    localStorage.setItem('logos_saved_studies', JSON.stringify(savedStudies));
  }, [savedStudies]);

  useEffect(() => {
    localStorage.setItem('dabar_user_xp', userXp.toString());
  }, [userXp]);

  useEffect(() => {
    localStorage.setItem('logos_settings', JSON.stringify(settings));
    if ((window as any).applyLogosTheme) {
      (window as any).applyLogosTheme(settings);
    }
  }, [settings]);

  const handleActivate = (key: string) => {
    localStorage.setItem('dabar_license_key', key);
    setIsActivated(true);
  };

  const addXp = (amount: number, reason?: string) => {
    const oldLevel = Math.floor(userXp / 1000);
    const newXp = userXp + amount;
    const newLevel = Math.floor(newXp / 1000);
    setUserXp(newXp);
    setLastNotification({ text: `+${amount} XP ${reason ? `- ${reason}` : ''}`, type: 'xp' });
    setTimeout(() => setLastNotification(null), 3000);
    if (newLevel > oldLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 5000);
    }
  };

  const handleDeepStudy = (prompt: string) => {
    setExternalAIPrompt(prompt);
    setActiveView(ViewMode.AI_ASSISTANT);
    addXp(25, 'Iniciando Estudo Profundo');
  };

  const saveToStudies = (item: Omit<StudyItem, 'id' | 'timestamp'>) => {
    const newItem: StudyItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('pt-BR')
    };
    setSavedStudies(prev => [newItem, ...prev]);
    setLastNotification({ text: `Salvo: ${item.title}`, type: 'info' });
    setTimeout(() => setLastNotification(null), 3000);
    addXp(50, 'Contribuição ao Scriptorium');
  };

  const deleteFromStudies = (id: string) => {
    setSavedStudies(prev => prev.filter(s => s.id !== id));
  };

  const updateStudyItem = (id: string, updates: Partial<StudyItem>) => {
    setSavedStudies(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    addXp(10, 'Refinamento de Estudo');
  };

  const renderView = () => {
    switch (activeView) {
      case ViewMode.BIBLE:
        return <BibleReader onDeepStudy={handleDeepStudy} onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.AI_ASSISTANT:
        return <AIAssistant externalPrompt={externalAIPrompt} clearExternalPrompt={() => setExternalAIPrompt(null)} onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.VISION:
        return <DabarVision onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.VOICE:
        return <DabarVoice onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.HARMONY:
        return <DabarHarmony onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.DEBATES:
        return <DabarDebates onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.NETWORK:
        return <DabarNetwork onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.ATLAS:
        return <DabarAtlas onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.MELOS:
        return <DabarMelos onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.PRISM:
        return <DabarPrism onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.VARIANTS:
        return <DabarVariants onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.ARCHEOLOGY_360:
        return <Archeology360 onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.MAPS:
        return <InteractiveMap onDeepStudy={handleDeepStudy} onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.THEOLOGY:
        return <TheologyLibrary onDeepStudy={handleDeepStudy} onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.GAMIFICATION:
        return <Gamification xp={userXp} onAddXp={addXp} />;
      case ViewMode.TIMELINE:
        return <Timeline onDeepStudy={handleDeepStudy} onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.COMMUNITY:
        return <Community onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.SETTINGS:
        return <Settings config={settings} setConfig={setSettings} onActionXp={(amt, reason) => addXp(amt, reason)} onNotify={(text) => setLastNotification({text, type: 'info'})} />;
      case ViewMode.MY_STUDIES:
        return <MyStudies items={savedStudies} onDelete={deleteFromStudies} onUpdate={updateStudyItem} onSaveNote={saveToStudies} />;
      case ViewMode.LEXICON:
        return <Lexicon onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      case ViewMode.ACADEMY:
        return <Academy userXp={userXp} onActionXp={(amt, reason) => addXp(amt, reason)} />;
      default:
        return <BibleReader onDeepStudy={handleDeepStudy} onSave={saveToStudies} onActionXp={(amt, reason) => addXp(amt, reason)} />;
    }
  };

  if (!isActivated) return <ActivationGate onActivate={handleActivate} />;

  return (
    <Layout activeView={activeView} onViewChange={setActiveView} userXp={userXp} language={settings.language} profileImage={settings.profileImage}>
      {lastNotification && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[500] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-4 transition-all ${
          lastNotification.type === 'xp' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-accent text-sacred invert'
        }`}>
          {lastNotification.type === 'xp' ? <Zap size={18} /> : <BookmarkPlus size={18} />}
          {lastNotification.text}
        </div>
      )}
      {showLevelUp && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-sacred/80 backdrop-blur-2xl animate-in zoom-in duration-500">
           <div className="bg-sacred-soft border-4 border-accent p-16 rounded-[4rem] shadow-2xl text-center flex flex-col items-center gap-8 max-w-lg">
              <div className="w-32 h-32 bg-accent rounded-[2rem] flex items-center justify-center text-sacred invert animate-bounce"><Trophy size={64} /></div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">Nível {Math.floor(userXp / 1000)}!</h2>
              <button onClick={() => setShowLevelUp(false)} className="w-full py-5 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-widest invert">Continuar Jornada</button>
           </div>
        </div>
      )}
      <div className="relative flex-1 animate-in fade-in duration-500">{renderView()}</div>
      <button onClick={() => setActiveView(ViewMode.AI_ASSISTANT)} className="fixed bottom-8 right-8 md:bottom-12 md:right-12 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100] border-2 md:border-4 border-slate-950"><Sparkles size={24} className="animate-pulse" /></button>
    </Layout>
  );
};

export default App;
