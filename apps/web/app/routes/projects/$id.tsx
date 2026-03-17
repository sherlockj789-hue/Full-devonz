import { MetaFunction } from "@remix-run/node";
import { Link, useParams } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Project — Devonz" }];
const TABS = ["Overview","Editor","Deploy","Analytics","Settings"];
const FILES = [
  { name:"app/routes/_index.tsx", type:"tsx", size:"4.2 KB",  modified:"2m ago"  },
  { name:"app/routes/dashboard.tsx", type:"tsx", size:"6.8 KB",  modified:"5m ago"  },
  { name:"app/components/layout/AppShell.tsx", type:"tsx", size:"3.1 KB",  modified:"10m ago" },
  { name:"package.json",          type:"json",size:"2.4 KB",  modified:"1h ago"  },
  { name:"vite.config.ts",        type:"ts",  size:"1.8 KB",  modified:"2h ago"  },
  { name:"uno.config.ts",         type:"ts",  size:"5.6 KB",  modified:"1d ago"  },
];
const DEPLOYS = [
  { env:"production", url:"devonz.ai",        status:"live",    time:"2m ago",  commit:"feat: add AI hub" },
  { env:"staging",    url:"staging.devonz.ai",status:"live",    time:"1h ago",  commit:"fix: rate limit" },
  { env:"preview",    url:"pr-42.devonz.ai",  status:"building",time:"5m ago",  commit:"feat: dashboard" },
];
export default function ProjectDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState("Overview");
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/projects" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Projects</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium font-mono">{id}</span>
        </div>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center"><div className="i-ph:folder-open-duotone w-6 h-6 text-accent-400"/></div>
            <div>
              <h1 className="text-xl font-bold text-bolt-elements-textPrimary font-mono">{id}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">Live</span>
                <span className="text-xs text-bolt-elements-textSecondary">TypeScript · Updated 2m ago</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/projects/${id}/editor`} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-bolt-elements-borderColor text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
              <div className="i-ph:code-duotone w-4 h-4"/>Open Editor
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
              <div className="i-ph:rocket-launch-duotone w-4 h-4"/>Deploy
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 border-b border-bolt-elements-borderColor">
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2.5 text-sm font-medium transition-colors -mb-px ${tab===t?"border-b-2 border-accent-500 text-accent-400":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{t}</button>
          ))}
        </div>
        {tab==="Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
                <div className="px-4 py-3 border-b border-bolt-elements-borderColor flex items-center justify-between">
                  <span className="text-sm font-medium text-bolt-elements-textPrimary">Files</span>
                  <Link to={`/projects/${id}/editor`} className="text-xs text-accent-500 hover:underline">Open in editor →</Link>
                </div>
                <div className="divide-y divide-bolt-elements-borderColor">
                  {FILES.map(f=>(
                    <div key={f.name} className="flex items-center gap-3 px-4 py-2.5 hover:bg-bolt-elements-item-backgroundActive transition-colors cursor-pointer">
                      <div className="i-ph:file-code-duotone w-4 h-4 text-bolt-elements-textSecondary shrink-0"/>
                      <span className="text-xs font-mono text-bolt-elements-textPrimary flex-1 truncate">{f.name}</span>
                      <span className="text-xs text-bolt-elements-textSecondary shrink-0">{f.size}</span>
                      <span className="text-xs text-bolt-elements-textSecondary shrink-0">{f.modified}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
                <div className="px-4 py-3 border-b border-bolt-elements-borderColor"><span className="text-sm font-medium text-bolt-elements-textPrimary">Deployments</span></div>
                <div className="divide-y divide-bolt-elements-borderColor">
                  {DEPLOYS.map(d=>(
                    <div key={d.env} className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${d.status==="live"?"bg-green-500":"bg-yellow-500 animate-pulse"}`}/>
                        <span className="text-sm font-medium text-bolt-elements-textPrimary capitalize">{d.env}</span>
                      </div>
                      <a href={`https://${d.url}`} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-400 hover:underline">{d.url}</a>
                      <div className="text-xs text-bolt-elements-textSecondary mt-0.5">{d.commit} · {d.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-3">Quick Actions</div>
                <div className="space-y-2">
                  {[
                    {label:"AI Chat with Codebase", icon:"i-ph:robot-duotone",   href:`/ai/chat`},
                    {label:"Run Tests",             icon:"i-ph:test-tube-duotone",href:`/pipelines`},
                    {label:"View Logs",             icon:"i-ph:article-duotone",  href:`/cloud/logs`},
                    {label:"Team Activity",         icon:"i-ph:users-duotone",    href:`/team`},
                  ].map(a=>(
                    <Link key={a.label} to={a.href} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-bolt-elements-item-backgroundActive transition-colors group">
                      <div className={`${a.icon} w-4 h-4 text-bolt-elements-textSecondary group-hover:text-accent-400 transition-colors`}/>
                      <span className="text-sm text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary transition-colors">{a.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tab!=="Overview" && (
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-12 text-center">
            <div className="i-ph:construction-duotone w-12 h-12 text-bolt-elements-textSecondary mx-auto mb-3 opacity-50"/>
            <div className="text-bolt-elements-textSecondary text-sm">{tab} panel — coming soon</div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
