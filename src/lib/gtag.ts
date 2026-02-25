export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || '';

type GtagEventParams = Record<string, string | number | boolean | undefined>;

function gtag(...args: [string, ...unknown[]]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

export function gtagPageView(url: string) {
  gtag('config', GA_MEASUREMENT_ID, { page_path: url });
}

export function gtagEvent(action: string, params?: GtagEventParams) {
  gtag('event', action, params);
}

export function gtagFormSubmit(formName: string) {
  gtagEvent('form_submit', { form_name: formName, event_category: 'conversion' });
}

export function gtagPhoneClick(location: string) {
  gtagEvent('phone_click', { event_category: 'contact', event_label: location });
}

export function gtagWhatsAppClick(location: string) {
  gtagEvent('whatsapp_click', { event_category: 'contact', event_label: location });
}

export function gtagTelegramClick(location: string) {
  gtagEvent('telegram_click', { event_category: 'contact', event_label: location });
}

export function gtagCalculatorStarted() {
  gtagEvent('calculator_started', { event_category: 'engagement' });
}

export function gtagCalculatorCompleted(data: { revenue: string; currentFc: string; targetFc: string; savings: string }) {
  gtagEvent('calculator_completed', {
    event_category: 'engagement',
    revenue: data.revenue,
    current_fc: data.currentFc,
    target_fc: data.targetFc,
    monthly_savings: data.savings,
  });
}

export function gtagCaseStudyView(title: string) {
  gtagEvent('case_study_view', { event_category: 'engagement', case_title: title });
}

export function gtagVideoView(title: string, videoId?: string) {
  gtagEvent('video_view', { event_category: 'engagement', video_title: title, video_id: videoId });
}

export function gtagCtaClick(ctaName: string, location?: string) {
  gtagEvent('cta_click', { event_category: 'engagement', cta_name: ctaName, cta_location: location });
}

export function gtagSectionView(sectionId: string) {
  gtagEvent('section_view', { event_category: 'engagement', section_id: sectionId });
}

export function gtagServiceView(title: string) {
  gtagEvent('service_view', { event_category: 'engagement', service_title: title });
}

export function gtagProductView(name: string) {
  gtagEvent('product_view', { event_category: 'engagement', product_name: name });
}

declare global {
  interface Window {
    gtag: (...args: [string, ...unknown[]]) => void;
    dataLayer: unknown[];
  }
}
