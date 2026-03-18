import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "AI Settings — Devonz" }];
const MODELS = [
  { id:"gpt-4o",            name:"GPT-4o",            provider:"OpenAI",    ctx:"128K", badge:null           },
  { id:"claude-3-5-sonnet", name:"Claude 3.5 Sonnet", provider:"Anthropic", ctx:"200K", badge:"Best Code"    },
  { id:"gemini-2-flash",    name:"Gemini 2.0 Flash",  provider:"Google",    ctx:"1M",   badge:"Fastest"      },
  { id:"deepseek-r1",       name:"DeepSeek R1",       provider:"DeepSeek",  ctx:"64K",  badge:"Best Reason." },
  { id:"llama-3-70b",       name:"Llama 3.3 70B",     provider:"Ollama",    ctx:"128K", badge:"Free/Local"   },
];
export default function AISettingsPage() {
  const [model, setModel] = useState("gpt-4o");
  const [completions, setCompletions] = useState(true);
  const [autoTrigger, setAutoTrigger] = useState(true);
  const [triggerDelay, setTriggerDelay] = useState(300);
  const [temp, setTemp] = useState(0.2);
  const [maxTok, setMaxTok] = useState(4096);
  const [useContext, setUseContext] = useState(true);
  const [stream, setStream] = useState(true);
  const Toggle = ({v,onChange}:{v:boolean,onChange:(b:boolean)=>void}) => (
    <button onClick={()=>onChange(!v)} className={`relative w-10 h-5 rounded-full transition-colors ${v?"bg-accent-500":"bg-bolt-elements-background-depth-3"}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${v?"translate-x-5":"translate-x-0.5"}`}/>
    </button>
  );
  return (
    <AppShell>
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/account" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Settings</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">AI Settings</span>
        </div>
        <h1 className="text-xl font-bold text-bolt-elements-textPrimary">AI Settings</h1>
        {/* Model picker */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5 space-y-4">
          <div className="font-semibold text-bolt-elements-textPrimary">Default Model</div>
          <div className="space-y-2">
            {MODELS.map(m=>(
              <button key={m.id} onClick={()=>setModel(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${model===m.id?"border-accent-500 bg-accent-500/5":"border-bolt-elements-borderColor hover:border-accent-500/40"}`}>
                <div className={`w-4 h-4 rounded-full border-2 ${model===m.id?"border-accent-500 bg-accent-500":"border-bolt-elements-textSecondary"}`}/>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-bolt-elements-textPrimary flex items-center gap-2">
                    {m.name}
                    {m.badge&&<span className="text-xs px-1.5 py-0.5 rounded-full bg-accent-500/10 text-accent-400">{m.badge}</span>}
                  </div>
                  <div className="text-xs text-bolt-elements-textSecondary">{m.provider} · {m.ctx} context</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Inline completions */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5 space-y-4">
          <div className="font-semibold text-bolt-elements-textPrimary">Inline Completions (Cursor-style)</div>
          {[
            {label:"Enable inline completions",    sub:"Show ghost-text AI suggestions as you type", v:completions, onChange:setCompletions},
            {label:"Auto-trigger suggestions",     sub:"Automatically suggest without pressing hotkey", v:autoTrigger, onChange:setAutoTrigger},
            {label:"Use project context",          sub:"Include open files and project structure for better suggestions", v:useContext, onChange:setUseContext},
            {label:"Stream responses",             sub:"Show AI output as it generates instead of waiting", v:stream, onChange:setStream},
          ].map(row=>(
            <div key={row.label} className="flex items-center justify-between">
              <div><div className="text-sm text-bolt-elements-textPrimary">{row.label}</div><div className="text-xs text-bolt-elements-textSecondary">{row.sub}</div></div>
              <Toggle v={row.v} onChange={row.onChange}/>
            </div>
          ))}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm text-bolt-elements-textPrimary">Trigger delay</span>
              <span className="text-sm text-bolt-elements-textSecondary font-mono">{triggerDelay}ms</span>
            </div>
            <input type="range" min={100} max={1000} step={50} value={triggerDelay} onChange={e=>setTriggerDelay(+e.target.value)} className="w-full accent-accent-500"/>
          </div>
        </div>
        {/* Generation params */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5 space-y-4">
          <div className="font-semibold text-bolt-elements-textPrimary">Generation Parameters</div>
          {[
            {label:"Temperature",key:"temp",val:temp,set:setTemp,min:0,max:1,step:0.1},
            {label:"Max Tokens", key:"tok", val:maxTok,set:setMaxTok,min:256,max:8192,step:256},
          ].map(p=>(
            <div key={p.key}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-bolt-elements-textPrimary">{p.label}</span>
                <span className="text-sm text-bolt-elements-textSecondary font-mono">{p.val}</span>
              </div>
              <input type="range" min={p.min} max={p.max} step={p.step} value={p.val} onChange={e=>p.set(+e.target.value)} className="w-full accent-accent-500"/>
            </div>
          ))}
        </div>
        <button className="px-6 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors">Save Settings</button>
      </div>
    </AppShell>
  );
}
