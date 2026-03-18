import { useState, useEffect, useCallback } from "react";
import { classNames } from "~/utils/classNames";

export type NotificationType = "success" | "error" | "warning" | "info" | "ai";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
  persistent?: boolean;
}

let _listeners: Array<(n: Notification) => void> = [];

export const notify = {
  show: (n: Omit<Notification, "id">) => {
    const notif: Notification = { ...n, id: Math.random().toString(36).slice(2) };
    _listeners.forEach(l => l(notif));
    return notif.id;
  },
  success: (title: string, message?: string) => notify.show({ type: "success", title, message, duration: 4000 }),
  error:   (title: string, message?: string) => notify.show({ type: "error",   title, message, duration: 6000 }),
  warning: (title: string, message?: string) => notify.show({ type: "warning", title, message, duration: 5000 }),
  info:    (title: string, message?: string) => notify.show({ type: "info",    title, message, duration: 4000 }),
  ai:      (title: string, message?: string) => notify.show({ type: "ai",      title, message, duration: 5000 }),
};

const ICONS: Record<NotificationType, string> = {
  success: "i-ph:check-circle-duotone",
  error:   "i-ph:x-circle-duotone",
  warning: "i-ph:warning-circle-duotone",
  info:    "i-ph:info-duotone",
  ai:      "i-ph:robot-duotone",
};

const COLORS: Record<NotificationType, string> = {
  success: "border-green-500/30  bg-green-500/10  text-green-400",
  error:   "border-red-500/30    bg-red-500/10    text-red-400",
  warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  info:    "border-blue-500/30   bg-blue-500/10   text-blue-400",
  ai:      "border-purple-500/30 bg-purple-500/10 text-purple-400",
};

export function NotificationContainer() {
  const [notifs, setNotifs] = useState<Notification[]>([]);

  const remove = useCallback((id: string) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    const listener = (n: Notification) => {
      setNotifs(prev => [n, ...prev].slice(0, 6));
      if (!n.persistent) {
        const dur = n.duration ?? 4000;
        setTimeout(() => remove(n.id), dur);
      }
    };
    _listeners.push(listener);
    return () => { _listeners = _listeners.filter(l => l !== listener); };
  }, [remove]);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none" style={{ maxWidth: 380 }}>
      {notifs.map(n => (
        <div
          key={n.id}
          className={classNames(
            "flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg pointer-events-auto",
            "animate-in slide-in-from-right-4 fade-in duration-200",
            "bg-bolt-elements-background-depth-2",
            COLORS[n.type]
          )}
        >
          <div className={classNames(ICONS[n.type], "w-5 h-5 shrink-0 mt-0.5", COLORS[n.type].split(" ").pop()!)} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-bolt-elements-textPrimary">{n.title}</div>
            {n.message && <div className="text-xs text-bolt-elements-textSecondary mt-0.5 leading-relaxed">{n.message}</div>}
            {n.action && (
              <button
                onClick={() => { n.action!.onClick(); remove(n.id); }}
                className="text-xs font-medium text-accent-400 hover:underline mt-1"
              >
                {n.action.label}
              </button>
            )}
          </div>
          <button onClick={() => remove(n.id)} className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors shrink-0">
            <div className="i-ph:x w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
