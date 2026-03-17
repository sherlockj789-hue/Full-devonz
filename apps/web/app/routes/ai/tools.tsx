import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "MCP Tools — Devonz AI" }];
const TOOLS = [
  { name:"Web Search",        desc:"Search the web in real-time via Brave Search API",             icon:"i-ph:magnifying-glass-duotone", installed:true,  category:"Web"      },
  { name:"File System",       desc:"Read, write, and navigate the file system",                    icon:"i-ph:folder-open-duotone",      installed:true,  category:"Files"    },
  { name:"GitHub",            desc:"Create PRs, review code, manage issues and repos",             icon:"i-ph:github-logo-duotone",      installed:true,  category:"DevTools" },
  { name:"Browser Control",   desc:"Puppeteer-based browser automation and web scraping",          icon:"i-ph:browser-duotone",          installed:false, category:"Web"      },
  { name:"PostgreSQL",        desc:"Query and manage PostgreSQL databases directly",               icon:"i-ph:database-duotone",         installed:false, category:"Database" },
  { name:"Slack",             desc:"Send messages, create channels, search workspace",             icon:"i-ph:chat-teardrop-duotone",    installed:false, category:"Comms"    },
  { name:"Notion",            desc:"Read and write Notion pages and databases",                    icon:"i-ph:note-duotone",             installed:false, category:"Docs"     },
  { name:"Linear",            desc:"Create and manage Linear issues and projects",                 icon:"i-ph:rows-duotone",             installed:false, category:"DevTools" },
  { name:"AWS S3",            desc:"Manage S3 buckets and objects programmatically",              icon:"i-ph:cloud-duotone",            installed:false, category:"Cloud"    },
  { name:"Stripe",            desc:"Query payments, customers, and subscription data",             icon:"i-ph:credit-card-duotone",      installed:false, category:"Finance"  },
];
export default function AIToolsPage() {
  const [filter, setFilter] = useState("All");
  const cats = ["All","Web","Files","DevTools","Database","Comms","Docs","Cloud","Finance"];
  const list = TOOLS.filter(t=>filter==="All"||t.category===filter);
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/ai" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">AI Hub</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">MCP Tools</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-bolt-elements-textPrimary">MCP Tool Library</h1>
          <p className="text-sm text-bolt-elements-textSecondary">Extend AI capabilities — web search, browser automation, database access, and more</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {cats.map(c=><button key={c} onClick={()=>setFilter(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter===c?"bg-accent-500 text-white":"border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{c}</button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map(t=>(
            <div key={t.name} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4 hover:border-accent-500/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className={`${t.icon} w-9 h-9 text-accent-400 shrink-0`}/>
                <div className="flex-1">
                  <div className="font-semibold text-bolt-elements-textPrimary text-sm">{t.name}</div>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{t.category}</span>
                </div>
                {t.installed&&<span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium shrink-0">Installed</span>}
              </div>
              <p className="text-xs text-bolt-elements-textSecondary leading-relaxed mb-4">{t.desc}</p>
              <button className={`w-full py-1.5 rounded-lg text-xs font-medium transition-colors ${t.installed?"border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:border-red-500/50 hover:text-red-400":"bg-accent-500/10 text-accent-400 hover:bg-accent-500/20"}`}>
                {t.installed?"Remove":"Install"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
