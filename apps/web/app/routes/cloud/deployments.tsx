import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Deployments — Devonz Cloud" }];
const DEPLOYS = [
  { id:"dpl_1a2b3c", project:"devonz-web",  env:"production", status:"success", branch:"main",           commit:"feat: add AI hub page",            duration:"3m 12s", time:"2m ago",   url:"devonz.ai"         },
  { id:"dpl_2b3c4d", project:"devonz-web",  env:"preview",    status:"success", branch:"feat/dashboard",  commit:"feat: add dashboard route",         duration:"2m 48s", time:"45m ago",  url:"feat-dashboard.devonz.ai" },
  { id:"dpl_3c4d5e", project:"api-gateway", env:"production", status:"success", branch:"main",            commit:"fix: rate limiting headers",        duration:"1m 32s", time:"1h ago",   url:"api.devonz.ai"     },
  { id:"dpl_4d5e6f", project:"mobile-app",  env:"preview",    status:"failed",  branch:"feat/dark-mode",  commit:"chore: update expo sdk",            duration:"7m 03s", time:"3h ago",   url:null                },
  { id:"dpl_5e6f7g", project:"api-gateway", env:"staging",    status:"success", branch:"develop",         commit:"test: add integration tests",       duration:"2m 10s", time:"5h ago",   url:"staging-api.devonz.ai" },
  { id:"dpl_6f7g8h", project:"devonz-web",  env:"production", status:"success", branch:"main",            commit:"perf: optimize bundle size",        duration:"3m 55s", time:"1d ago",   url:"devonz.ai"         },
];
export default function CloudDeploymentsPage() {
  const [filter, setFilter] = useState("All");
  const list = DEPLOYS.filter(d => filter==="All" || d.status===filter || d.env===filter);
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/cloud" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Cloud</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Deployments</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Deployments</h1>
            <p className="text-sm text-bolt-elements-textSecondary">All builds with logs, previews, and one-click rollbacks</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:rocket-launch w-4 h-4"/>Deploy Now
          </button>
        </div>
        <div className="flex gap-1 p-1 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 w-fit">
          {["All","success","failed","production","preview"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${filter===f?"bg-accent-500 text-white":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{f}</button>
          ))}
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 divide-y divide-bolt-elements-borderColor overflow-hidden">
          {list.map(d=>(
            <div key={d.id} className="px-4 py-4 hover:bg-bolt-elements-item-backgroundActive transition-colors group">
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-3 h-3 rounded-full shrink-0 ${d.status==="success"?"bg-green-500":"bg-red-500"}`}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-bolt-elements-textPrimary text-sm">{d.project}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${d.env==="production"?"bg-green-500/10 text-green-400":d.env==="staging"?"bg-blue-500/10 text-blue-400":"bg-purple-500/10 text-purple-400"}`}>{d.env}</span>
                    <span className="font-mono text-xs text-bolt-elements-textSecondary">{d.id}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-bolt-elements-textSecondary flex-wrap">
                    <span className="flex items-center gap-1"><div className="i-ph:git-branch w-3 h-3"/>{d.branch}</span>
                    <span className="flex items-center gap-1"><div className="i-ph:git-commit w-3 h-3"/>{d.commit}</span>
                    <span className="flex items-center gap-1"><div className="i-ph:clock w-3 h-3"/>{d.duration}</span>
                    <span>{d.time}</span>
                  </div>
                  {d.url && <a href={`https://${d.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-accent-400 hover:underline mt-1">
                    <div className="i-ph:arrow-square-out w-3 h-3"/>{d.url}
                  </a>}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button className="text-xs px-2.5 py-1 rounded border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Logs</button>
                  <button className="text-xs px-2.5 py-1 rounded border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Rollback</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
