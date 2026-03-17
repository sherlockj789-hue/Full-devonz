import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";

export const meta: MetaFunction = () => [{ title: "Functions — Devonz Cloud" }];

const FUNCTIONS = [
  { name:"api-handler",     runtime:"Node.js 20", region:"Global Edge", status:"active",  invocations:"48,291", p95:"34ms",  lastDeploy:"2m ago"  },
  { name:"auth-middleware", runtime:"Node.js 20", region:"Global Edge", status:"active",  invocations:"31,820", p95:"12ms",  lastDeploy:"1h ago"  },
  { name:"image-resize",    runtime:"Node.js 20", region:"US East",     status:"active",  invocations:"8,432",  p95:"210ms", lastDeploy:"3h ago"  },
  { name:"ai-proxy",        runtime:"Node.js 20", region:"Global Edge", status:"active",  invocations:"127,430",p95:"890ms", lastDeploy:"30m ago" },
  { name:"webhook-handler", runtime:"Node.js 20", region:"EU West",     status:"paused",  invocations:"2,110",  p95:"28ms",  lastDeploy:"2d ago"  },
  { name:"cron-cleanup",    runtime:"Node.js 20", region:"US West",     status:"active",  invocations:"720",    p95:"1.2s",  lastDeploy:"1d ago"  },
];

const RUNTIMES = ["Node.js 20","Node.js 18","Python 3.12","Go 1.22","Rust (Edge)","Deno 1.40"];

export default function CloudFunctionsPage() {
  const [tab, setTab] = useState<"list"|"new">("list");
  const [newRuntime, setNewRuntime] = useState("Node.js 20");

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link to="/cloud" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Cloud</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary" />
          <span className="text-bolt-elements-textPrimary font-medium">Functions</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Serverless Functions</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Edge-deployed functions with zero cold starts and global distribution</p>
          </div>
          <button onClick={() => setTab("new")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4" />New Function
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label:"Total Functions", value:"6",        icon:"i-ph:function-duotone",      c:"text-blue-400",   bg:"bg-blue-500/10"   },
            { label:"Invocations/day", value:"218K",     icon:"i-ph:lightning-duotone",     c:"text-yellow-400", bg:"bg-yellow-500/10" },
            { label:"Avg Cold Start",  value:"0ms",      icon:"i-ph:timer-duotone",         c:"text-green-400",  bg:"bg-green-500/10"  },
            { label:"Error Rate",      value:"0.03%",    icon:"i-ph:warning-circle-duotone",c:"text-red-400",    bg:"bg-red-500/10"    },
          ].map(s => (
            <div key={s.label} className={`rounded-xl border border-bolt-elements-borderColor ${s.bg} p-4`}>
              <div className={`${s.icon} w-4 h-4 ${s.c} mb-2`} />
              <div className="text-xl font-bold text-bolt-elements-textPrimary">{s.value}</div>
              <div className="text-xs text-bolt-elements-textSecondary">{s.label}</div>
            </div>
          ))}
        </div>

        {tab === "list" ? (
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-bolt-elements-borderColor">
                    {["Name","Runtime","Region","Status","Invocations","p95 Latency","Last Deploy",""].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-bolt-elements-borderColor">
                  {FUNCTIONS.map(fn => (
                    <tr key={fn.name} className="hover:bg-bolt-elements-item-backgroundActive transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="i-ph:function-duotone w-4 h-4 text-accent-400 shrink-0" />
                          <span className="font-mono text-sm font-medium text-bolt-elements-textPrimary">{fn.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-bolt-elements-textSecondary text-xs">{fn.runtime}</td>
                      <td className="px-4 py-3 text-bolt-elements-textSecondary text-xs">{fn.region}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${fn.status === "active" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{fn.status}</span>
                      </td>
                      <td className="px-4 py-3 text-bolt-elements-textSecondary text-xs">{fn.invocations}</td>
                      <td className="px-4 py-3 font-mono text-xs text-bolt-elements-textSecondary">{fn.p95}</td>
                      <td className="px-4 py-3 text-xs text-bolt-elements-textSecondary">{fn.lastDeploy}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Logs</button>
                          <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-6 max-w-2xl space-y-5">
            <h2 className="font-semibold text-bolt-elements-textPrimary">Create New Function</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider mb-1.5 block">Function Name</label>
                <input placeholder="my-function" className="w-full px-3 py-2.5 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-sm text-bolt-elements-textPrimary focus:outline-none focus:border-accent-500 font-mono" />
              </div>
              <div>
                <label className="text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider mb-1.5 block">Runtime</label>
                <select value={newRuntime} onChange={e => setNewRuntime(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-sm text-bolt-elements-textPrimary focus:outline-none focus:border-accent-500">
                  {RUNTIMES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider mb-1.5 block">Starter Template</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Hello World","REST API Handler","Webhook Receiver","AI Proxy","Image Processor","Cron Job"].map(t => (
                    <button key={t} className="text-left p-3 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 hover:border-accent-500 text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">{t}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setTab("list")} className="px-4 py-2 rounded-lg border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary text-sm transition-colors">Cancel</button>
                <button className="px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">Create Function</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
