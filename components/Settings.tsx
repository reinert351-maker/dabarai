
import React, { useState, useRef } from 'react';
import { THEME_CONFIG } from '../constants';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Type, 
  Check,
  Languages,
  Info,
  Zap,
  Loader2,
  BrainCircuit,
  Trash2,
  Bell,
  Eye,
  Type as FontIcon,
  ShieldCheck,
  LogOut,
  Camera,
  User as UserIcon,
  Upload,
  BellRing,
  Smartphone,
  Mail
} from 'lucide-react';

interface SettingsProps {
  config: any;
  setConfig: (config: any) => void;
  onActionXp?: (amt: number, reason: string) => void;
  onNotify?: (text: string) => void;
}

const COLOR_PALETTE = [
  { id: 'amber', name: 'Âmbar', hex: '#f59e0b' },
  { id: 'gold', name: 'Ouro', hex: '#D4AF37' },
  { id: 'crimson', name: 'Carmesim', hex: '#e11d48' },
  { id: 'purple', name: 'Púrpura', hex: '#9333ea' },
  { id: 'indigo', name: 'Índigo', hex: '#6366f1' },
  { id: 'sky', name: 'Céu', hex: '#0ea5e9' },
  { id: 'emerald', name: 'Esmeralda', hex: '#10b981' },
  { id: 'orange', name: 'Fogo', hex: '#f97316' },
  { id: 'white', name: 'Luz', hex: '#ffffff' },
  { id: 'silver', name: 'Prata', hex: '#C0C0C0' }
];

