import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Storage — Devonz Cloud" }];
const BUCKETS = [
  { name:"devonz-public",  size:"1.2 GB", files:8420,  access:"Public",  region:"Global CDN", updated:"2m ago"  },
  { name:"devonz-private", size:"840 MB", files:1240,  access:"Private", region:"US East",    updated:"1h ago"  },
  { name:"user-uploads",   size:"380 MB", files:3210,  access:"Private", region:"US East",    updated:"3h ago"  },
];
const FILES = [
  { name:"logo.svg",          size:"12 KB",  type:"image/svg+xml",       modified:"2m ago"  },
  { name:"og-image.png",      size:"84 KB",  type:"image/png",           modified:"1h ago"  },
  { name:"user-avatar-123.webp",size:"32 KB",type:"image/webp",          modified:"3h ago"  },
  { name:"backup-2026-03.tar.gz",size:"412 MB",type:"application/gzip",  modified:"1d ago"  },
  { name:"fonts/inter.woff2", size:"98 KB",  type:"font/woff2",          modified:"2d ago"  },
];
export default function CloudStoragePage() {
  const [bucket, setBucket] = useState("devonz-public");
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/cloud" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Cloud</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium">Storage</span>
        </div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Storage</h1>
            <p className="text-sm text-bolt-elements-textSecondary">S3-compatible object storage with global CDN</p></div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>New Bucket</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {BUCKETS.map(b=>(
            <button key={b.name} onClick={()=>setBucket(b.name)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${bucket===b.name?"border-accent-500 bg-accent-500/10 text-accent-400":"border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>
              <div className="i-ph:hard-drive-duotone w-4 h-4"/>{b.name}
              <span className="text-xs opacity-70">{b.size}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(() => {const b=BUCKETS.find(x=>x.name===bucket)!; return [
            {label:"Total Files",   value:b.files.toLocaleString(), icon:"i-ph:files-duotone",   c:"text-blue-400",  bg:"bg-blue-500/10"  },
            {label:"Total Size",    value:b.size,                  icon:"i-ph:database-duotone", c:"text-green-400", bg:"bg-green-500/10" },
            {label:"Access",        value:b.access,                icon:"i-ph:lock-duotone",     c:"text-orange-400",bg:"bg-orange-500/10"},
            {label:"Region",        value:b.region,                icon:"i-ph:globe-duotone",    c:"text-purple-400",bg:"bg-purple-500/10"},
          ]; })().map(s=>(
            <div key={s.label} className={`rounded-xl border border-bolt-elements-borderColor ${s.bg} p-3`}>
              <div className={`${s.icon} w-4 h-4 ${s.c} mb-2`}/>
              <div className="text-sm font-bold text-bolt-elements-textPrimary">{s.value}</div>
              <div className="text-xs text-bolt-elements-textSecondary">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-bolt-elements-borderColor">
            <span className="text-sm font-medium text-bolt-elements-textPrimary">Files in /{bucket}</span>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bolt-elements-background-depth-3 text-xs text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
              <div className="i-ph:upload-simple w-3 h-3"/>Upload
            </button>
          </div>
          <div className="divide-y divide-bolt-elements-borderColor">
            {FILES.map(f=>(
              <div key={f.name} className="flex items-center gap-3 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors group">
                <div className="i-ph:file-duotone w-5 h-5 text-bolt-elements-textSecondary shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm text-bolt-elements-textPrimary truncate">{f.name}</div>
                  <div className="text-xs text-bolt-elements-textSecondary">{f.type}</div>
                </div>
                <span className="text-xs text-bolt-elements-textSecondary">{f.size}</span>
                <span className="text-xs text-bolt-elements-textSecondary hidden sm:block">{f.modified}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Copy URL</button>
                  <button className="text-xs px-2 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-red-400">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
