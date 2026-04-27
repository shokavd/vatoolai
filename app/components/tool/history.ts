export type HistoryItem = {
  id: string;
  mode: string;
  modeLabel: string;
  inputPreview: string;
  output: string;
  tone: string;
  language: string;
  timestamp: number;
};

const HISTORY_KEY = "clarity_ai_history";
const MAX_FREE = 5;
const MAX_PRO = 20;

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(item: Omit<HistoryItem, "id" | "timestamp">, isPro: boolean): void {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: Math.random().toString(36).slice(2),
    timestamp: Date.now(),
  };
  const updated = [newItem, ...history].slice(0, isPro ? MAX_PRO : MAX_FREE);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
