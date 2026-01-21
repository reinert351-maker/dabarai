
import { GoogleGenAI, Type, Modality } from "@google/genai";

const getAPIKey = () => {
    // Tenta pegar de process.env (Netlify) ou do shim global
    const key = (typeof process !== 'undefined' && process.env.API_KEY) || 
                (window as any).process?.env?.API_KEY || 
                "";
    return key;
};

// General response generator for text prompts
export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  const apiKey = getAPIKey();
  if (!apiKey) return "DABAR AI: Chave de API não configurada no Netlify.";
  
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Você é o DABAR AI, o Assistente Espiritual mais avançado do mundo. 
        Seu objetivo é auxiliar usuários no estudo bíblico profundo com foco em exegese e contexto histórico.`,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 2000 }
      },
    });
    return response.text || "O Logos está em silêncio. Tente novamente.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro de conexão com o Logos AI. Verifique a chave de API.";
  }
};

export const refractPrism = async (reference: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Realize uma refração prismática do versículo: "${reference}". 
      Retorne um objeto JSON com 7 chaves exatamente assim:
      {
        "gramatical": "análise morfológica profunda",
        "historica": "contexto de vida e autor",
        "arqueologica": "evidências materiais",
        "patristica": "comentários dos pais da igreja",
        "tipologica": "conexão com Cristo",
        "sistematica": "encaixe doutrinário",
        "pratica": "aplicação contemporânea"
      }`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return null;
  }
};

export const getBibleVerses = async (book: string, chapter: number, translation: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return [];
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Forneça o texto completo de ${book} capítulo ${chapter} na tradução ${translation}. Retorne apenas os versículos em formato JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              number: { type: Type.INTEGER },
              text: { type: Type.STRING }
            },
            required: ["number", "text"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [];
  }
};

export const generateBibleImage = async (prompt: string): Promise<string | null> => {
  const apiKey = getAPIKey();
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Sacred biblical art: ${prompt}. Cinematic lighting, historically accurate.` }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const searchBiblicalPlaces = async (query: string, userLocation?: { lat: number, lng: number }) => {
  const apiKey = getAPIKey();
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Forneça informações arqueológicas e geográficas detalhadas sobre ${query} no contexto bíblico.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: userLocation ? { latitude: userLocation.lat, longitude: userLocation.lng } : undefined
          }
        }
      },
    });
    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Maps Search Error:", error);
    return null;
  }
};

export const getScriptoriumInsights = async (prompt: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere insights para o scriptorium com base no seguinte: ${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            "Conexão Bíblica": { type: Type.STRING },
            "Eco Histórico": { type: Type.STRING },
            "Raiz Original": { type: Type.STRING }
          },
          required: ["Conexão Bíblica", "Eco Histórico", "Raiz Original"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return null;
  }
};

export const scanManuscript = async (base64: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return "DABAR AI: Chave não encontrada.";
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64, mimeType: 'image/jpeg' } },
          { text: "Analise este manuscrito bíblico ou página da Bíblia. Forneça transcrição, contexto histórico e análise exegética." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    return "Erro ao analisar manuscrito.";
  }
};

export const compareVariants = async (reference: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return "DABAR AI: Chave não encontrada.";
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Realize uma análise de crítica textual exaustiva para: ${reference}. Compare variantes entre Codex Sinaiticus, Vaticanus e Texto Recebido.`,
      config: { thinkingConfig: { thinkingBudget: 4000 } }
    });
    return response.text;
  } catch (error) {
    return "Erro na comparação de variantes.";
  }
};

export const generateArcheologyVideo = async (location: string, description: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic archaeological reconstruction of ${location}. ${description}`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${apiKey}`;
  } catch (error) {
    console.error("Video Generation Error:", error);
    return null;
  }
};

export const harmonizeGospels = async (passage: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return "DABAR AI: Chave não encontrada.";
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Harmonize os relatos dos Evangelhos para a passagem ou tema: ${passage}.`,
      config: { thinkingConfig: { thinkingBudget: 4000 } }
    });
    return response.text;
  } catch (error) {
    return "Erro na harmonização.";
  }
};

export const simulateCouncil = async (t1: string, t2: string, topic: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return "DABAR AI: Chave não encontrada.";
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Simule um debate teológico de alto nível entre ${t1} e ${t2} sobre o tema: ${topic}.`,
      config: { thinkingConfig: { thinkingBudget: 8000 } }
    });
    return response.text;
  } catch (error) {
    return "Erro ao simular concílio.";
  }
};

export const mapBiblicalNetwork = async (reference: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return "DABAR AI: Chave não encontrada.";
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Mapeie a rede intertextual de ${reference}. Identifique conexões entre Antigo e Novo Testamento.`,
      config: { thinkingConfig: { thinkingBudget: 4000 } }
    });
    return response.text;
  } catch (error) {
    return "Erro ao mapear rede.";
  }
};

export const getSensoryExperience = async (location: string, date: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return "DABAR AI: Chave não encontrada.";
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Descreva em detalhes sensoriais (cheiro, clima, sons, visão) estar em ${location} na data/época: ${date}.`,
      config: { thinkingConfig: { thinkingBudget: 4000 } }
    });
    return response.text;
  } catch (error) {
    return "Erro ao obter experiência sensorial.";
  }
};

export const generateDabarMelos = async (text: string, voiceName: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Narrate with a sacred and atmospheric tone: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};
