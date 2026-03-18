import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Integrations — Devonz" }];
const INTEGRATIONS = [
  { name:"GitHub",        desc:"Sync repos, create PRs, review code",               icon:"i-ph:github-logo-duotone",      connected:true,  scopes:["repo","read:org"]            },
  { name:"GitLab",        desc:"GitLab repos, MRs, CI/CD pipelines",                icon:"i-ph:gitlab-logo-duotone",      connected:false, scopes:[]                             },
  { name:"Vercel",        desc:"Deploy and manage Vercel projects",                  icon:"i-ph:triangle-duotone",         connected:true,  scopes:["deployments","projects"]      },
  { name:"Netlify",       desc:"Deploy to Netlify with auto-previews",               icon:"i-ph:cloud-duotone",            connected:false, scopes:[]                             },
  { name:"Slack",         desc:"Receive deployment and AI notifications in Slack",   icon:"i-ph:slack-logo-duotone",       connected:false, scopes:[]                             },
  { name:"Supabase",      desc:"Direct access to Supabase projects and databases",   icon:"i-ph:database-duotone",         connected:true,  scopes:["database","storage"]         },
  { name:"Stripe",        desc:"Manage payments and subscriptions",                  icon:"i-ph:credit-card-duotone",      connected:false, scopes:[]                             },
  { name:"Linear",        desc:"Create and sync Linear issues from AI agents",       icon:"i-ph:rows-duotone",             connected:false, scopes:[]                             },
  { name:"Jira",          desc:"Sync tasks and track issues",                        icon:"i-ph:kanban-duotone",           connected:false, scopes:[]                             },
  { name:"Figma",         desc:"Import designs and generate components from Figma",  icon:"i-ph:figma-logo-duotone",       connected:false, scopes:[]                             },
  { name:"OpenAI",        desc:"Use your own OpenAI API key",                        icon:"i-ph:robot-duotone",            connected:true,  scopes:["models","completions"]       },
  { name:"Anthropic",     desc:"Use your own Anthropic API key",                     icon:"i-ph:brain-duotone",            connected:true,  scopes:["messages"]                   },
];
export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const toggle = (name:string) => setIntegrations(is=>is.map(i=>i.name===name?{...i,connected:!i.connected}:i));
  const connected = integrations.filter(i=>i.connected);
  const available = integrations.filter(i=>!i.connected);
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/account" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Account</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Integrations</span>
        </div>
        <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Integrations</h1>
          <p className="text-sm text-bolt-elements-textSecondary">Connect Devonz to your favorite tools and services</p></div>
        {/* Connected */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-3">Connected ({connected.length})</h2>
          <div className="space-y-2">
            {connected.map(i=>(
              <div key={i.name} className="flex items-center gap-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                <div className={`${i.icon} w-9 h-9 text-bolt-elements-textPrimary shrink-0`}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><span className="font-medium text-bolt-elements-textPrimary text-sm">{i.name}</span><span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">Connected</span></div>
                  <div className="text-xs text-bolt-elements-textSecondary mt-0.5">{i.desc}</div>
                  {i.scopes.length>0&&<div className="flex gap-1 mt-1.5 flex-wrap">{i.scopes.map(s=><span key={s} className="text-xs px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary font-mono">{s}</span>)}</div>}
                </div>
                <button onClick={()=>toggle(i.name)} className="text-xs px-3 py-1.5 rounded-lg border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:border-red-500/50 hover:text-red-400 transition-colors shrink-0">Disconnect</button>
              </div>
            ))}
          </div>
        </div>
        {/* Available */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-3">Available ({available.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {available.map(i=>(
              <div key={i.name} className="flex items-center gap-3 p-4 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/40 transition-colors">
                <div className={`${i.icon} w-8 h-8 text-bolt-elements-textSecondary shrink-0`}/>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-bolt-elements-textPrimary text-sm">{i.name}</div>
                  <div className="text-xs text-bolt-elements-textSecondary truncate">{i.desc}</div>
                </div>
                <button onClick={()=>toggle(i.name)} className="text-xs px-3 py-1.5 rounded-lg bg-accent-500/10 text-accent-400 hover:bg-accent-500/20 transition-colors shrink-0">Connect</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
