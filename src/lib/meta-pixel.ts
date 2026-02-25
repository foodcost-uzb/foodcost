export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

type FbqParams = Record<string, string | number | boolean | undefined>;

function fbq(action: string, event: string, params?: FbqParams) {
  if (typeof window !== 'undefined' && window.fbq) {
    if (params) {
      window.fbq(action, event, params);
    } else {
      window.fbq(action, event);
    }
  }
}

// Standard events
export function fbqPageView() {
  fbq('track', 'PageView');
}

export function fbqLead(formName: string) {
  fbq('track', 'Lead', { content_name: formName });
}

export function fbqContact(method: string) {
  fbq('track', 'Contact', { content_name: method });
}

export function fbqViewContent(name: string, category?: string) {
  fbq('track', 'ViewContent', { content_name: name, content_category: category });
}

export function fbqSchedule() {
  fbq('track', 'Schedule');
}

// Custom events
export function fbqCalculatorStarted() {
  fbq('trackCustom', 'CalculatorStarted');
}

export function fbqCalculatorCompleted(data: { revenue: string; savings: string }) {
  fbq('trackCustom', 'CalculatorCompleted', { revenue: data.revenue, savings: data.savings });
}

export function fbqVideoView(title: string) {
  fbq('trackCustom', 'VideoView', { video_title: title });
}

export function fbqCtaClick(ctaName?: string) {
  fbq('trackCustom', 'CtaClick', { cta_name: ctaName });
}

declare global {
  interface Window {
    fbq: (...args: [string, string, FbqParams?]) => void;
    _fbq: unknown;
  }
}
