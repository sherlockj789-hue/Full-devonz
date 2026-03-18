/**
 * Cursor-style floating AI chat panel for the editor.
 * Can be opened with Cmd+K anywhere in the app.
 */
import { useState, useRef, useEffect } from "react";
import { classNames } from "~/utils/classNames";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string;
  codeBlocks?: Array<{ lang: string; code: string; file?: string }>;
}

const SUGGESTIONS = [
  "Fix all TypeScript errors",
  "Write tests for this file",
  "Refactor for performance",
  "Explain this code",
  "Add error handling",
  "Generate API docs",
];

interface Props {
  open: boolean;
  onClose: () => void;
  context?: string;
}

export function AIChatPanel({ open, onClose, context }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I have full context of your codebase. Ask me anything — I can write, refactor, debug, or explain code.",
      timestamp: new Date(),
      model: "GPT-4o",
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("GPT-4o");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const send = () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'll help with that. Here's what I found in your codebase:",
        timestamp: new Date(),
        model,
        codeBlocks: [{
          lang: "typescript",
          file: "app/utils/example.ts",
          code: `// Fixed version\nexport const example = (input: string): string => {\n  if (!input?.trim()) throw new Error("Input required");\n  return input.trim().toLowerCase();\n};`,
        }]
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md h-[600px] rounded-2xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-bolt-elements-borderColor shrink-0">
          <div className="flex items-center gap-2">
            <div className="i-ph:robot-duotone w-5 h-5 text-accent-400" />
            <span className="font-semibold text-sm text-bolt-elements-textPrimary">AI Chat</span>
            {context && <span className="text-xs text-bolt-elements-textSecondary bg-bolt-elements-background-depth-3 px-2 py-0.5 rounded-full">{context}</span>}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="text-xs border border-bolt-elements-borderColor rounded-lg px-2 py-1 bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500"
            >
              {["GPT-4o","Claude 3.5 Sonnet","Gemini 2.0 Flash","DeepSeek R1"].map(m => <option key={m}>{m}</option>)}
            </select>
            <button onClick={onClose} className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
              <div className="i-ph:x w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.map(msg => (
            <div key={msg.id} className={classNames("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "")}>
              <div className={classNames(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                msg.role === "assistant" ? "bg-accent-500/20 text-accent-400" : "bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"
              )}>
                {msg.role === "assistant" ? "AI" : "U"}
              </div>
              <div className={classNames("max-w-xs", msg.role === "user" ? "items-end" : "")}>
                <div className={classNames(
                  "rounded-xl px-3 py-2 text-sm",
                  msg.role === "assistant"
                    ? "rounded-tl-none bg-bolt-elements-background-depth-3 text-bolt-elements-textPrimary"
                    : "rounded-tr-none bg-accent-500/20 text-bolt-elements-textPrimary"
                )}>
                  {msg.content}
                </div>
                {msg.codeBlocks?.map((cb, i) => (
                  <div key={i} className="mt-2 rounded-xl border border-bolt-elements-borderColor overflow-hidden">
                    {cb.file && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-bolt-elements-background-depth-2 border-b border-bolt-elements-borderColor">
                        <div className="i-ph:file-code-duotone w-3 h-3 text-bolt-elements-textSecondary" />
                        <span className="font-mono text-xs text-bolt-elements-textSecondary">{cb.file}</span>
                        <button className="ml-auto text-xs text-accent-500 hover:underline">Apply</button>
                      </div>
                    )}
                    <pre className="p-3 text-xs font-mono text-bolt-elements-textPrimary bg-bolt-elements-background-depth-1 overflow-x-auto leading-relaxed">
                      {cb.code}
                    </pre>
                  </div>
                ))}
                {msg.model && <div className="text-xs text-bolt-elements-textSecondary mt-1">{msg.model}</div>}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-xs font-bold shrink-0">AI</div>
              <div className="rounded-xl rounded-tl-none bg-bolt-elements-background-depth-3 px-3 py-2">
                <div className="flex gap-1">
                  {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-bolt-elements-textSecondary animate-bounce" style={{animationDelay:`${i*150}ms`}} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-3 py-2 border-t border-bolt-elements-borderColor shrink-0 overflow-x-auto">
          <div className="flex gap-1.5 w-max">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => setInput(s)}
                className="whitespace-nowrap text-xs px-2.5 py-1 rounded-lg bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-item-backgroundActive transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 shrink-0">
          <div className="flex items-end gap-2 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 p-2 focus-within:border-accent-500 transition-colors">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask about your code… (Enter to send)"
              rows={2}
              className="flex-1 resize-none bg-transparent text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none px-2 leading-relaxed"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="shrink-0 w-8 h-8 rounded-lg bg-accent-500 text-white flex items-center justify-center hover:bg-accent-600 transition-colors disabled:opacity-40"
            >
              <div className="i-ph:arrow-up w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
