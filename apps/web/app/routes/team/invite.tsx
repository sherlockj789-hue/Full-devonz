import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Invite Members — Devonz" }];
const ROLES = ["Owner","Admin","Developer","Viewer"];
export default function TeamInvitePage() {
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("Developer");
  const [sent, setSent] = useState(false);
  const [bulk, setBulk] = useState(false);
  const PENDING = [
    { email:"john@company.com", role:"Developer", sent:"2h ago", expires:"5d" },
    { email:"lisa@company.com", role:"Admin",     sent:"1d ago", expires:"4d" },
  ];
  return (
    <AppShell>
      <div className="p-6 max-w-2xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/team" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Team</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Invite Members</span>
        </div>
        <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Invite Team Members</h1>
        {sent ? (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center space-y-3">
            <div className="i-ph:check-circle-duotone w-12 h-12 text-green-400 mx-auto"/>
            <div className="font-semibold text-bolt-elements-textPrimary text-lg">Invitations sent!</div>
            <div className="text-sm text-bolt-elements-textSecondary">Team members will receive an email with a link to join your workspace.</div>
            <button onClick={()=>setSent(false)} className="text-sm text-accent-500 hover:underline">Send more invites</button>
          </div>
        ) : (
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-bolt-elements-textSecondary">Invite mode:</span>
              <div className="flex gap-1 p-1 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-3">
                {["Single","Bulk CSV"].map(m=><button key={m} onClick={()=>setBulk(m==="Bulk CSV")} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${(bulk&&m==="Bulk CSV")||(!bulk&&m==="Single")?"bg-accent-500 text-white":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{m}</button>)}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary block mb-1.5">
                {bulk?"Email addresses (one per line or comma-separated)":"Email address"}
              </label>
              {bulk
                ? <textarea value={emails} onChange={e=>setEmails(e.target.value)} rows={4} placeholder={"alice@company.com\nbob@company.com\ncarol@company.com"} className="w-full px-3 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-sm text-bolt-elements-textPrimary focus:outline-none focus:border-accent-500 resize-none"/>
                : <input value={emails} onChange={e=>setEmails(e.target.value)} placeholder="teammate@company.com" type="email" className="w-full px-3 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-sm text-bolt-elements-textPrimary focus:outline-none focus:border-accent-500"/>
              }
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary block mb-1.5">Role</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(r=>(
                  <button key={r} onClick={()=>setRole(r)} className={`p-3 rounded-xl border text-left transition-all ${role===r?"border-accent-500 bg-accent-500/5":"border-bolt-elements-borderColor hover:border-accent-500/40"}`}>
                    <div className="text-sm font-medium text-bolt-elements-textPrimary">{r}</div>
                    <div className="text-xs text-bolt-elements-textSecondary mt-0.5">
                      {r==="Owner"?"Full access including billing":r==="Admin"?"Manage team and projects":r==="Developer"?"Deploy and edit code":"View-only access"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bolt-elements-background-depth-3 text-xs text-bolt-elements-textSecondary">
              <div className="i-ph:envelope-duotone w-4 h-4 shrink-0 text-accent-400"/>
              Invites expire after 7 days. Members must have a Devonz account or will be prompted to create one.
            </div>
            <button onClick={()=>setSent(true)} disabled={!emails.trim()} className="w-full py-2.5 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
              <div className="i-ph:paper-plane-right-duotone w-4 h-4"/>Send Invitations
            </button>
          </div>
        )}
        {/* Pending invites */}
        {PENDING.length>0&&(
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-bolt-elements-borderColor"><span className="text-sm font-medium text-bolt-elements-textPrimary">Pending Invitations ({PENDING.length})</span></div>
            <div className="divide-y divide-bolt-elements-borderColor">
              {PENDING.map(p=>(
                <div key={p.email} className="flex items-center gap-3 px-4 py-3">
                  <div className="i-ph:envelope-duotone w-5 h-5 text-bolt-elements-textSecondary"/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-bolt-elements-textPrimary">{p.email}</div>
                    <div className="text-xs text-bolt-elements-textSecondary">Sent {p.sent} · Expires in {p.expires}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{p.role}</span>
                  <div className="flex gap-1">
                    <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Resend</button>
                    <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-red-400 hover:bg-red-500/10 transition-colors">Revoke</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
