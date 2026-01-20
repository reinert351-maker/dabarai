
import React, { useState } from 'react';
import { Lock, ShieldCheck, ShoppingCart, Key, Loader2, Sparkles, ArrowRight, Mail, HelpCircle } from 'lucide-react';

interface ActivationGateProps {
  onActivate: (key: string) => void;
}

const ActivationGate: React.FC<ActivationGateProps> = ({ onActivate }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setError(false);
    
    // Simulação de verificação de transação Hotmart
    // O padrão da Hotmart começa com HP...
    setTimeout(() => {
      const cleanKey = key.trim().toUpperCase();
      // Validação: Deve começar com HP e ter um comprimento razoável de transação (10+)
      if (cleanKey.startsWith('HP') && cleanKey.length >= 10) {
        onActivate(cleanKey);
      } else {
        setError(true);
        setIsVerifying(false);
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#020617] flex items-center justify-center p-4 overflow-y-auto">
      {/* Background Decorativo Sagrado */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-amber-500/20 blur-[150px] rounded-full"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-indigo-500/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-xl w-full relative z-10 my-8">
        <div className="bg-slate-900/40 backdrop-blur-3xl border-2 border-slate-800 rounded-[4rem] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.8)] text-center space-y-10">
          
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-amber-500/20">
                <Lock className="text-slate-950" size={48} />
              </div>
              <div className="absolute -right-2 -bottom-2 bg-emerald-500 text-white p-2 rounded-full border-4 border-slate-900">
                <ShieldCheck size={20} />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">Portal DABAR AI</h1>
              <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mt-3 italic">Liberação via Hotmart</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800 text-left space-y-4">
              <div className="flex items-center gap-3 text-amber-500">
                <Mail size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Verifique seu E-mail</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Insira abaixo o <span className="text-white font-bold">Código de Transação</span> enviado pela Hotmart. 
                Ele começa com <span className="text-amber-400 font-bold">"HP"</span> e está no e-mail com o assunto: <span className="italic text-slate-400">"Compra aprovada: DABAR AI"</span>.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Key className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-amber-500'}`} size={20} />
              <input 
                type="text" 
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase())}
                placeholder="HPXXXXXXXXXX"
                className={`w-full bg-slate-950/50 border-2 rounded-2xl pl-14 pr-6 py-5 text-white font-black tracking-[0.2em] focus:outline-none transition-all placeholder:text-slate-700 ${error ? 'border-rose-500 shadow-rose-500/10' : 'border-slate-800 focus:border-amber-500/50'}`}
              />
            </div>
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Código não reconhecido. Certifique-se de incluir o "HP" inicial.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4">
            <button 
              onClick={handleVerify}
              disabled={isVerifying || !key}
              className="w-full py-6 bg-amber-500 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-amber-400 shadow-2xl shadow-amber-500/10 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isVerifying ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
              CONCLUIR ATIVAÇÃO
            </button>
            
            <div className="flex items-center gap-4 px-2">
              <div className="h-[1px] bg-slate-800 flex-1"></div>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Problemas no acesso?</span>
              <div className="h-[1px] bg-slate-800 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a 
                href="https://atendimento.hotmart.com.br" 
                target="_blank"
                rel="noreferrer"
                className="py-4 bg-slate-800/40 text-slate-400 border border-slate-800 rounded-xl font-black text-[9px] uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <HelpCircle size={14} /> SUPORTE HOTMART
              </a>
              <button 
                onClick={() => alert('Suporte DABAR: contato@dabar.ai')}
                className="py-4 bg-slate-800/40 text-slate-400 border border-slate-800 rounded-xl font-black text-[9px] uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Mail size={14} /> CONTATO DABAR
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 opacity-30 pt-4">
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-amber-500" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">Ambiente Seguro & Consagrado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationGate;
