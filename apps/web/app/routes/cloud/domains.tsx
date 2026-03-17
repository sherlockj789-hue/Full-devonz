import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Domains — Devonz Cloud" }];
const DOMAINS = [
  { domain:"devonz.ai",          project:"devonz-web",  ssl:"valid",   expiry:"Dec 2027", status:"active",   dns:"verified"  },
  { domain:"api.devonz.ai",      project:"api-gateway", ssl:"valid",   expiry:"Dec 2027", status:"active",   dns:"verified"  },
  { domain:"staging.devonz.ai",  project:"devonz-web",  ssl:"valid",   expiry:"Dec 2027", status:"active",   dns:"verified"  },
  { domain:"my-app.example.com", project:"ai-dashboard",ssl:"pending", expiry:"—",        status:"pending",  dns:"unverified"},
];
export default function CloudDomainsPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/cloud" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Cloud</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Domains</span>
        </div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Domains</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Custom domains with auto-SSL via Let's Encrypt</p></div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>Add Domain</button>
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-bolt-elements-borderColor">
                {["Domain","Project","SSL","Expires","DNS","Status",""].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-bolt-elements-borderColor">
                {DOMAINS.map(d=>(
                  <tr key={d.domain} className="hover:bg-bolt-elements-item-backgroundActive transition-colors group">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="i-ph:globe-duotone w-4 h-4 text-accent-400"/><span className="font-medium text-bolt-elements-textPrimary">{d.domain}</span></div></td>
                    <td className="px-4 py-3 text-bolt-elements-textSecondary">{d.project}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.ssl==="valid"?"bg-green-500/10 text-green-400":"bg-yellow-500/10 text-yellow-400"}`}>{d.ssl}</span></td>
                    <td className="px-4 py-3 text-bolt-elements-textSecondary text-xs">{d.expiry}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.dns==="verified"?"bg-green-500/10 text-green-400":"bg-yellow-500/10 text-yellow-400"}`}>{d.dns}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.status==="active"?"bg-green-500/10 text-green-400":"bg-yellow-500/10 text-yellow-400"}`}>{d.status}</span></td>
                    <td className="px-4 py-3"><div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">DNS</button>
                      <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-red-400">Remove</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5">
          <h2 className="font-medium text-bolt-elements-textPrimary mb-3">Add Custom Domain</h2>
          <div className="flex gap-2">
            <input placeholder="yourdomain.com" className="flex-1 px-3 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-sm text-bolt-elements-textPrimary focus:outline-none focus:border-accent-500"/>
            <button className="px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">Add</button>
          </div>
          <p className="text-xs text-bolt-elements-textSecondary mt-2">After adding, point your domain's DNS CNAME to <code className="font-mono bg-bolt-elements-background-depth-3 px-1 py-0.5 rounded">cname.devonz.ai</code></p>
        </div>
      </div>
    </AppShell>
  );
}
