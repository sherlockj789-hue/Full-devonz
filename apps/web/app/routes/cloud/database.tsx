import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";

export const meta: MetaFunction = () => [{ title: "Database — Devonz Cloud" }];

const DATABASES = [
  { name:"devonz-prod",    plan:"Pro",     size:"4.2 GB", tables:24, connections:12, status:"healthy", region:"US East",  created:"Jan 2025" },
  { name:"devonz-staging", plan:"Starter", size:"840 MB", tables:24, connections:3,  status:"healthy", region:"US East",  created:"Jan 2025" },
  { name:"analytics-db",   plan:"Pro",     size:"18.7 GB",tables:8,  connections:6,  status:"healthy", region:"EU West",  created:"Feb 2025" },
];

const TABLES = [
  { name:"users",      rows:"12,841", size:"4.2 MB",  indexes:4 },
  { name:"projects",   rows:"3,291",  size:"1.1 MB",  indexes:3 },
  { name:"chat_logs",  rows:"847,210",size:"312 MB",  indexes:2 },
  { name:"deployments",rows:"48,231", size:"18.4 MB", indexes:5 },
  { name:"api_keys",   rows:"1,284",  size:"320 KB",  indexes:2 },
  { name:"team_members",rows:"894",   size:"128 KB",  indexes:3 },
];

export default function CloudDatabasePage() {
  const [activeDb, setActiveDb] = useState("devonz-prod");
  const [queryVal, setQueryVal] = useState("SELECT * FROM users LIMIT 10;");

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/cloud" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Cloud</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary" />
          <span className="text-bolt-elements-textPrimary font-medium">Database</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Databases</h1>
            <p className="text-sm text-bolt-elements-textSecondary">PostgreSQL with real-time subscriptions, branching, and auto-migrations</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4" />New Database
          </button>
        </div>

        {/* DB selector */}
        <div className="flex gap-2 flex-wrap">
          {DATABASES.map(db => (
            <button key={db.name} onClick={() => setActiveDb(db.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${activeDb === db.name ? "border-accent-500 bg-accent-500/10 text-accent-400" : "border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>
              <div className="i-ph:database-duotone w-4 h-4" />{db.name}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeDb === db.name ? "bg-accent-500/20" : "bg-bolt-elements-background-depth-3"}`}>{db.plan}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Tables list */}
          <div className="xl:col-span-1 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-bolt-elements-borderColor flex items-center justify-between">
              <span className="text-sm font-medium text-bolt-elements-textPrimary">Tables</span>
              <span className="text-xs text-bolt-elements-textSecondary">{TABLES.length} tables</span>
            </div>
            <div className="divide-y divide-bolt-elements-borderColor">
              {TABLES.map(t => (
                <button key={t.name} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors text-left group">
                  <div className="i-ph:table-duotone w-4 h-4 text-bolt-elements-textSecondary group-hover:text-accent-400 transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-bolt-elements-textPrimary">{t.name}</div>
                    <div className="text-xs text-bolt-elements-textSecondary">{t.rows} rows · {t.size}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Query editor */}
          <div className="xl:col-span-2 space-y-4">
            <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-bolt-elements-borderColor">
                <span className="text-xs font-medium text-bolt-elements-textSecondary">SQL Query Editor</span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
                    <div className="i-ph:robot-duotone w-3 h-3" />AI Query
                  </button>
                  <button className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-accent-500 text-white hover:bg-accent-600 transition-colors">
                    <div className="i-ph:play-fill w-3 h-3" />Run
                  </button>
                </div>
              </div>
              <textarea value={queryVal} onChange={e => setQueryVal(e.target.value)} rows={5}
                className="w-full p-4 bg-transparent text-sm font-mono text-bolt-elements-textPrimary resize-none focus:outline-none leading-relaxed" />
            </div>
            <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-bolt-elements-borderColor flex items-center justify-between">
                <span className="text-xs font-medium text-bolt-elements-textSecondary">Results</span>
                <span className="text-xs text-bolt-elements-textSecondary">Run a query to see results</span>
              </div>
              <div className="p-8 flex items-center justify-center text-bolt-elements-textSecondary">
                <div className="text-center">
                  <div className="i-ph:database-duotone w-8 h-8 mx-auto mb-2 opacity-40" />
                  <div className="text-sm">Run a query to see results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
