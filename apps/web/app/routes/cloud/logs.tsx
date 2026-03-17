import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Logs — Devonz Cloud" }];
const LOGS = [
  { t:"21:09:32.441", level:"INFO",  src:"api-handler",     msg:"POST /api/chat 200 OK — 843ms" },
  { t:"21:09:31.228", level:"INFO",  src:"auth-middleware",  msg:"Token validated: user_abc123" },
  { t:"21:09:31.001", level:"INFO",  src:"api-handler",     msg:"GET /api/models 200 OK — 12ms" },
  { t:"21:09:28.774", level:"WARN",  src:"ai-proxy",        msg:"OpenAI rate limit approaching: 85% of TPM quota" },
  { t:"21:09:25.110", level:"ERROR", src:"mobile-app",      msg:"Unhandled exception: TypeError: Cannot read property 'id'" },
  { t:"21:09:22.882", level:"INFO",  src:"cron-cleanup",    msg:"Deleted 1,284 stale session records" },
  { t:"21:09:20.003", level:"INFO",  src:"api-handler",     msg:"POST /api/deploy 201 Created — 2.1s" },
  { t:"21:09:18.441", level:"DEBUG", src:"image-resize",    msg:"Resized image: 4096x2160 → 800x450 (webp)" },
  { t:"21:09:15.229", level:"INFO",  src:"webhook-handler", msg:"Stripe webhook: payment_intent.succeeded" },
  { t:"21:09:12.001", level:"INFO",  src:"auth-middleware",  msg:"New session created: user_xyz456" },
  { t:"21:09:10.774", level:"ERROR", src:"ai-proxy",        msg:"Anthropic API timeout after 30s — retrying (1/3)" },
  { t:"21:09:08.002", level:"INFO",  src:"api-handler",     msg:"GET /api/projects 200 OK — 8ms" },
];
const LEVEL_COLORS: Record<string,string> = {
  INFO:"text-blue-400 bg-blue-500/10",
  WARN:"text-yellow-400 bg-yellow-500/10",
  ERROR:"text-red-400 bg-red-500/10",
  DEBUG:"text-green-400 bg-green-500/10",
};
export default function CloudLogsPage() {
  const [filter, setFilter] = useState("All");
  const [live, setLive] = useState(true);
  const list = LOGS.filter(l=>filter==="All"||l.level===filter);
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/cloud" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Cloud</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Logs</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Log Viewer</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Real-time unified logs across all services and functions</p>
          </div>
          <button onClick={()=>setLive(l=>!l)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${live?"bg-green-500/10 text-green-400 border border-green-500/20":"border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>
            <div className={`w-2 h-2 rounded-full ${live?"bg-green-500 animate-pulse":"bg-bolt-elements-textSecondary"}`}/>
            {live?"Live":"Paused"}
          </button>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex gap-1 p-1 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2">
            {["All","INFO","WARN","ERROR","DEBUG"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter===f?"bg-accent-500 text-white":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{f}</button>
            ))}
          </div>
          <div className="relative flex-1 min-w-40">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 i-ph:magnifying-glass w-4 h-4 text-bolt-elements-textSecondary"/>
            <input placeholder="Filter by source, message…" className="w-full pl-9 pr-4 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500"/>
          </div>
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 overflow-hidden font-mono">
          <div className="px-4 py-2.5 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 flex items-center gap-3 text-xs text-bolt-elements-textSecondary">
            <span>Showing {list.length} log entries</span>
            {live && <span className="flex items-center gap-1 text-green-400"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>Live streaming</span>}
          </div>
          <div className="divide-y divide-bolt-elements-borderColor/50">
            {list.map((l,i)=>(
              <div key={i} className="flex items-start gap-3 px-4 py-2 hover:bg-bolt-elements-item-backgroundActive transition-colors text-xs">
                <span className="text-bolt-elements-textSecondary shrink-0 tabular-nums">{l.t}</span>
                <span className={`shrink-0 px-1.5 py-0.5 rounded text-xs font-bold ${LEVEL_COLORS[l.level]}`}>{l.level}</span>
                <span className="text-bolt-elements-textSecondary shrink-0">{l.src}</span>
                <span className={`flex-1 ${l.level==="ERROR"?"text-red-300":l.level==="WARN"?"text-yellow-300":"text-bolt-elements-textPrimary"}`}>{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
