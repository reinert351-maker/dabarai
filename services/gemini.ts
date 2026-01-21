
import { GoogleGenAI, Type, Modality } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    console.warn("DABAR AI: API_KEY não configurada. Algumas funções podem não funcionar.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  const ai = getAIClient();
  if (!ai) return "Por favor, configure sua API_KEY para usar o Mentor IA.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Você é o DABAR AI, o Assistente Espiritual mais avançado do mundo. 
        O nome DABAR vem do hebraico "דber", que significa "Palavra".
        Seu objetivo é auxiliar usuários no estudo bíblico profundo com foco em exegese e contexto.`,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 2000 }
      },
    });
    return response.text;
  } catch (error) {
    return "Erro no DABAR AI. Verifique sua conexão ou cota da API.";
  }
};

export const refractPrism = async (reference: string) => {
  const ai = getAIClient();
  if (!ai) return null;
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
    console.error("Prism Error:", error);
    return null;
  }
};

export const getBibleVerses = async (book: string, chapter: number, translation: string) => {
  const ai = getAIClient();
  if (!ai) return [];
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
    console.error("Error fetching verses:", error);
    return [];
  }
};

export const searchBiblicalPlaces = async (query: string, location?: { lat: number, lng: number }) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Forneça informações arqueológicas e históricas profundas sobre o lugar bíblico: ${query}.`,
      config: {
        tools: [{ googleMaps: {} }],
        ...(location && {
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: location.lat,
                longitude: location.lng
              }
            }
          }
        })
      },
    });
    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Error searching places:", error);
    return null;
  }
};

export const generateArcheologyVideo = async (location: string, description: string): Promise<string | null> => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic archaeological reconstruction video of ${location}. ${description}. 4k, hyper-realistic, historical accuracy.`,
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
    if (downloadLink) {
      return `${downloadLink}&key=${process.env.API_KEY}`;
    }
    return null;
  } catch (error) {
    console.error("Video Generation Error:", error);
    return null;
  }
};

export const getScriptoriumInsights = async (context: string) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analise este contexto de estudo: "${context}". 
      Forneça insights exegéticos e procure conexões semânticas no histórico fornecido.
      Retorne em JSON: 
      {
        "Conexão Bíblica": "string",
        "Eco Histórico": "string",
        "Raiz Original": "string",
        "Memória Semântica": "string relacionando a notas anteriores se houver contexto"
      }`,
      config: { 
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "null");
  } catch (error) {
    return null;
  }
};

export const mapBiblicalNetwork = async (reference: string) => {
  const ai = getAIClient();
  if (!ai) return "Chave de API necessária.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analise o versículo ${reference}. Mapeie conexões tipológicas e intertextuais. 
      Retorne uma lista de conexões no formato 'Referência: Descrição curta'.`,
    });
    return response.text;
  } catch (error) {
    return "Erro ao mapear conexões.";
  }
};

export const generateDabarMelos = async (text: string, voiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' = 'Kore') => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Leia com solenidade e atmosfera sagrada: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("Melos Error:", error);
    return null;
  }
};

export const generateBibleImage = async (prompt: string): Promise<string | null> => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Sacred art: ${prompt}. Cinematic lighting, oil painting style.` }] },
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

export const scanManuscript = async (base64: string) => {
  const ai = getAIClient();
  if (!ai) return "Chave de API necessária.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64 } },
          { text: "Analise este manuscrito ou texto bíblico. Realize uma exegese, identifique o idioma e forneça o contexto histórico e acadêmico." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    return "Erro ao analisar manuscrito.";
  }
};

export const compareVariants = async (reference: string) => {
  const ai = getAIClient();
  if (!ai) return "Chave de API necessária.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Compare detalhadamente as variantes textuais de ${reference} entre o Codex Sinaiticus, Vaticanus e o Texto Recebido.`
    });
    return response.text;
  } catch (error) {
    return "Erro ao comparar variantes.";
  }
};

export const simulateCouncil = async (theologian1: string, theologian2: string, topic: string) => {
  const ai = getAIClient();
  if (!ai) return "Chave de API necessária.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Simule um debate teológico entre ${theologian1} e ${theologian2} sobre: "${topic}".`
    });
    return response.text;
  } catch (error) {
    return "Erro ao convocar o concílio.";
  }
};

export const harmonizeGospels = async (passage: string) => {
  const ai = getAIClient();
  if (!ai) return "Chave de API necessária.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Compare o relato de "${passage}" nos quatro Evangelhos.`,
    });
    return response.text;
  } catch (error) {
    return "Erro na harmonização.";
  }
};

export const getSensoryExperience = async (location: string, date: string) => {
  const ai = getAIClient();
  if (!ai) return "Chave de API necessária.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Descreva uma experiência sensorial imersiva em ${location} no ano/período de ${date}.`
    });
    return response.text;
  } catch (error) {
    return "Erro ao carregar crônica sensorial.";
  }
};
