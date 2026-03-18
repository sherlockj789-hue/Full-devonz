import { atom, map } from "nanostores";

export type AIModel = "gpt-4o" | "claude-3-5-sonnet" | "gemini-2-flash" | "deepseek-r1" | "llama-3-70b";

export interface AISettings {
  model: AIModel;
  inlineCompletions: boolean;
  autoTrigger: boolean;
  triggerDelay: number;
  contextWindow: number;
  temperature: number;
  maxTokens: number;
  showSuggestionHints: boolean;
  useProjectContext: boolean;
  streamResponses: boolean;
}

export const aiSettingsStore = map<AISettings>({
  model: "gpt-4o",
  inlineCompletions: true,
  autoTrigger: true,
  triggerDelay: 300,
  contextWindow: 8000,
  temperature: 0.2,
  maxTokens: 4096,
  showSuggestionHints: true,
  useProjectContext: true,
  streamResponses: true,
});

export const aiChatOpenStore = atom(false);
export const aiLoadingStore = atom(false);
export const aiTokensUsedStore = atom(0);
