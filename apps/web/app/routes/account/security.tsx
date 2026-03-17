import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Security — Devonz" }];
const SESSIONS = [
  { device:"Chrome / macOS",    ip:"192.168.1.1",   location:"San Francisco, CA", lastActive:"Now (current)",  current:true  },
  { device:"VS Code Extension", ip:"192.168.1.1",   location:"San Francisco, CA", lastActive:"5m ago",         current:false },
  { device:"iPhone Safari",     ip:"172.16.0.1",    location:"San Francisco, CA", lastActive:"2h ago",         current:false },
  { device:"Firefox / Linux",   ip:"10.0.0.1",      location:"New York, NY",      lastActive:"3d ago",         current:false },
];
export default function SecurityPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/account" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Account</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Security</span>
        </div>
        <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Security</h1>
        {/* 2FA */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold text-bolt-elements-textPrimary">Two-Factor Authentication</div>
              <div className="text-sm text-bolt-elements-textSecondary mt-1">Add an extra layer of security with TOTP or passkeys</div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">Not Enabled</span>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
              <div className="i-ph:shield-check-duotone w-4 h-4"/>Enable 2FA</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-bolt-elements-borderColor text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
              <div className="i-ph:key-duotone w-4 h-4"/>Add Passkey</button>
          </div>
        </div>
        {/* Change password */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5 space-y-3">
          <div className="font-semibold text-bolt-elements-textPrimary">Change Password</div>
          {["Current Password","New Password","Confirm New Password"].map(label=>(
            <div key={label}>
              <label className="text-xs font-medium text-bolt-elements-textSecondary block mb-1">{label}</label>
              <input type="password" className="w-full px-3 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-sm text-bolt-elements-textPrimary focus:outline-none focus:border-accent-500"/>
            </div>
          ))}
          <button className="px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">Update Password</button>
        </div>
        {/* Active sessions */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-bolt-elements-borderColor">
            <span className="text-sm font-medium text-bolt-elements-textPrimary">Active Sessions</span>
            <button className="text-xs text-red-400 hover:underline">Revoke All Others</button>
          </div>
          <div className="divide-y divide-bolt-elements-borderColor">
            {SESSIONS.map((s,i)=>(
              <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                <div className="i-ph:monitor-duotone w-8 h-8 text-bolt-elements-textSecondary shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-bolt-elements-textPrimary">{s.device}</span>
                    {s.current&&<span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400">Current</span>}
                  </div>
                  <div className="text-xs text-bolt-elements-textSecondary">{s.location} · {s.ip}</div>
                </div>
                <div className="text-xs text-bolt-elements-textSecondary hidden sm:block">{s.lastActive}</div>
                {!s.current&&<button className="text-xs text-red-400 hover:underline shrink-0">Revoke</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
