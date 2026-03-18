import { atom, map } from "nanostores";

export type NotifType = "success" | "error" | "warning" | "info" | "ai";

export interface NotifItem {
  id: string;
  type: NotifType;
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
  action?: { label: string; href: string };
}

export const notificationsStore = map<{ items: NotifItem[] }>({ items: [] });

export const unreadCountStore = atom(0);

function updateUnread() {
  unreadCountStore.set(notificationsStore.get().items.filter(n => !n.read).length);
}

export const notificationActions = {
  add(notif: Omit<NotifItem, "id" | "timestamp" | "read">) {
    const item: NotifItem = {
      ...notif,
      id: Math.random().toString(36).slice(2),
      timestamp: new Date(),
      read: false,
    };
    notificationsStore.setKey("items", [item, ...notificationsStore.get().items].slice(0, 50));
    updateUnread();
    return item.id;
  },
  markRead(id: string) {
    notificationsStore.setKey("items", notificationsStore.get().items.map(n => n.id === id ? { ...n, read: true } : n));
    updateUnread();
  },
  markAllRead() {
    notificationsStore.setKey("items", notificationsStore.get().items.map(n => ({ ...n, read: true })));
    updateUnread();
  },
  remove(id: string) {
    notificationsStore.setKey("items", notificationsStore.get().items.filter(n => n.id !== id));
    updateUnread();
  },
  clear() {
    notificationsStore.setKey("items", []);
    updateUnread();
  },
};
