
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Mic, MicOff, Loader2, Sparkles, Volume2 } from 'lucide-react';

// Auxiliares de áudio (Padrão sugerido na documentação)
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): { data: string, mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const DabarVoice: React.FC<{ onActionXp?: (amt: number, reason: string) => void }> = ({ onActionXp }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startSession = async () => {
    setIsConnecting(true);
    onActionXp?.(40, 'Conexão Vocal Estabelecida');
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputContext = audioContextRef.current;
    let nextStartTime = 0;
    const sources = new Set<AudioBufferSourceNode>();

    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputContext.createMediaStreamSource(streamRef.current!);
            const scriptProcessor = inputContext.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputContext.destination);
            setIsActive(true);
            setIsConnecting(false);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData.data;
            if (base64Audio) {
              nextStartTime = Math.max(nextStartTime, outputContext.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputContext, 24000, 1);
              const source = outputContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputContext.destination);
              source.start(nextStartTime);
              nextStartTime += audioBuffer.duration;
              sources.add(source);
            }
            if (msg.serverContent?.outputTranscription) {
              setTranscript(prev => prev + " " + msg.serverContent!.outputTranscription!.text);
            }
          },
          // Added mandatory onerror callback
          onerror: (e: ErrorEvent) => {
            console.error('DABAR Voice Session Error:', e);
            stopSession();
          },
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          systemInstruction: "Você é o DABAR VOICE, um mentor espiritual que fala de forma sábia, pausada e encorajadora. Responda a perguntas sobre a Bíblia e Teologia de forma oral e direta."
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsActive(false);
    setTranscript('');
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-200px)] flex flex-col items-center justify-center p-8 space-y-12 animate-in fade-in duration-700">
      <div className="relative">
        <div className={`w-40 h-40 md:w-56 md:h-56 rounded-[4rem] border-4 flex items-center justify-center transition-all duration-700 shadow-2xl ${isActive ? 'bg-accent border-sacred scale-110 invert animate-pulse' : 'bg-sacred-soft border-sacred'}`}>
          {isConnecting ? <Loader2 className="animate-spin text-accent" size={64} /> : isActive ? <Volume2 size={80} /> : <Mic size={80} className="text-sacred-soft" />}
        </div>
        {isActive && <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full animate-ping"></div>}
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-divine font-black text-white uppercase tracking-tighter italic">DABAR Voice</h2>
        <p className="text-sacred-soft text-lg font-serif italic">Converse por voz em tempo real com seu Mentor DABAR AI.</p>
      </div>

      <div className="w-full max-w-lg">
         {isActive ? (
           <div className="space-y-8">
              <div className="bg-sacred-soft border-2 border-sacred p-8 rounded-3xl min-h-[150px] max-h-[250px] overflow-y-auto no-scrollbar italic text-sacred-soft font-serif">
                {transcript || "DABAR Voice está ouvindo... Fale algo sobre a Bíblia."}
              </div>
              <button onClick={stopSession} className="w-full py-6 bg-crimson text-white rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-4">
                <MicOff size={20} /> ENCERRAR SESSÃO
              </button>
           </div>
         ) : (
           <button 
            disabled={isConnecting}
            onClick={startSession}
            className="w-full py-6 bg-accent text-sacred rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-accent active:scale-95 transition-all flex items-center justify-center gap-4 invert"
           >
              <Mic size={20} /> {isConnecting ? 'CONECTANDO...' : 'INICIAR CONVERSA'}
           </button>
         )}
      </div>
    </div>
  );
};

export default DabarVoice;
