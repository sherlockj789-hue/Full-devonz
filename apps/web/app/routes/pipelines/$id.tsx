import { MetaFunction } from "@remix-run/node";
import { Link, useParams } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Pipeline — Devonz" }];
const LOG_LINES = [
  "[00:00.000] ▶ Starting pipeline: devonz-web CI",
  "[00:00.120] → Checkout repository @ main (abc123f)",
  "[00:01.204] ✓ Checkout complete",
  "[00:01.210] → Installing dependencies (pnpm install)",
  "[00:32.441] ✓ Installed 847 packages in 31.2s",
  "[00:32.450] → Running linter (eslint . --cache)",
  "[00:48.220] ✓ Lint passed — 0 errors, 3 warnings",
  "[00:48.230] → Running type check (tsc --noEmit)",
  "[01:12.441] ✓ Type check passed",
  "[01:12.450] → Running tests (vitest --run)",
  "[01:58.220] ✓ 147 tests passed, 0 failed (46.1s)",
  "[01:58.230] → Building production bundle (remix vite:build)",
  "[03:21.441] ✓ Build complete — 1.4 MB (gzip: 412 KB)",
  "[03:21.450] → Deploying to Vercel (production)",
  "[03:42.220] ✓ Deployed to https://devonz.ai",
  "[03:42.230] ✅ Pipeline passed in 3m 42s",
];
const STAGES = [
  { name:"Checkout", status:"passed", duration:"1.2s" },
  { name:"Install",  status:"passed", duration:"31.2s" },
  { name:"Lint",     status:"passed", duration:"15.8s" },
  { name:"Test",     status:"passed", duration:"46.1s" },
  { name:"Build",    status:"passed", duration:"83.2s" },
  { name:"Deploy",   status:"passed", duration:"20.8s" },
];
export default function PipelineDetailPage() {
  const { id } = useParams();
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/pipelines" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">Pipelines</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-bolt-elements-textPrimary font-medium font-mono">{id}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500"/>
              <h1 className="text-xl font-bold text-bolt-elements-textPrimary">devonz-web CI</h1>
            </div>
            <div className="flex items-center gap-3 text-xs text-bolt-elements-textSecondary">
              <span className="flex items-center gap-1"><div className="i-ph:git-branch w-3 h-3"/>main</span>
              <span className="flex items-center gap-1"><div className="i-ph:git-commit w-3 h-3"/>feat: add AI hub page</span>
              <span className="flex items-center gap-1"><div className="i-ph:clock w-3 h-3"/>3m 42s</span>
              <span>Triggered by push · 2m ago</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:arrow-clockwise w-4 h-4"/>Re-run
          </button>
        </div>
        {/* Stage overview */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {STAGES.map((s,i)=>(
            <div key={s.name} className="flex items-center shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${s.status==="passed"?"bg-green-500/10 text-green-400 border border-green-500/20":"bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>{s.name}</div>
                <span className="text-xs text-bolt-elements-textSecondary">{s.duration}</span>
              </div>
              {i<STAGES.length-1&&<div className="w-6 h-px bg-bolt-elements-borderColor mx-1"/>}
            </div>
          ))}
        </div>
        {/* Log output */}
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-2">
            <span className="text-xs font-medium text-bolt-elements-textSecondary">Build Log</span>
            <button className="text-xs text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary flex items-center gap-1 transition-colors">
              <div className="i-ph:download-simple w-3 h-3"/>Download
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-bolt-elements-textSecondary leading-relaxed overflow-x-auto">
            {LOG_LINES.map((l,i)=>(
              <div key={i} className={`${l.includes("✅")?"text-green-400":l.includes("✓")?"text-green-300":l.includes("→")?"text-accent-400":""}`}>{l}</div>
            ))}
          </pre>
        </div>
      </div>
    </AppShell>
  );
}
