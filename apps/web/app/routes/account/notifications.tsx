import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Notification Settings — Devonz" }];
const PREFS = [
  { cat:"Deployments",  items:[
    { label:"Deployment succeeded",   email:true,  inapp:true,  slack:false },
    { label:"Deployment failed",      email:true,  inapp:true,  slack:true  },
    { label:"Preview URL ready",      email:false, inapp:true,  slack:false },
  ]},
  { cat:"AI",           items:[
    { label:"AI Agent task completed",email:true,  inapp:true,  slack:false },
    { label:"AI Agent failed",        email:true,  inapp:true,  slack:true  },
    { label:"Weekly AI usage report", email:true,  inapp:false, slack:false },
  ]},
  { cat:"Team",         items:[
    { label:"New member joined",      email:true,  inapp:true,  slack:false },
    { label:"Member left",            email:false, inapp:true,  slack:false },
    { label:"Role changed",           email:true,  inapp:true,  slack:false },
  ]},
  { cat:"Billing",      items:[
    { label:"Invoice paid",           email:true,  inapp:false, slack:false },
    { label:"Usage limit warning",    email:true,  inapp:true,  slack:true  },
    { label:"Plan changed",           email:true,  inapp:true,  slack:false },
  ]},
];
export default function NotificationSettingsPage() {
  const [prefs, setPrefs] = useState(PREFS);
  const Toggle = ({v,onChange}:{v:boolean,onChange:(b:boolean)=>void}) => (
    <button onClick={()=>onChange(!v)} className={`relative w-8 h-4 rounded-full transition-colors ${v?"bg-accent-500":"bg-bolt-elements-background-depth-3"}`}>
      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${v?"translate-x-4":"translate-x-0.5"}`}/>
    </button>
  );
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/account" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Account</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Notifications</span>
        </div>
        <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Notification Settings</h1>
        {prefs.map((cat,ci)=>(
          <div key={cat.cat} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-bolt-elements-borderColor"><span className="text-sm font-semibold text-bolt-elements-textPrimary">{cat.cat}</span></div>
            <div className="divide-y divide-bolt-elements-borderColor">
              {/* Header row */}
              <div className="flex items-center gap-4 px-4 py-2">
                <span className="flex-1 text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider">Event</span>
                {["Email","In-app","Slack"].map(h=><span key={h} className="w-12 text-center text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider">{h}</span>)}
              </div>
              {cat.items.map((item,ii)=>(
                <div key={item.label} className="flex items-center gap-4 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                  <span className="flex-1 text-sm text-bolt-elements-textPrimary">{item.label}</span>
                  {(["email","inapp","slack"] as const).map(key=>(
                    <div key={key} className="w-12 flex justify-center">
                      <Toggle v={item[key]} onChange={v=>{
                        const newPrefs=[...prefs];
                        newPrefs[ci]={...newPrefs[ci],items:newPrefs[ci].items.map((it,i)=>i===ii?{...it,[key]:v}:it)};
                        setPrefs(newPrefs);
                      }}/>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="px-6 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors">Save Preferences</button>
      </div>
    </AppShell>
  );
}
