import React, { useState, useRef, useEffect } from "react";
import { chatWithCopilot } from "../services/groqService";
import { Message, AppState } from "../types";

interface Props {
  state: AppState;
}

const Copilot: React.FC<Props> = ({ state }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Synexia Core operational. I have processed the current sales records. What mission-critical intelligence do you require?",
      timestamp: Date.now()
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingState, setThinkingState] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    "Identify the highest ROI product in the current dataset.",
    "Which segment is most vulnerable to churn this quarter?",
    "Calculate the total revenue contribution from the West region.",
    "Analyze the correlation between marketing cost and revenue."
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinkingState]);

  const handleSend = async (customInput?: string) => {
    const finalInput = customInput || input;
    if (!finalInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: finalInput,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const stages = [
      "Parsing dataset context...",
      "Mapping regional vectors...",
      "Executing comparative logic...",
      "Synthesizing strategic briefing..."
    ];

    let stageIdx = 0;
    const stageInterval = setInterval(() => {
      setThinkingState(stages[stageIdx % stages.length]);
      stageIdx++;
    }, 1200);

    try {
      const response = await chatWithCopilot(
        [...messages, userMessage],
        state.rawCsv
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Sync Failure:", error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "ALERT: Neural synchronization failure. Please verify connection.",
          timestamp: Date.now()
        }
      ]);
    } finally {
      clearInterval(stageInterval);
      setThinkingState(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto glass-panel rounded-[2rem] overflow-hidden border-slate-800 shadow-2xl">
      {/* HEADER */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center ai-gradient shadow-cyan-500/30">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-black text-white text-xl tracking-tight">
              Synexia Core
            </h2>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-400">
              Strategic Contextual AI
            </p>
          </div>
        </div>
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
          Context: Nominal
        </span>
      </div>

      {/* CHAT */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-950/20 custom-scrollbar"
      >
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-[1.5rem] px-6 py-5 ${
                m.role === "user"
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "bg-slate-900/80 text-slate-200 border border-slate-800 shadow-xl"
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">
                {m.content}
              </p>
              <div className="flex items-center gap-2 mt-4 opacity-30">
                <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
                <span className="text-[9px] uppercase tracking-widest font-bold">
                  {new Date(m.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {thinkingState && (
          <div className="flex justify-start">
            <div className="bg-slate-900/50 rounded-2xl px-6 py-5 border border-cyan-500/20">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">
                {thinkingState}
              </span>
            </div>
          </div>
        )}

        {messages.length === 1 && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {suggestedQueries.map((query, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(query)}
                className="text-left p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 transition-all"
              >
                <p className="text-xs text-slate-400 leading-snug">{query}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-8 bg-slate-900/40 border-t border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            disabled={isLoading}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Enter neural interrogation parameters..."
            className="w-full bg-[#020617] border border-slate-800 rounded-2xl py-5 pl-8 pr-16 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 p-4 bg-cyan-600 rounded-xl text-white hover:bg-cyan-500 disabled:opacity-50 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        <p className="mt-3 text-[9px] text-slate-600 font-black uppercase tracking-widest text-center">
          Neural insights are grounded in your specific data context. Verify
          critical decisions.
        </p>
      </div>
    </div>
  );
};

export default Copilot;
