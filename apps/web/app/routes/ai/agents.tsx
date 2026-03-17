import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "AI Agents — Devonz" }];

const AGENTS = [
  { id:"1", name:"Full-Stack Feature Agent", status:"running",  task:"Building user dashboard with charts and real-time data",     progress:68, model:"Claude 3.5", steps:14, totalSteps:21, started:"8m ago"  },
  { id:"2", name:"Bug Fix Agent",            status:"done",     task:"Fixed 3 TypeScript errors in devonzBridgeService.ts",        progress:100, model:"GPT-4o",     steps:7,  totalSteps:7,  started:"32m ago" },
  { id:"3", name:"Test Writer Agent",        status:"done",     task:"Wrote 47 unit tests for auth module — 94% coverage",         progress:100, model:"GPT-4o",     steps:12, totalSteps:12, started:"2h ago"  },
  { id:"4", name:"Code Review Agent",        status:"idle",     task:"Waiting for PR #48 to be opened",                            progress:0,   model:"Claude 3.5", steps:0,  totalSteps:0,  started:"—"       },
];

const AGENT_STEPS = [
  { step:"Read project files",                 status:"done",    t:"0.8s"  },
  { step:"Analyze existing components",        status:"done",    t:"1.2s"  },
  { step:"Plan implementation",               status:"done",    t:"2.1s"  },
  { step:"Create DashboardPage component",    status:"done",    t:"4.8s"  },
  { step:"Add Chart.js integration",          status:"done",    t:"3.2s"  },
  { step:"Implement real-time WebSocket hook",status:"running", t:"…"     },
  { step:"Write unit tests",                  status:"pending", t:"—"     },
  { step:"Run linter and fix errors",         status:"pending", t:"—"     },
  { step:"Open pull request",                 status:"pending", t:"—"     },
];

export default function AIAgentsPage() {
  const [selected, setSelected] = useState("1");
  const agent = AGENTS.find(a=>a.id===selected)!;

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/ai" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">AI Hub</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Agents</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">AI Agents</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Autonomous agents that write, test, and deploy code end-to-end</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:robot-duotone w-4 h-4"/>New Agent Task
          </button>
        </div>

        {/* Hero — how it works */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-48">
              <div className="font-semibold text-bolt-elements-textPrimary mb-1">How agents work</div>
              <p className="text-xs text-bolt-elements-textSecondary leading-relaxed">Give a task in plain English. The agent reads your codebase, plans steps, writes code, runs tests, fixes errors, and opens a PR — all without you touching a keyboard.</p>
            </div>
            <div className="flex gap-2 items-center flex-wrap text-xs">
              {["📋 Plan","📝 Write","🧪 Test","🔧 Fix","🚀 PR"].map((s,i,arr)=>(
                <div key={s} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor text-bolt-elements-textPrimary font-medium">{s}</span>
                  {i<arr.length-1&&<div className="i-ph:arrow-right w-3 h-3 text-bolt-elements-textSecondary"/>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Agent list */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary">Active & Recent</h2>
            {AGENTS.map(a=>(
              <button key={a.id} onClick={()=>setSelected(a.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${selected===a.id?"border-accent-500 bg-accent-500/5":"border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/40"}`}>
                <div className="flex items-start gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.status==="running"?"bg-yellow-500 animate-pulse":a.status==="done"?"bg-green-500":"bg-bolt-elements-textSecondary"}`}/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-bolt-elements-textPrimary truncate">{a.name}</div>
                    <div className="text-xs text-bolt-elements-textSecondary mt-0.5 line-clamp-2">{a.task}</div>
                  </div>
                </div>
                {a.status!=="idle" && (
                  <div className="ml-4">
                    <div className="flex justify-between text-xs text-bolt-elements-textSecondary mb-1">
                      <span>{a.steps}/{a.totalSteps} steps</span>
                      <span>{a.progress}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-bolt-elements-background-depth-3">
                      <div className={`h-full rounded-full transition-all ${a.status==="done"?"bg-green-500":"bg-accent-500"}`} style={{width:`${a.progress}%`}}/>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Agent detail */}
          <div className="lg:col-span-2 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-bolt-elements-borderColor">
              <div>
                <div className="font-medium text-bolt-elements-textPrimary text-sm">{agent.name}</div>
                <div className="text-xs text-bolt-elements-textSecondary">{agent.model} · started {agent.started}</div>
              </div>
              <div className="flex gap-2">
                {agent.status === "running" && (
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">Stop</button>
                )}
                {agent.status === "done" && (
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors">View PR</button>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="rounded-lg bg-bolt-elements-background-depth-3 p-3 mb-4 text-sm text-bolt-elements-textSecondary italic">
                "{agent.task}"
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-3">Execution Steps</h3>
                {AGENT_STEPS.map((s,i)=>(
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      s.status==="done"?"bg-green-500/10 text-green-400":
                      s.status==="running"?"bg-yellow-500/10 text-yellow-400 animate-pulse":
                      "bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>
                      {s.status==="done"?"✓":s.status==="running"?"…":i+1}
                    </div>
                    <span className={`text-sm flex-1 ${s.status==="done"?"text-bolt-elements-textPrimary":s.status==="running"?"text-yellow-400":"text-bolt-elements-textSecondary"}`}>{s.step}</span>
                    <span className="text-xs font-mono text-bolt-elements-textSecondary">{s.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
