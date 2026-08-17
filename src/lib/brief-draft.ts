import { emptyBriefDraft, type BriefDraftValues } from "@/lib/schemas/brief";

export const BRIEF_DRAFT_KEY = "pk_brief_draft";
const BRIEF_DRAFT_VERSION = 4;

export type BriefDraftSnapshot = {
  step: number;
  values: BriefDraftValues;
};

type StoredDraft = BriefDraftSnapshot & { version: number };

const listeners = new Set<() => void>();
let cached: BriefDraftSnapshot | null = null;

function emptySnapshot(): BriefDraftSnapshot {
  return { step: 1, values: emptyBriefDraft() };
}

function isDraftValues(value: unknown): value is BriefDraftValues {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.name === "string" && typeof record.email === "string";
}

function readStorage(): BriefDraftSnapshot {
  try {
    const raw = sessionStorage.getItem(BRIEF_DRAFT_KEY);
    if (!raw) return emptySnapshot();
    const parsed = JSON.parse(raw) as StoredDraft;
    if (parsed.version !== BRIEF_DRAFT_VERSION || !isDraftValues(parsed.values)) {
      return emptySnapshot();
    }
    const step = Number(parsed.step);
    if (!Number.isInteger(step) || step < 1 || step > 6) return emptySnapshot();
    return {
      step,
      values: { ...emptyBriefDraft(), ...parsed.values, website: "" },
    };
  } catch {
    return emptySnapshot();
  }
}

function emit() {
  for (const listener of listeners) listener();
}

export function getBriefDraftSnapshot(): BriefDraftSnapshot {
  if (typeof window === "undefined") return emptySnapshot();
  cached ??= readStorage();
  return cached;
}

export function getBriefDraftServerSnapshot(): BriefDraftSnapshot {
  return emptySnapshot();
}

export function subscribeBriefDraft(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

export function saveBriefDraft(step: number, values: BriefDraftValues) {
  if (typeof window === "undefined") return;
  cached = { step, values: { ...values, website: "" } };
  const payload: StoredDraft = {
    version: BRIEF_DRAFT_VERSION,
    ...cached,
  };
  sessionStorage.setItem(BRIEF_DRAFT_KEY, JSON.stringify(payload));
  emit();
}

export function clearBriefDraft() {
  if (typeof window === "undefined") return;
  cached = emptySnapshot();
  sessionStorage.removeItem(BRIEF_DRAFT_KEY);
  emit();
}
