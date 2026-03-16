
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Vite uses import.meta.env for environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Only initialize if API key exists to avoid immediate crash
let ai: any = null;
if (API_KEY && API_KEY !== "your_gemini_api_key_here") {
  ai = new GoogleGenAI(API_KEY);
}

export async function askNexusAssistant(query: string, products: Product[]) {
  if (!ai) {
    return "The Nexus AI is currently offline. Please provide a valid Gemini API key in your environment configuration.";
  }

  const context = products.map(p => `- ${p.name}: ${p.description} ($${p.price})`).join('\n');
  
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a tech advisor for the futuristic NEXUS STORE.
    User Query: ${query}
    Available Products:
    ${context}
    
    Keep responses concise, futuristic, and helpful. Use markdown.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    return "Connection to the neural network failed. Please check your chronal linkage (API Key).";
  }
}
