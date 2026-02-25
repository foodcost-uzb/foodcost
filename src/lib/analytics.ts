const SESSION_KEY = 'analytics_session';
const SESSION_TTL = 30 * 60 * 1000; // 30 minutes

let sessionId: string | null = null;

function getSessionId() {
  if (sessionId) return sessionId;
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(SESSION_KEY);
  const storedTime = localStorage.getItem(SESSION_KEY + '_ts');

  if (stored && storedTime && Date.now() - parseInt(storedTime) < SESSION_TTL) {
    sessionId = stored;
  } else {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  localStorage.setItem(SESSION_KEY + '_ts', Date.now().toString());

  return sessionId;
}

export function trackPageView(page: string) {
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'pageview',
      page,
      referrer: document.referrer || null,
      session_id: getSessionId(),
    }),
  }).catch(() => {});
}

export function trackEvent(eventName: string, eventData?: Record<string, unknown>) {
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'event',
      event_name: eventName,
      event_data: eventData || null,
      page: typeof window !== 'undefined' ? window.location.pathname : null,
      session_id: getSessionId(),
    }),
  }).catch(() => {});
}
