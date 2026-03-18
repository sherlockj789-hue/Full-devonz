import { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Editor Workspace — Devonz" }];
const FILES_TREE = [
  { name:"app", type:"dir", depth:0, open:true },
  { name:"routes", type:"dir", depth:1, open:true },
  { name:"_index.tsx",    type:"file", depth:2, icon:"i-ph:file-ts-duotone",  c:"text-blue-400"   },
  { name:"dashboard.tsx", type:"file", depth:2, icon:"i-ph:file-ts-duotone",  c:"text-blue-400"   },
  { name:"components",    type:"dir",  depth:1, open:false },
  { name:"layout",        type:"dir",  depth:2, open:false },
  { name:"styles", type:"dir", depth:1, open:false },
  { name:"package.json",  type:"file", depth:0, icon:"i-ph:file-js-duotone",  c:"text-yellow-400" },
  { name:"vite.config.ts",type:"file", depth:0, icon:"i-ph:file-ts-duotone",  c:"text-blue-400"   },
  { name:"README.md",     type:"file", depth:0, icon:"i-ph:file-text-duotone",c:"text-gray-400"   },
];
const DEMO_CODE = `import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";

export const meta: MetaFunction = () => [
  { title: "Dashboard — Devonz" },
];

// ✨ AI suggestion: add real-time data fetching
export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </AppShell>
  );
}`;
const ERRORS = [
  { line:4, col:3, msg:"'title' is possibly undefined", sev:"warning" },
];
export default function EditorWorkspacePage() {
  const [activeFile, setActiveFile] = useState("dashboard.tsx");
  const [code, setCode] = useState(DEMO_CODE);
  const [showChat, setShowChat] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [termOutput, setTermOutput] = useState("$ ");
  const [sidePanel, setSidePanel] = useState<"explorer"|"search"|"git"|"ai">("explorer");
  return (
    <div className="flex h-screen w-screen bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary overflow-hidden flex-col">
      {/* Topbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 shrink-0">
        <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60"/><div className="w-3 h-3 rounded-full bg-yellow-500/60"/><div className="w-3 h-3 rounded-full bg-green-500/60"/></div>
        <span className="text-xs font-mono text-bolt-elements-textSecondary ml-2">devonz-web</span>
        <div className="flex-1"/>
        {/* Open tabs */}
        <div className="flex gap-1">
          {["_index.tsx","dashboard.tsx","package.json"].map(f=>(
            <button key={f} onClick={()=>setActiveFile(f)} className={`text-xs px-3 py-1 rounded font-mono transition-colors ${activeFile===f?"bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary border-t-2 border-t-accent-500":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{f}</button>
          ))}
        </div>
        <div className="flex-1"/>
        <div className="flex items-center gap-1">
          <button onClick={()=>setShowChat(c=>!c)} className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${showChat?"bg-accent-500/20 text-accent-400":"bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>
            <div className="i-ph:robot-duotone w-3.5 h-3.5"/>AI Chat
          </button>
          <button className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors">
            <div className="i-ph:rocket-launch-duotone w-3.5 h-3.5"/>Deploy
          </button>
        </div>
      </div>
      {/* Main area */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Activity bar */}
        <div className="w-10 flex flex-col items-center py-2 gap-1 border-r border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 shrink-0">
          {[
            {id:"explorer",icon:"i-ph:files-duotone"},
            {id:"search",  icon:"i-ph:magnifying-glass-duotone"},
            {id:"git",     icon:"i-ph:git-branch-duotone"},
            {id:"ai",      icon:"i-ph:robot-duotone"},
          ].map(p=>(
            <button key={p.id} onClick={()=>setSidePanel(p.id as any)} title={p.id}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${sidePanel===p.id?"bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>
              <div className={`${p.icon} w-4 h-4`}/>
            </button>
          ))}
          <div className="flex-1"/>
          {[
            {icon:"i-ph:terminal-window-duotone", action:()=>setShowTerminal(t=>!t), title:"terminal"},
            {icon:"i-ph:gear-duotone",             action:()=>{},                    title:"settings"},
          ].map(p=>(
            <button key={p.title} onClick={p.action} title={p.title} className="w-8 h-8 rounded-lg flex items-center justify-center text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
              <div className={`${p.icon} w-4 h-4`}/>
            </button>
          ))}
        </div>
        {/* Side panel */}
        <div className="w-52 border-r border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 flex flex-col overflow-hidden shrink-0">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary border-b border-bolt-elements-borderColor">{sidePanel}</div>
          {sidePanel==="explorer"&&(
            <div className="flex-1 overflow-y-auto py-1">
              {FILES_TREE.map((f,i)=>(
                <div key={i} onClick={()=>f.type==="file"&&setActiveFile(f.name)}
                  className={`flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-bolt-elements-item-backgroundActive transition-colors ${f.type==="file"&&activeFile===f.name?"bg-bolt-elements-item-backgroundActive":""}`}
                  style={{paddingLeft:`${8+(f.depth*12)}px`}}>
                  {f.type==="dir"
                    ? <div className={`i-ph:caret-down-duotone w-3 h-3 text-bolt-elements-textSecondary ${!f.open?"-rotate-90":""}`}/>
                    : <div className={`${f.icon||"i-ph:file-duotone"} w-3.5 h-3.5 ${f.c||"text-bolt-elements-textSecondary"} shrink-0`}/>
                  }
                  <span className={`text-xs truncate ${f.type==="dir"?"text-bolt-elements-textPrimary font-medium":"text-bolt-elements-textSecondary"}`}>{f.name}</span>
                </div>
              ))}
            </div>
          )}
          {sidePanel==="ai"&&(
            <div className="p-3 space-y-2 flex-1 overflow-y-auto">
              <div className="text-xs text-bolt-elements-textSecondary mb-2">Quick AI actions for {activeFile}</div>
              {["Fix all errors","Write tests","Add types","Refactor","Explain code","Add docs"].map(a=>(
                <button key={a} className="w-full text-left text-xs px-3 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-bolt-elements-textSecondary hover:border-accent-500/50 hover:text-bolt-elements-textPrimary transition-colors">{a}</button>
              ))}
              {ERRORS.length>0&&(
                <div className="mt-3">
                  <div className="text-xs font-semibold text-bolt-elements-textSecondary mb-2">Issues ({ERRORS.length})</div>
                  {ERRORS.map((e,i)=>(
                    <div key={i} className="p-2 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-400 mb-1">{e.msg} (L{e.line})</div>
                  ))}
                </div>
              )}
            </div>
          )}
          {sidePanel==="search"&&(
            <div className="p-3">
              <input placeholder="Search files…" className="w-full px-2 py-1.5 rounded border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-xs text-bolt-elements-textPrimary focus:outline-none focus:border-accent-500"/>
            </div>
          )}
          {sidePanel==="git"&&(
            <div className="p-3 space-y-2">
              <div className="text-xs text-bolt-elements-textSecondary">Branch: <span className="text-bolt-elements-textPrimary font-mono">main</span></div>
              <div className="text-xs text-bolt-elements-textSecondary">3 staged changes</div>
              <button className="w-full py-1.5 rounded-lg bg-accent-500/10 text-accent-400 text-xs hover:bg-accent-500/20 transition-colors">Commit & Push</button>
            </div>
          )}
        </div>
        {/* Editor + chat pane */}
        <div className="flex flex-1 overflow-hidden min-w-0">
          {/* Code area */}
          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <textarea
              value={code} onChange={e=>setCode(e.target.value)}
              className="flex-1 p-4 bg-bolt-elements-background-depth-1 text-sm font-mono text-bolt-elements-textPrimary resize-none focus:outline-none leading-7 overflow-auto"
              spellCheck={false}
            />
            {/* Status bar */}
            <div className="flex items-center gap-4 px-4 py-1 bg-accent-500 text-white text-xs shrink-0">
              <span className="flex items-center gap-1"><div className="i-ph:git-branch w-3 h-3"/>main</span>
              {ERRORS.length>0&&<span className="flex items-center gap-1"><div className="i-ph:warning w-3 h-3"/>{ERRORS.length} warning</span>}
              <span className="ml-auto">TypeScript · UTF-8 · LF</span>
              <span className="flex items-center gap-1"><div className="i-ph:robot-duotone w-3 h-3"/>AI Ready</span>
            </div>
            {/* Terminal */}
            {showTerminal&&(
              <div className="h-36 border-t border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 flex flex-col shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-2">
                  <span className="text-xs text-bolt-elements-textSecondary font-semibold">TERMINAL</span>
                  <div className="flex-1"/>
                  <button onClick={()=>setShowTerminal(false)} className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"><div className="i-ph:x w-3.5 h-3.5"/></button>
                </div>
                <div className="flex-1 p-2 font-mono text-xs text-green-400 overflow-auto">
                  <pre>{termOutput}</pre>
                </div>
              </div>
            )}
          </div>
          {/* AI chat side panel */}
          {showChat&&(
            <div className="w-80 border-l border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 flex flex-col overflow-hidden shrink-0">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-bolt-elements-borderColor">
                <div className="flex items-center gap-2"><div className="i-ph:robot-duotone w-4 h-4 text-accent-400"/><span className="text-xs font-semibold text-bolt-elements-textPrimary">AI Chat</span></div>
                <button onClick={()=>setShowChat(false)} className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"><div className="i-ph:x w-4 h-4"/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 min-h-0">
                <div className="flex gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                  <div className="rounded-xl rounded-tl-none bg-bolt-elements-background-depth-3 px-3 py-2 text-xs text-bolt-elements-textPrimary">
                    I see you're editing <span className="font-mono text-accent-400">{activeFile}</span>. I have full context — what do you need?
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-bolt-elements-borderColor shrink-0">
                <div className="flex gap-1 mb-1.5 overflow-x-auto pb-1">
                  {["Fix errors","Write tests","Explain","Refactor"].map(s=>(
                    <button key={s} className="shrink-0 text-xs px-2 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary whitespace-nowrap transition-colors">{s}</button>
                  ))}
                </div>
                <div className="flex gap-1.5 items-end rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 p-1.5 focus-within:border-accent-500">
                  <textarea rows={2} placeholder="Ask about this file…" className="flex-1 bg-transparent text-xs text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary resize-none focus:outline-none px-1 leading-relaxed"/>
                  <button className="shrink-0 w-6 h-6 rounded bg-accent-500 text-white flex items-center justify-center hover:bg-accent-600 transition-colors">
                    <div className="i-ph:arrow-up w-3 h-3"/>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
