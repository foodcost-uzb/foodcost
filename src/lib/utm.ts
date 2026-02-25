const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORAGE_KEY = 'foodcost_utm';

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function captureUtmParams() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utm: UtmData = {};
  let hasUtm = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      hasUtm = true;
    }
  }

  if (hasUtm) {
    const json = JSON.stringify(utm);
    try {
      sessionStorage.setItem(STORAGE_KEY, json);
      localStorage.setItem(STORAGE_KEY, json);
    } catch {
      // Storage not available
    }
  }
}

export function getUtmData(): UtmData | null {
  if (typeof window === 'undefined') return null;

  try {
    const session = sessionStorage.getItem(STORAGE_KEY);
    if (session) return JSON.parse(session);

    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local);
  } catch {
    // Storage not available
  }

  return null;
}
