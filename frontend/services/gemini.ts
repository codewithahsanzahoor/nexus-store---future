
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askNexusAssistant(query: string, products: Product[]) {
  const context = products.map(p => `- ${p.name}: ${p.description} ($${p.price})`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a tech advisor for the futuristic NEXUS STORE.
    User Query: ${query}
    Available Products:
    ${context}
    
    Keep responses concise, futuristic, and helpful. Use markdown.`,
  });

  return response.text;
}
