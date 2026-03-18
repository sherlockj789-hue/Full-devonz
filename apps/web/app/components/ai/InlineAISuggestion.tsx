/**
 * Cursor-style inline AI suggestion component.
 * Renders ghost text completions in the editor gutter.
 */
import { useState, useEffect, useRef } from "react";
import { classNames } from "~/utils/classNames";

interface Props {
  suggestion: string;
  onAccept: () => void;
  onDismiss: () => void;
  visible: boolean;
}

export function InlineAISuggestion({ suggestion, onAccept, onDismiss, visible }: Props) {
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Tab") { e.preventDefault(); onAccept(); }
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, onAccept, onDismiss]);

  if (!visible) return null;
  return (
    <div className="relative">
      <div className="text-bolt-elements-textSecondary opacity-50 italic font-mono text-sm select-none pointer-events-none whitespace-pre">
        {suggestion}
      </div>
      <div className="absolute -bottom-7 right-0 flex items-center gap-2 bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor rounded-lg px-2 py-1 shadow-lg z-10">
        <kbd className="text-xs bg-bolt-elements-background-depth-3 px-1.5 py-0.5 rounded text-bolt-elements-textSecondary">Tab</kbd>
        <span className="text-xs text-bolt-elements-textSecondary">to accept</span>
        <span className="text-xs text-bolt-elements-textSecondary">·</span>
        <kbd className="text-xs bg-bolt-elements-background-depth-3 px-1.5 py-0.5 rounded text-bolt-elements-textSecondary">Esc</kbd>
        <span className="text-xs text-bolt-elements-textSecondary">to dismiss</span>
      </div>
    </div>
  );
}

/** AI completion panel — shows multi-line suggestion with diff preview */
export function AICompletionPanel({ code, onAccept, onDismiss }: { code: string; onAccept: () => void; onDismiss: () => void }) {
  return (
    <div className="rounded-xl border border-accent-500/40 bg-bolt-elements-background-depth-2 shadow-2xl overflow-hidden w-full max-w-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-3">
        <div className="flex items-center gap-2">
          <div className="i-ph:robot-duotone w-4 h-4 text-accent-400" />
          <span className="text-xs font-semibold text-bolt-elements-textPrimary">AI Suggestion</span>
          <span className="text-xs text-bolt-elements-textSecondary">GPT-4o</span>
        </div>
        <div className="flex gap-2">
          <button onClick={onDismiss} className="text-xs px-2.5 py-1 rounded border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Dismiss</button>
          <button onClick={onAccept} className="text-xs px-2.5 py-1 rounded bg-accent-500 text-white hover:bg-accent-600 transition-colors flex items-center gap-1">
            <span>Accept</span><kbd className="bg-accent-600 px-1 rounded text-xs">Tab</kbd>
          </button>
        </div>
      </div>
      <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto leading-relaxed">
        {code.split("\n").map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-green-600 select-none">+</span>
            <span>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
