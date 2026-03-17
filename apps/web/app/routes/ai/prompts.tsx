import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Prompt Library — Devonz" }];
const CATS = ["All","Code Generation","Refactoring","Testing","Documentation","Debugging","Architecture"];
const PROMPTS = [
  { title:"Generate Full CRUD Route",    cat:"Code Generation", uses:1240, icon:"i-ph:code-duotone",          vars:["entity","framework"],     preview:"Generate a complete CRUD REST API route for {{entity}} using {{framework}} with TypeScript, input validation, error handling, and JSDoc comments." },
  { title:"Refactor to Clean Architecture",cat:"Refactoring",   uses:890,  icon:"i-ph:arrows-split-duotone",  vars:["file"],                   preview:"Refactor {{file}} to follow Clean Architecture principles: separate concerns, use dependency injection, add interfaces, ensure single responsibility." },
  { title:"Write Comprehensive Tests",   cat:"Testing",         uses:1820, icon:"i-ph:test-tube-duotone",     vars:["component","testFramework"],preview:"Write comprehensive tests for {{component}} using {{testFramework}}. Include unit tests, edge cases, error states, and async behavior. Aim for 90%+ coverage." },
  { title:"Generate API Documentation",  cat:"Documentation",   uses:634,  icon:"i-ph:book-open-duotone",     vars:["apiFile"],                preview:"Generate full OpenAPI 3.0 documentation for {{apiFile}}. Include descriptions, request/response schemas, authentication requirements, and example payloads." },
  { title:"Debug and Explain Error",     cat:"Debugging",       uses:3210, icon:"i-ph:bug-duotone",           vars:["error","context"],        preview:"Debug this error: {{error}}. Context: {{context}}. Explain the root cause, why it happens, and provide a fix with explanation." },
  { title:"System Design Review",        cat:"Architecture",    uses:421,  icon:"i-ph:graph-duotone",         vars:["system"],                 preview:"Review the architecture of {{system}}. Identify bottlenecks, scalability issues, security vulnerabilities, and suggest improvements with tradeoffs." },
  { title:"Convert to TypeScript",       cat:"Refactoring",     uses:2140, icon:"i-ph:file-ts-duotone",       vars:["jsFile"],                 preview:"Convert {{jsFile}} to TypeScript. Add proper types, interfaces, generics where applicable, and fix any implicit any issues. Keep all existing functionality." },
  { title:"Performance Optimization",    cat:"Refactoring",     uses:780,  icon:"i-ph:lightning-duotone",     vars:["component"],              preview:"Analyze and optimize {{component}} for performance. Look for unnecessary re-renders, expensive computations, missing memoization, and bundle size issues." },
];
export default function AIPromptsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = PROMPTS.filter(p=>(cat==="All"||p.cat===cat)&&(p.title.toLowerCase().includes(q.toLowerCase())||p.preview.toLowerCase().includes(q.toLowerCase())));
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/ai" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">AI Hub</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Prompt Library</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Prompt Library</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Save, version, and reuse your best AI prompts</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>New Prompt
          </button>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-40">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 i-ph:magnifying-glass w-4 h-4 text-bolt-elements-textSecondary"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search prompts…" className="w-full pl-9 pr-4 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500"/>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${cat===c?"bg-accent-500 text-white":"border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{c}</button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map(p=>(
            <div key={p.title} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4 hover:border-accent-500/40 transition-colors group">
              <div className="flex items-start gap-3 mb-3">
                <div className={`${p.icon} w-8 h-8 text-accent-400 shrink-0`}/>
                <div className="flex-1">
                  <div className="font-semibold text-bolt-elements-textPrimary text-sm">{p.title}</div>
                  <div className="text-xs text-bolt-elements-textSecondary">{p.cat} · {p.uses.toLocaleString()} uses</div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2.5 py-1 rounded-lg bg-accent-500 text-white hover:bg-accent-600">Use</button>
              </div>
              <p className="text-xs text-bolt-elements-textSecondary leading-relaxed mb-3 line-clamp-2">{p.preview}</p>
              {p.vars.length>0&&(
                <div className="flex gap-1 flex-wrap">
                  {p.vars.map(v=><span key={v} className="text-xs px-2 py-0.5 rounded bg-accent-500/10 text-accent-400 font-mono">{`{{${v}}}`}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
