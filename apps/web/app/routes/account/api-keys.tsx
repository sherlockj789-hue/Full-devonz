import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "API Keys — Devonz" }];
const KEYS = [
  { name:"Production Key",  prefix:"dvz_live_",  scopes:["read","write","deploy"], created:"Jan 10, 2025", lastUsed:"2m ago",  status:"active" },
  { name:"CI/CD Key",       prefix:"dvz_live_",  scopes:["deploy","read"],         created:"Jan 15, 2025", lastUsed:"1h ago",  status:"active" },
  { name:"Read-Only Key",   prefix:"dvz_live_",  scopes:["read"],                  created:"Feb 1, 2025",  lastUsed:"3d ago",  status:"active" },
  { name:"Legacy Key",      prefix:"dvz_live_",  scopes:["read","write"],          created:"Dec 1, 2024",  lastUsed:"30d ago", status:"inactive"},
];
export default function APIKeysPage() {
  const [show, setShow] = useState<Record<number,boolean>>({});
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/account" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Account</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">API Keys</span>
        </div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">API Keys</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Manage programmatic access to your Devonz account</p></div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>Generate Key</button>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs">
          <div className="i-ph:warning-duotone w-4 h-4 shrink-0"/>
          API keys grant full account access. Never commit them to source control or share them publicly.
        </div>
        <div className="space-y-3">
          {KEYS.map((k,i)=>(
            <div key={i} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium text-bolt-elements-textPrimary text-sm">{k.name}</div>
                  <div className="text-xs text-bolt-elements-textSecondary mt-0.5">Created {k.created} · Last used {k.lastUsed}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${k.status==="active"?"bg-green-500/10 text-green-400":"bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>{k.status}</span>
                  <button className="text-xs px-2 py-1 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">Revoke</button>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-bolt-elements-background-depth-1 rounded-lg px-3 py-2">
                <code className="text-xs font-mono text-bolt-elements-textSecondary flex-1">{show[i]?`${k.prefix}${"x".repeat(40)}`:`${k.prefix}${"•".repeat(40)}`}</code>
                <button onClick={()=>setShow(p=>({...p,[i]:!p[i]}))} className="text-xs text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">{show[i]?"Hide":"Show"}</button>
                <button className="text-xs text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors flex items-center gap-1">
                  <div className="i-ph:copy w-3 h-3"/>Copy
                </button>
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {k.scopes.map(s=><span key={s} className="text-xs px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
