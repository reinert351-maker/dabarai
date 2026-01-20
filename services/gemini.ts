
import { GoogleGenAI, Type } from "@google/genai";

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Você é o DABAR AI, o Assistente Espiritual mais avançado do mundo. 
        O nome DABAR vem do hebraico "דבר", que significa "Palavra".
        Seu objetivo é auxiliar usuários no estudo bíblico profundo. 
        Você tem conhecimento exaustivo em línguas originais (Hebraico, Aramaico e Grego), as 20 vertentes teológicas, contexto histórico e aplicação prática.`,
        temperature: 0.7,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 2000 }
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao processar consulta teológica no DABAR AI.";
  }
};

export const searchBiblicalPlaces = async (locationName: string, userCoords?: { lat: number, lng: number }) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Forneça informações geográficas detalhadas e bíblicas sobre: ${locationName}. 
      Inclua o contexto histórico e a importância espiritual deste local sob a perspectiva do DABAR AI.`,
      config: {
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: userCoords ? {
              latitude: userCoords.lat,
              longitude: userCoords.lng
            } : undefined
          }
        }
      },
    });

    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return null;
  }
};

export const getBibleVerses = async (book: string, chapter: number, translation: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Retorne o texto completo do capítulo ${chapter} do livro de ${book} na tradução ${translation}. Retorne APENAS um JSON no formato: [{"number": 1, "text": "..."}, ...]`,
      config: { responseMimeType: "application/json" },
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [];
  }
};

export const generateBibleImage = async (prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Majestic sacred art illustration of: ${prompt}` }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    return null;
  }
};
