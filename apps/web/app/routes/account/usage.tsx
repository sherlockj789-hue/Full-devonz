import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Usage — Devonz" }];
const USAGE = [
  { label:"AI Tokens",       used:1284300, total:5000000, unit:"tokens",  c:"bg-accent-500",  period:"This month" },
  { label:"Storage",         used:2457,    total:20480,   unit:"MB",      c:"bg-green-500",   period:"Total"      },
  { label:"Function Calls",  used:89214,   total:500000,  unit:"calls",   c:"bg-purple-500",  period:"This month" },
  { label:"Team Seats",      used:4,       total:5,       unit:"seats",   c:"bg-orange-500",  period:"Current"    },
  { label:"Build Minutes",   used:247,     total:1000,    unit:"min",     c:"bg-blue-500",    period:"This month" },
  { label:"Deployments",     used:47,      total:1000,    unit:"deploys", c:"bg-cyan-500",    period:"This month" },
];
const HISTORY = [
  { month:"Mar 2026", tokens:"1,284,300", cost:"$1.28",  deploys:47, builds:23 },
  { month:"Feb 2026", tokens:"1,089,200", cost:"$1.09",  deploys:38, builds:19 },
  { month:"Jan 2026", tokens:"924,100",   cost:"$0.92",  deploys:31, builds:15 },
];
export default function UsagePage() {
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/account" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Account</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Usage</span>
        </div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Usage</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Token consumption, storage, and rate limits</p></div>
          <div className="text-xs px-3 py-1.5 rounded-lg border border-bolt-elements-borderColor text-bolt-elements-textSecondary bg-bolt-elements-background-depth-2">Resets Apr 1, 2026</div>
        </div>
        <div className="space-y-4">
          {USAGE.map(u=>{
            const pct = Math.round((u.used/u.total)*100);
            return (
              <div key={u.label} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div><span className="text-sm font-medium text-bolt-elements-textPrimary">{u.label}</span><span className="text-xs text-bolt-elements-textSecondary ml-2">{u.period}</span></div>
                  <div className="text-sm font-mono text-bolt-elements-textSecondary">{u.used.toLocaleString()} / {u.total.toLocaleString()} {u.unit}</div>
                </div>
                <div className="h-2 rounded-full bg-bolt-elements-background-depth-3 overflow-hidden">
                  <div className={`h-full rounded-full ${u.c} transition-all`} style={{width:`${pct}%`}}/>
                </div>
                <div className="flex justify-between mt-1">
                  <span className={`text-xs font-medium ${pct>80?"text-red-400":pct>60?"text-yellow-400":"text-bolt-elements-textSecondary"}`}>{pct}% used</span>
                  <span className="text-xs text-bolt-elements-textSecondary">{(u.total-u.used).toLocaleString()} {u.unit} remaining</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
          <div className="px-4 py-3 border-b border-bolt-elements-borderColor"><span className="text-sm font-medium text-bolt-elements-textPrimary">Monthly History</span></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-bolt-elements-borderColor">
                {["Month","AI Tokens","Cost","Deployments","Builds"].map(h=><th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider whitespace-nowrap">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-bolt-elements-borderColor">
                {HISTORY.map(h=>(
                  <tr key={h.month} className="hover:bg-bolt-elements-item-backgroundActive transition-colors">
                    <td className="px-4 py-2.5 text-bolt-elements-textPrimary font-medium">{h.month}</td>
                    <td className="px-4 py-2.5 text-bolt-elements-textSecondary font-mono">{h.tokens}</td>
                    <td className="px-4 py-2.5 text-bolt-elements-textSecondary font-mono">{h.cost}</td>
                    <td className="px-4 py-2.5 text-bolt-elements-textSecondary">{h.deploys}</td>
                    <td className="px-4 py-2.5 text-bolt-elements-textSecondary">{h.builds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
