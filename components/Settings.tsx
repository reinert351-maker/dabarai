
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
  Upload
} from 'lucide-react';

interface SettingsProps {
  config: any;
  setConfig: (config: any) => void;
  onActionXp?: (amt: number, reason: string) => void;
  onNotify?: (text: string) => void;
}

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

  const handleConfigureAlerts = () => {
    onNotify?.("Sincronizando Alertas com o DABAR AI...");
    setTimeout(() => {
      onNotify?.("Alertas de Estudo Ativados com Sucesso!");
      onActionXp?.(10, 'Prontidão Espiritual');
    }, 1500);
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
        
        {/* COLUNA 1: IDENTIDADE E LICENÇA */}
        <div className="bg-sacred-soft/40 border border-sacred rounded-[3.5rem] p-8 md:p-10 shadow-2xl space-y-10">
           <div className="flex items-center gap-4 border-b border-sacred pb-6">
              <UserIcon className="text-accent" size={24} />
              <h3 className="font-black text-sacred uppercase tracking-[0.2em] text-sm">Identidade do Estudante</h3>
           </div>

           <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-sacred border-2 border-sacred overflow-hidden shadow-2xl group-hover:border-accent transition-all">
                   {config.profileImage ? (
                     <img src={config.profileImage} className="w-full h-full object-cover" alt="Perfil" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-sacred-soft">
                        <UserIcon size={48} />
                     </div>
                   )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent text-sacred rounded-2xl flex items-center justify-center shadow-xl invert hover:scale-110 transition-transform border-4 border-sacred-soft"
                >
                   <Camera size={20} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </div>

              <div className="w-full space-y-2 text-center">
                 <input 
                    type="text" 
                    value={config.userName || ''} 
                    onChange={(e) => updateSetting('userName', e.target.value)}
                    placeholder="Nome do Estudante"
                    className="w-full bg-sacred border-b border-sacred py-2 text-center font-serif italic text-xl text-sacred focus:outline-none focus:border-accent transition-all"
                 />
                 <span className="text-[8px] font-black text-sacred-soft uppercase tracking-widest">Este nome será exibido na Comunidade</span>
              </div>
           </div>

           <div className="space-y-6 pt-6 border-t border-sacred">
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl">
                 <div className="flex items-center gap-3 mb-2 text-emerald-500">
                    <Check size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Ativação Ativa</span>
                 </div>
                 <p className="text-xs text-slate-300 font-medium italic">Licença vinculada com sucesso.</p>
              </div>

              <button 
                onClick={deactivateLicense}
                className="w-full flex items-center justify-between p-4 bg-sacred border border-sacred rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all text-[9px] font-black uppercase tracking-widest"
              >
                <span>Desvincular Licença</span>
                <LogOut size={14} />
              </button>
           </div>
        </div>

        {/* COLUNA 2: HERMENÊUTICA & ESTÉTICA */}
        <div className="bg-sacred-soft/40 border border-sacred rounded-[3.5rem] p-8 md:p-10 shadow-2xl space-y-10">
           <div className="flex items-center gap-4 border-b border-sacred pb-6">
              <Type className="text-accent" size={24} />
              <h3 className="font-black text-sacred uppercase tracking-[0.2em] text-sm">Leitura & Ambiente</h3>
           </div>

           <div className="space-y-6">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2">
                 <Eye size={12} /> Temas Visuais
              </p>
              <div className="grid grid-cols-2 gap-3">
                 {Object.entries(THEME_CONFIG.themes).map(([id, t]: [string, any]) => (
                   <button 
                    key={id} 
                    onClick={() => updateSetting('theme', id)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${config.theme === id ? 'border-accent bg-accent/5 shadow-inner' : 'border-sacred bg-sacred/50 hover:border-sacred-soft'}`}
                   >
                      <div className={`w-3 h-3 rounded-full ${config.theme === id ? 'bg-accent shadow-accent' : 'bg-sacred-soft border border-sacred'}`}></div>
                      <span className={`text-[9px] font-black uppercase text-center ${config.theme === id ? 'text-sacred' : 'text-sacred-soft'}`}>{t.name}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
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

           <div className="space-y-6">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2">
                 <BrainCircuit size={12} /> Motor Inteligente
              </p>
              <div className="grid grid-cols-1 gap-3">
                 {[
                   { id: 'pro', name: 'DABAR Pro', desc: 'Pensamento profundo para exegeses.' },
                   { id: 'flash', name: 'DABAR Flash', desc: 'Velocidade máxima em respostas.' }
                 ].map(m => (
                   <button 
                    key={m.id} 
                    onClick={() => updateSetting('aiModel', m.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${m.id === config.aiModel ? 'border-accent bg-accent/5' : 'border-sacred bg-sacred/50'}`}
                   >
                      <div className={`w-2 h-2 rounded-full ${m.id === config.aiModel ? 'bg-accent shadow-accent' : 'bg-sacred-soft'}`}></div>
                      <div>
                        <span className={`block text-[10px] font-black uppercase mb-1 ${m.id === config.aiModel ? 'text-sacred' : 'text-sacred-soft'}`}>{m.name}</span>
                        <span className="text-[8px] text-sacred-soft uppercase tracking-widest opacity-60">{m.desc}</span>
                      </div>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* COLUNA 3: SISTEMA & MANUTENÇÃO */}
        <div className="bg-sacred-soft/40 border border-sacred rounded-[3.5rem] p-8 md:p-10 shadow-2xl space-y-10">
           <div className="flex items-center gap-4 border-b border-sacred pb-6">
              <Zap className="text-accent" size={24} />
              <h3 className="font-black text-sacred uppercase tracking-[0.2em] text-sm">Templo & Idioma</h3>
           </div>

           <div className="space-y-6">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2">
                 <Languages size={12} /> Idioma do App
              </p>
              <div className="grid grid-cols-2 gap-3">
                 {[
                   { id: 'pt-br', name: 'Português BR' },
                   { id: 'en-us', name: 'English US' }
                 ].map(l => (
                   <button 
                    key={l.id} 
                    onClick={() => updateSetting('language', l.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${config.language === l.id ? 'border-accent bg-accent/5' : 'border-sacred bg-sacred/50 hover:border-sacred-soft'}`}
                   >
                      <span className={`text-[10px] font-black uppercase text-center block ${config.language === l.id ? 'text-sacred' : 'text-sacred-soft'}`}>{l.name}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
              <p className="text-[10px] font-black text-sacred-soft uppercase tracking-widest flex items-center gap-2">
                 <Bell size={12} /> Sincronia de Alertas
              </p>
              <div className="bg-sacred/50 border border-sacred p-6 rounded-2xl">
                 <p className="text-[10px] text-sacred-soft leading-relaxed italic mb-4">
                    Receba notificações sobre estudos pendentes e descobertas da IA.
                 </p>
                 <button 
                   onClick={handleConfigureAlerts}
                   className="w-full py-4 bg-sacred border border-accent/20 text-accent rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-accent hover:text-sacred transition-all"
                 >
                   Configurar Alertas
                 </button>
              </div>
           </div>

           <div className="pt-6 space-y-4">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-5 bg-accent text-sacred rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:opacity-90 shadow-accent active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 invert"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                CONSAGRAR AJUSTES
              </button>

              <button 
                onClick={factoryReset}
                className="w-full py-5 bg-sacred border border-sacred text-sacred-soft rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:border-crimson hover:text-crimson transition-all flex items-center justify-center gap-4"
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
