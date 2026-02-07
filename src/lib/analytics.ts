let sessionId: string | null = null;

function getSessionId() {
  if (sessionId) return sessionId;
  if (typeof window === 'undefined') return null;
  sessionId = sessionStorage.getItem('analytics_session');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session', sessionId);
  }
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
