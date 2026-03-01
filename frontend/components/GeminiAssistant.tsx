
import React, { useState, useRef, useEffect } from 'react';
import { askNexusAssistant } from '../services/gemini';
import { Product } from '../types';

interface GeminiAssistantProps {
  products: Product[];
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const result = await askNexusAssistant(userMsg, products);
      setMessages(prev => [...prev, { role: 'assistant', text: result || 'I am sorry, something went wrong in the matrix.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection failed. Please check your chronal linkage.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100]">
      {isOpen ? (
        <div className="w-80 h-[500px] bg-background-dark border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-surface-dark p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">robot_2</span>
              <span className="font-black uppercase tracking-widest text-sm italic">Nexus AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 hide-scrollbar">
            {messages.length === 0 && (
              <p className="text-slate-600 text-xs font-bold text-center mt-10 uppercase tracking-widest">How can I assist your evolution today?</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-xl text-sm ${m.role === 'user' ? 'bg-primary text-background-dark font-bold' : 'bg-surface-dark border border-white/5 text-slate-300 leading-relaxed'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-primary text-xs font-bold animate-pulse">Assistant is thinking...</div>}
          </div>

          <div className="p-4 border-t border-white/10 bg-surface-dark">
            <div className="flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-grow bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-700"
              />
              <button onClick={handleSend} className="bg-primary text-background-dark size-10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined font-bold">send</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary text-background-dark size-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.6)] hover:scale-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-3xl font-bold">chat_bubble</span>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
