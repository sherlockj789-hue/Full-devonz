import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Monitoring — Devonz Cloud" }];
const CHECKS = [
  { name:"API Gateway",         url:"https://api.devonz.ai/health",  status:"up", uptime:"99.97%", p95:"42ms",  lastCheck:"12s ago" },
  { name:"Web App",             url:"https://devonz.ai",             status:"up", uptime:"99.99%", p95:"89ms",  lastCheck:"12s ago" },
  { name:"AI Inference",        url:"https://ai.devonz.ai/ping",     status:"up", uptime:"99.91%", p95:"1.2s",  lastCheck:"12s ago" },
  { name:"WebContainer Runtime",url:"https://wc.devonz.ai/ready",    status:"up", uptime:"99.85%", p95:"234ms", lastCheck:"12s ago" },
  { name:"Database (Primary)",  url:"postgresql://…",                status:"up", uptime:"100%",   p95:"8ms",   lastCheck:"12s ago" },
  { name:"Storage CDN",         url:"https://cdn.devonz.ai",         status:"up", uptime:"100%",   p95:"31ms",  lastCheck:"12s ago" },
];
const HIST = Array.from({length:24},(_,i)=>({h:i,p95:Math.floor(Math.random()*80+20),rps:Math.floor(Math.random()*500+100)}));
export default function CloudMonitoringPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/cloud" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Cloud</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Monitoring</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Monitoring</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Uptime, latency, and traffic metrics across all services</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>All Healthy
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {label:"Overall Uptime", value:"99.97%", c:"text-green-400",  bg:"bg-green-500/10"},
            {label:"Avg Latency",    value:"156ms",  c:"text-blue-400",   bg:"bg-blue-500/10"},
            {label:"Req/min",        value:"4,820",  c:"text-purple-400", bg:"bg-purple-500/10"},
            {label:"Error Rate",     value:"0.03%",  c:"text-orange-400", bg:"bg-orange-500/10"},
          ].map(s=>(
            <div key={s.label} className={`rounded-xl border border-bolt-elements-borderColor ${s.bg} p-4`}>
              <div className={`text-2xl font-bold ${s.c}`}>{s.value}</div>
              <div className="text-xs text-bolt-elements-textSecondary mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        {/* Latency chart */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5">
          <h2 className="text-sm font-medium text-bolt-elements-textPrimary mb-4">p95 Latency — Last 24 hours</h2>
          <div className="flex items-end gap-1 h-28">
            {HIST.map(h=>(
              <div key={h.h} className="flex-1 flex flex-col items-center gap-0.5" title={`${h.h}:00 — ${h.p95}ms`}>
                <div className="w-full rounded-t hover:opacity-80 transition-opacity cursor-pointer bg-accent-500/50" style={{height:`${(h.p95/100)*100}%`}}/>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-bolt-elements-textSecondary mt-2">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
          </div>
        </div>
        {/* Uptime checks */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
          <div className="px-4 py-3 border-b border-bolt-elements-borderColor"><span className="text-sm font-medium text-bolt-elements-textPrimary">Uptime Checks</span></div>
          <div className="divide-y divide-bolt-elements-borderColor">
            {CHECKS.map(c=>(
              <div key={c.name} className="flex items-center gap-4 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                <div className={`w-3 h-3 rounded-full shrink-0 ${c.status==="up"?"bg-green-500":"bg-red-500"}`}/>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-bolt-elements-textPrimary">{c.name}</div>
                  <div className="text-xs text-bolt-elements-textSecondary font-mono truncate">{c.url}</div>
                </div>
                <div className="hidden sm:flex gap-4 text-xs text-bolt-elements-textSecondary">
                  <span className="text-green-400 font-medium">{c.uptime} uptime</span>
                  <span>p95: <span className="font-mono">{c.p95}</span></span>
                </div>
                <span className="text-xs text-bolt-elements-textSecondary shrink-0">{c.lastCheck}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
