/**
 * Windsurfer-style AI error detection + autofix panel.
 * Renders inline in the editor beside TypeScript/lint errors.
 */
import { useState } from "react";
import { classNames } from "~/utils/classNames";

export interface CodeError {
  id: string;
  line: number;
  col: number;
  severity: "error" | "warning" | "info";
  code: string;
  message: string;
  file: string;
  fix?: { description: string; diff: string };
}

interface Props {
  errors: CodeError[];
  onApplyFix: (error: CodeError) => void;
  onIgnore: (id: string) => void;
}

const SEV_COLORS = {
  error:   { icon:"i-ph:x-circle-duotone",       text:"text-red-400",    bg:"bg-red-500/10",    border:"border-red-500/20"    },
  warning: { icon:"i-ph:warning-circle-duotone",  text:"text-yellow-400", bg:"bg-yellow-500/10", border:"border-yellow-500/20" },
  info:    { icon:"i-ph:info-duotone",            text:"text-blue-400",   bg:"bg-blue-500/10",   border:"border-blue-500/20"   },
};

export function AIErrorFixPanel({ errors, onApplyFix, onIgnore }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [fixing, setFixing] = useState<string | null>(null);

  const handleFix = (err: CodeError) => {
    setFixing(err.id);
    setTimeout(() => {
      onApplyFix(err);
      setFixing(null);
    }, 800);
  };

  if (errors.length === 0) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-xl border border-green-500/20 bg-green-500/5">
        <div className="i-ph:check-circle-duotone w-4 h-4 text-green-400" />
        <span className="text-sm text-green-400">No errors detected</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="i-ph:warning-circle-duotone w-4 h-4 text-red-400" />
          <span className="text-sm font-semibold text-bolt-elements-textPrimary">{errors.length} issue{errors.length > 1 ? "s" : ""}</span>
        </div>
        <button
          onClick={() => errors.filter(e => e.fix).forEach(e => handleFix(e))}
          className="text-xs px-3 py-1.5 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors flex items-center gap-1"
        >
          <div className="i-ph:robot-duotone w-3 h-3" />Fix All with AI
        </button>
      </div>
      {errors.map(err => {
        const s = SEV_COLORS[err.severity];
        const isExpanded = expanded === err.id;
        return (
          <div key={err.id} className={classNames("rounded-xl border overflow-hidden transition-all", s.bg, s.border)}>
            <div className="flex items-start gap-3 p-3 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : err.id)}>
              <div className={classNames(s.icon, "w-4 h-4 shrink-0 mt-0.5", s.text)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-bolt-elements-textSecondary">{err.file}:{err.line}:{err.col}</span>
                  <span className={classNames("text-xs font-mono font-bold", s.text)}>{err.code}</span>
                </div>
                <div className="text-sm text-bolt-elements-textPrimary mt-0.5">{err.message}</div>
              </div>
              {err.fix && (
                <button
                  onClick={e => { e.stopPropagation(); handleFix(err); }}
                  disabled={fixing === err.id}
                  className="shrink-0 text-xs px-2.5 py-1 rounded-lg bg-accent-500/20 text-accent-400 hover:bg-accent-500/30 transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  {fixing === err.id
                    ? <><div className="i-ph:spinner-gap-duotone w-3 h-3 animate-spin" />Fixing…</>
                    : <><div className="i-ph:robot-duotone w-3 h-3" />AI Fix</>
                  }
                </button>
              )}
              <button onClick={e => { e.stopPropagation(); onIgnore(err.id); }} className="shrink-0 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
                <div className="i-ph:x w-4 h-4" />
              </button>
            </div>
            {isExpanded && err.fix && (
              <div className="border-t border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 p-3">
                <div className="text-xs text-bolt-elements-textSecondary mb-2">
                  <span className="font-semibold text-accent-400">AI fix: </span>{err.fix.description}
                </div>
                <pre className="text-xs font-mono overflow-x-auto leading-relaxed">
                  {err.fix.diff.split("\n").map((line, i) => (
                    <div key={i} className={classNames(
                      line.startsWith("+") ? "text-green-400" :
                      line.startsWith("-") ? "text-red-400 line-through opacity-60" :
                      "text-bolt-elements-textSecondary"
                    )}>{line}</div>
                  ))}
                </pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