const Settings: React.FC<SettingsProps> = ({ config, setConfig, onActionXp, onNotify }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateSetting = (key: string, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        onNotify?.("A imagem deve ter no máximo 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateSetting('profileImage', reader.result as string);
        onNotify?.("Foto de perfil atualizada!");
        onActionXp?.(5, 'Atualização de Identidade');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      onActionXp?.(5, 'Ajustes no Templo');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  const deactivateLicense = () => {
    if (confirm("Deseja desativar esta licença? Você precisará da chave novamente para acessar o DABAR AI.")) {
      localStorage.removeItem('dabar_license_key');
      window.location.reload();
    }
  };

  const factoryReset = () => {
    if (confirm("Deseja realmente limpar o Templo DABAR? Isso excluirá seus estudos salvos e resets de tema.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 px-4 md:px-0">
      
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] bg-accent text-sacred px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 invert">
          <Check size={18} /> CONFIGURAÇÕES CONSAGRADAS
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-sacred-soft rounded-[2.5rem] border border-sacred flex items-center justify-center text-accent shadow-2xl shadow-accent/10">
           <SettingsIcon size={36} />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-divine font-black text-sacred uppercase tracking-tighter italic">Ajustes DABAR</h2>
          <p className="text-sacred-soft font-medium text-lg">Personalize sua experiência profética.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* COLUNA 1: IDENTIDADE E PALETA DE MARCA */}
        <div className="bg-sacred-soft/40 border border-sacred rounded-[3.5rem] p-8 md:p-10 shadow-2xl space-y-10">
           <div className="flex items-center gap-4 border-b border-sacred pb-6">
              <Palette className="text-accent" size={24} />
              <h3 className="font-black text-sacred uppercase tracking-[0.2em] text-sm">Cores da Identidade</h3>
           </div>

           <div className="space-y-6">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2">
                 Cor do Ícone e Nome do App
              </p>
              <div className="grid grid-cols-5 gap-2">
                 {COLOR_PALETTE.map(c => (
                   <button 
                    key={c.id} 
                    onClick={() => updateSetting('brandColor', c.id)}
                    className={`w-full aspect-square rounded-xl border-2 transition-all flex items-center justify-center ${config.brandColor === c.id ? 'border-white scale-110 shadow-lg' : 'border-sacred'}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                   >
                     {config.brandColor === c.id && <Check size={14} className="text-sacred invert" />}
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-6 pt-6 border-t border-sacred">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2">
                 Cor das Fontes e Textos
              </p>
              <div className="grid grid-cols-5 gap-2">
                 {COLOR_PALETTE.map(c => (
                   <button 
                    key={c.id} 
                    onClick={() => updateSetting('customTextColor', c.id)}
                    className={`w-full aspect-square rounded-xl border-2 transition-all flex items-center justify-center ${config.customTextColor === c.id ? 'border-white scale-110 shadow-lg' : 'border-sacred'}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                   >
                     {config.customTextColor === c.id && <Check size={14} className="text-sacred invert" />}
                   </button>
                 ))}
              </div>
              <button 
                onClick={() => {updateSetting('customTextColor', null); onNotify?.("Cor de texto restaurada para o padrão do tema.");}}
                className="w-full py-3 bg-sacred border border-sacred rounded-xl text-[8px] font-black text-sacred-soft uppercase tracking-widest hover:text-white"
              >
                Restaurar Padrão do Tema
              </button>
           </div>
           
           <div className="pt-6 border-t border-sacred flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center shadow-lg mb-3">
                 <span className="text-sacred font-black text-xl italic invert">D</span>
              </div>
              <h1 className="text-lg font-black text-brand font-divine tracking-tighter uppercase">DABAR AI</h1>
              <p className="text-[8px] text-sacred-soft font-black uppercase tracking-widest mt-1">Prévia da Identidade</p>
           </div>
        </div>

        {/* COLUNA 2: TEMAS & TIPOGRAFIA */}
        <div className="bg-sacred-soft/40 border border-sacred rounded-[3.5rem] p-8 md:p-10 shadow-2xl space-y-10">
           <div className="flex items-center gap-4 border-b border-sacred pb-6">
              <Eye className="text-accent" size={24} />
              <h3 className="font-black text-sacred uppercase tracking-[0.2em] text-sm">Ambiente & Tipografia</h3>
           </div>

           <div className="space-y-6">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">Temas do Templo</p>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                 {Object.entries(THEME_CONFIG.themes).map(([id, t]: [string, any]) => (
                   <button 
                    key={id} 
                    onClick={() => updateSetting('theme', id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${config.theme === id ? 'border-accent bg-accent/5' : 'border-sacred bg-sacred/50 hover:border-sacred-soft'}`}
                   >
                      <span className={`text-[9px] font-black uppercase text-center ${config.theme === id ? 'text-sacred' : 'text-sacred-soft'}`}>{t.name}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-6 pt-6 border-t border-sacred">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">Tipografia do Logos</p>
              <div className="grid grid-cols-2 gap-3">
                 {Object.entries(THEME_CONFIG.fonts).map(([id, f]: [string, any]) => (
                   <button 
                    key={id} 
                    onClick={() => updateSetting('fontFamily', id)}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${config.fontFamily === id ? 'border-accent bg-accent/5' : 'border-sacred bg-sacred/50 hover:border-sacred-soft'}`}
                   >
                      <FontIcon size={14} className={config.fontFamily === id ? 'text-accent' : 'text-sacred-soft'} />
                      <span className={`text-[10px] font-black uppercase ${config.fontFamily === id ? 'text-sacred' : 'text-sacred-soft'}`}>{f.name}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-6 pt-6 border-t border-sacred">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest">Motor Inteligente</p>
              <div className="grid grid-cols-1 gap-2">
                 {[
                   { id: 'pro', name: 'DABAR Pro', desc: 'Pensamento profundo.' },
                   { id: 'flash', name: 'DABAR Flash', desc: 'Velocidade máxima.' }
                 ].map(m => (
                   <button 
                    key={m.id} 
                    onClick={() => updateSetting('aiModel', m.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${m.id === config.aiModel ? 'border-accent bg-accent/5' : 'border-sacred bg-sacred/50'}`}
                   >
                      <div className={`w-2 h-2 rounded-full ${m.id === config.aiModel ? 'bg-accent' : 'bg-sacred-soft'}`}></div>
                      <div>
                        <span className={`block text-[10px] font-black uppercase ${m.id === config.aiModel ? 'text-sacred' : 'text-sacred-soft'}`}>{m.name}</span>
                      </div>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* COLUNA 3: ALERTAS & MANUTENÇÃO */}
        <div className="bg-sacred-soft/40 border border-sacred rounded-[3.5rem] p-8 md:p-10 shadow-2xl space-y-10">
           <div className="flex items-center gap-4 border-b border-sacred pb-6">
              <BellRing className="text-accent" size={24} />
              <h3 className="font-black text-sacred uppercase tracking-[0.2em] text-sm">Alertas & Sincronia</h3>
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-sacred/50 border border-sacred rounded-2xl transition-all">
                 <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-accent" />
                    <span className="text-[10px] font-black text-sacred uppercase tracking-widest">Estudo Pendente</span>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={config.alertStudies ?? true} onChange={(e) => updateSetting('alertStudies', e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-sacred-soft peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                 </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-sacred/50 border border-sacred rounded-2xl transition-all">
                 <div className="flex items-center gap-3">
                    <Zap size={18} className="text-amber-500" />
                    <span className="text-[10px] font-black text-sacred uppercase tracking-widest">Insigths do Mentor</span>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={config.alertInsights ?? true} onChange={(e) => updateSetting('alertInsights', e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-sacred-soft peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                 </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-sacred/50 border border-sacred rounded-2xl transition-all">
                 <div className="flex items-center gap-3">
                    <Mail size={18} className="text-indigo-400" />
                    <span className="text-[10px] font-black text-sacred uppercase tracking-widest">Destaque Semanal</span>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={config.alertWeekly ?? false} onChange={(e) => updateSetting('alertWeekly', e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-sacred-soft peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                 </label>
              </div>
              <p className="text-[8px] text-sacred-soft uppercase tracking-widest text-center italic mt-2">Os alertas são sincronizados em todos os seus dispositivos.</p>
           </div>

           <div className="pt-6 border-t border-sacred space-y-4">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-5 bg-brand text-sacred rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:opacity-90 shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 invert"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                CONSAGRAR AJUSTES
              </button>

              <button 
                onClick={factoryReset}
                className="w-full py-4 bg-sacred border border-sacred text-sacred-soft rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:border-rose-500 hover:text-rose-500 transition-all flex items-center justify-center gap-4"
              >
                <Trash2 size={20} /> LIMPAR TEMPLO
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
