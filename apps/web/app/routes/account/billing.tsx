import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Billing — Devonz" }];
const PLANS = [
  { name:"Starter", price:"$0",  period:"forever", features:["1 project","100K AI tokens/mo","Community support","Basic deployments"],          current:false },
  { name:"Pro",     price:"$20", period:"month",   features:["Unlimited projects","5M AI tokens/mo","Priority support","Custom domains","Team (5 seats)"], current:true  },
  { name:"Team",    price:"$60", period:"month",   features:["Unlimited projects","20M AI tokens/mo","Dedicated support","SSO","Team (20 seats)","Analytics"], current:false },
];
const INVOICES = [
  { date:"Mar 1, 2026",  amount:"$20.00", status:"paid", plan:"Pro" },
  { date:"Feb 1, 2026",  amount:"$20.00", status:"paid", plan:"Pro" },
  { date:"Jan 1, 2026",  amount:"$20.00", status:"paid", plan:"Pro" },
];
export default function BillingPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/account" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Account</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Billing</span>
        </div>
        <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Billing & Plans</h1>
          <p className="text-sm text-bolt-elements-textSecondary">Manage your subscription and payment methods</p></div>
        {/* Current usage */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-bolt-elements-textPrimary">Pro Plan</div>
              <div className="text-sm text-bolt-elements-textSecondary">Renews March 1, 2027 · $20/month</div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-accent-500/10 text-accent-400 font-medium">Current Plan</span>
          </div>
          <div className="space-y-2">
            {[
              {label:"AI Tokens", used:"1,284,300", total:"5,000,000", pct:25},
              {label:"Storage",   used:"2.4 GB",    total:"20 GB",     pct:12},
              {label:"Team seats",used:"4",          total:"5",         pct:80},
            ].map(r=>(
              <div key={r.label}>
                <div className="flex justify-between text-xs text-bolt-elements-textSecondary mb-1">
                  <span>{r.label}</span>
                  <span>{r.used} / {r.total}</span>
                </div>
                <div className="h-1.5 rounded-full bg-bolt-elements-background-depth-3">
                  <div className={`h-full rounded-full ${r.pct>80?"bg-red-500":r.pct>60?"bg-yellow-500":"bg-accent-500"}`} style={{width:`${r.pct}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map(p=>(
            <div key={p.name} className={`rounded-xl border p-4 ${p.current?"border-accent-500 bg-accent-500/5":"border-bolt-elements-borderColor bg-bolt-elements-background-depth-2"}`}>
              {p.current&&<div className="text-xs text-accent-400 font-semibold mb-2">✓ Current Plan</div>}
              <div className="font-bold text-bolt-elements-textPrimary text-lg">{p.name}</div>
              <div className="flex items-baseline gap-1 mt-1 mb-3">
                <span className="text-2xl font-bold text-bolt-elements-textPrimary">{p.price}</span>
                <span className="text-xs text-bolt-elements-textSecondary">/{p.period}</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {p.features.map(f=><li key={f} className="flex items-center gap-2 text-xs text-bolt-elements-textSecondary"><div className="i-ph:check-circle w-3.5 h-3.5 text-green-400"/>{f}</li>)}
              </ul>
              <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${p.current?"border border-bolt-elements-borderColor text-bolt-elements-textSecondary cursor-default":"bg-accent-500 text-white hover:bg-accent-600"}`} disabled={p.current}>
                {p.current?"Current":"Upgrade"}
              </button>
            </div>
          ))}
        </div>
        {/* Invoices */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
          <div className="px-4 py-3 border-b border-bolt-elements-borderColor"><span className="text-sm font-medium text-bolt-elements-textPrimary">Invoice History</span></div>
          <div className="divide-y divide-bolt-elements-borderColor">
            {INVOICES.map((inv,i)=>(
              <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                <span className="text-sm text-bolt-elements-textPrimary flex-1">{inv.date}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{inv.plan}</span>
                <span className="text-sm font-mono text-bolt-elements-textPrimary">{inv.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">{inv.status}</span>
                <button className="text-xs text-accent-500 hover:underline">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
