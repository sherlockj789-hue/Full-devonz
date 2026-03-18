import { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Search — Devonz" }];
const RESULTS = [
  { type:"file",    title:"app/routes/dashboard.tsx",  desc:"Line 14: export default function DashboardPage()",        href:"/editor",      icon:"i-ph:file-ts-duotone",  c:"text-blue-400"   },
  { type:"file",    title:"app/routes/ai.tsx",          desc:"Line 8: import { AppShell } from '~/components/layout'", href:"/editor",      icon:"i-ph:file-ts-duotone",  c:"text-blue-400"   },
  { type:"project", title:"devonz-web",                 desc:"TypeScript · Live · Updated 2m ago",                     href:"/projects/devonz-web", icon:"i-ph:folder-duotone",   c:"text-yellow-400" },
  { type:"snippet", title:"useDebounce Hook",           desc:"TypeScript · react, hooks · 142 likes",                  href:"/snippets",    icon:"i-ph:code-duotone",     c:"text-green-400"  },
  { type:"doc",     title:"Getting Started",            desc:"Documentation · Introduction to Devonz",                 href:"/docs",        icon:"i-ph:book-open-duotone", c:"text-purple-400" },
  { type:"ai",      title:"AI Chat #142",               desc:"'How do I add authentication?' · 3 messages · 2d ago",  href:"/ai/chat",     icon:"i-ph:robot-duotone",    c:"text-accent-400" },
];
const CATS = ["All","Files","Projects","Snippets","Docs","AI History"];
export default function SearchPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const results = q.length>1 ? RESULTS.filter(r=>cat==="All"||r.type===cat.toLowerCase().slice(0,-1)) : [];
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-5">
        <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Search</h1>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 i-ph:magnifying-glass w-5 h-5 text-bolt-elements-textSecondary"/>
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search files, projects, snippets, docs, AI history… (⌘K)" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textPrimary text-sm placeholder:text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500 text-base"/>
          {q&&<button onClick={()=>setQ("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"><div className="i-ph:x w-4 h-4"/></button>}
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${cat===c?"bg-accent-500 text-white":"border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{c}</button>)}
        </div>
        {q.length>1&&results.length>0&&(
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 divide-y divide-bolt-elements-borderColor overflow-hidden">
            {results.map((r,i)=>(
              <Link key={i} to={r.href} className="flex items-center gap-3 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                <div className={`${r.icon} w-5 h-5 shrink-0 ${r.c}`}/>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-bolt-elements-textPrimary font-mono truncate">{r.title}</div>
                  <div className="text-xs text-bolt-elements-textSecondary truncate">{r.desc}</div>
                </div>
                <span className="text-xs px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary capitalize shrink-0">{r.type}</span>
              </Link>
            ))}
          </div>
        )}
        {q.length>1&&results.length===0&&(
          <div className="text-center py-12 text-bolt-elements-textSecondary">
            <div className="i-ph:magnifying-glass-duotone w-10 h-10 mx-auto mb-3 opacity-40"/>
            <div className="text-sm">No results for "{q}"</div>
          </div>
        )}
        {q.length<=1&&(
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary">Recent searches</div>
            {["useDebounce hook","dashboard route","deploy to vercel","TypeScript error TS2345"].map(s=>(
              <button key={s} onClick={()=>setQ(s)} className="flex items-center gap-2 text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors w-full text-left">
                <div className="i-ph:clock-counter-clockwise w-4 h-4 shrink-0"/>{s}
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
