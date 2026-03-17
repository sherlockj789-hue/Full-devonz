import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Secrets — Devonz Cloud" }];
const SECRETS = [
  { name:"OPENAI_API_KEY",      env:["production","staging"], updated:"2h ago",   type:"API Key"  },
  { name:"ANTHROPIC_API_KEY",   env:["production","staging"], updated:"2h ago",   type:"API Key"  },
  { name:"DATABASE_URL",        env:["production"],           updated:"1d ago",   type:"Connection String" },
  { name:"DATABASE_URL",        env:["staging"],              updated:"1d ago",   type:"Connection String" },
  { name:"GITHUB_PAT",          env:["production","staging"], updated:"3d ago",   type:"Token"    },
  { name:"STRIPE_SECRET_KEY",   env:["production"],           updated:"5d ago",   type:"API Key"  },
  { name:"STRIPE_WEBHOOK_SECRET",env:["production"],          updated:"5d ago",   type:"Secret"   },
  { name:"NEXTAUTH_SECRET",     env:["production","staging"], updated:"1wk ago",  type:"Secret"   },
  { name:"SUPABASE_SERVICE_KEY",env:["production","staging"], updated:"2wk ago",  type:"API Key"  },
];
export default function CloudSecretsPage() {
  const [show, setShow] = useState<Record<string,boolean>>({});
  const [q, setQ] = useState("");
  const list = SECRETS.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/cloud" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Cloud</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Secrets</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Secrets & Env Vars</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Encrypted at rest — synced to all deployments automatically</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>New Secret
          </button>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs">
          <div className="i-ph:lock-key-duotone w-4 h-4 shrink-0"/>
          All secrets are AES-256 encrypted at rest. Values are never logged or exposed in build output.
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 i-ph:magnifying-glass w-4 h-4 text-bolt-elements-textSecondary"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Filter secrets…" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500"/>
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden divide-y divide-bolt-elements-borderColor">
          {list.map((s,i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors group">
              <div className="i-ph:lock-key-duotone w-4 h-4 text-orange-400 shrink-0"/>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm font-medium text-bolt-elements-textPrimary">{s.name}</div>
                <div className="text-xs text-bolt-elements-textSecondary mt-0.5">
                  {show[`${i}`] ? "sk-••••••••••••••••••••••••••••••••" : "••••••••••••••••••••••••"}
                </div>
              </div>
              <div className="hidden sm:flex gap-1 flex-wrap">
                {s.env.map(e => <span key={e} className={`text-xs px-1.5 py-0.5 rounded-full ${e==="production"?"bg-green-500/10 text-green-400":"bg-blue-500/10 text-blue-400"}`}>{e}</span>)}
              </div>
              <span className="text-xs text-bolt-elements-textSecondary hidden md:block px-2 py-0.5 rounded bg-bolt-elements-background-depth-3">{s.type}</span>
              <span className="text-xs text-bolt-elements-textSecondary shrink-0">{s.updated}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={()=>setShow(p=>({...p,[`${i}`]:!p[`${i}`]}))} className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
                  {show[`${i}`]?"Hide":"Show"}
                </button>
                <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
