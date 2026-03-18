import { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Notifications — Devonz" }];
const NOTIFS = [
  { id:"1", type:"success", title:"Deployment successful",         msg:"devonz-web was deployed to production",          time:"2m ago",  read:false, icon:"i-ph:rocket-launch-duotone",  c:"text-green-400"  },
  { id:"2", type:"ai",      title:"AI Agent completed task",       msg:"Full-Stack Feature Agent opened PR #49",          time:"8m ago",  read:false, icon:"i-ph:robot-duotone",          c:"text-purple-400" },
  { id:"3", type:"error",   title:"Build failed",                  msg:"mobile-app: TypeError on line 142",              time:"32m ago", read:false, icon:"i-ph:x-circle-duotone",       c:"text-red-400"    },
  { id:"4", type:"info",    title:"New team member",               msg:"sarah@dev.io joined your team",                  time:"1h ago",  read:true,  icon:"i-ph:user-plus-duotone",      c:"text-blue-400"   },
  { id:"5", type:"warning", title:"Storage approaching limit",     msg:"You've used 85% of your 20GB storage quota",     time:"2h ago",  read:true,  icon:"i-ph:warning-circle-duotone", c:"text-yellow-400" },
  { id:"6", type:"success", title:"PR #42 merged",                 msg:"feat: add dark mode support was merged to main", time:"3h ago",  read:true,  icon:"i-ph:git-merge-duotone",      c:"text-green-400"  },
  { id:"7", type:"info",    title:"Weekly AI usage report",        msg:"You used 1.2M tokens this week (+18% vs last)",   time:"1d ago",  read:true,  icon:"i-ph:chart-bar-duotone",      c:"text-blue-400"   },
  { id:"8", type:"info",    title:"Devonz v1.4.0 released",        msg:"AI Hub, Desktop builds, 15 new pages",           time:"2d ago",  read:true,  icon:"i-ph:sparkle-duotone",        c:"text-accent-400" },
];
export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFS);
  const [filter, setFilter] = useState("All");
  const markRead = (id:string) => setNotifs(ns=>ns.map(n=>n.id===id?{...n,read:true}:n));
  const markAll = () => setNotifs(ns=>ns.map(n=>({...n,read:true})));
  const remove = (id:string) => setNotifs(ns=>ns.filter(n=>n.id!==id));
  const unread = notifs.filter(n=>!n.read).length;
  const filtered = notifs.filter(n=>filter==="All"||(filter==="Unread"&&!n.read)||(filter==="Read"&&n.read));
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Notifications</h1>
              {unread>0&&<span className="text-xs px-2 py-0.5 rounded-full bg-accent-500 text-white font-bold">{unread}</span>}
            </div>
            <p className="text-sm text-bolt-elements-textSecondary">Deployments, AI updates, team activity</p>
          </div>
          {unread>0&&<button onClick={markAll} className="text-sm text-accent-500 hover:underline">Mark all read</button>}
        </div>
        <div className="flex gap-1 p-1 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 w-fit">
          {["All","Unread","Read"].map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter===f?"bg-accent-500 text-white":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{f}</button>)}
        </div>
        <div className="space-y-2">
          {filtered.map(n=>(
            <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${n.read?"border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 opacity-70":"border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 border-l-2 border-l-accent-500"}`}
              onClick={()=>markRead(n.id)}>
              <div className={`${n.icon} w-5 h-5 shrink-0 mt-0.5 ${n.c}`}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-bolt-elements-textPrimary">{n.title}</span>
                  {!n.read&&<span className="w-2 h-2 rounded-full bg-accent-500 shrink-0"/>}
                </div>
                <div className="text-xs text-bolt-elements-textSecondary mt-0.5 leading-relaxed">{n.msg}</div>
                <div className="text-xs text-bolt-elements-textSecondary mt-1">{n.time}</div>
              </div>
              <button onClick={e=>{e.stopPropagation();remove(n.id);}} className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors shrink-0 opacity-0 group-hover:opacity-100">
                <div className="i-ph:x w-4 h-4"/>
              </button>
            </div>
          ))}
          {filtered.length===0&&(
            <div className="text-center py-12 text-bolt-elements-textSecondary">
              <div className="i-ph:bell-slash-duotone w-10 h-10 mx-auto mb-3 opacity-40"/>
              <div className="text-sm">No notifications</div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
