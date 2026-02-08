export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  short_desc: string;
  description: string;
  features: string[];
  color: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  is_popular: boolean;
  badge: string | null;
  color: string;
  bg_color: string;
  border_color: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CaseResult {
  label: string;
  value: string;
  positive: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  image: string;
  results: CaseResult[];
  description: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  type: 'text' | 'video';
  name: string;
  role: string;
  location: string;
  avatar: string | null;
  text: string | null;
  rating: number;
  video_id: string | null;
  video_title: string | null;
  thumbnail: string | null;
  client_name: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectLogo {
  id: string;
  name: string;
  logo: string;
  website: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';
export type LeadSource = 'form' | 'callback' | 'calculator';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: LeadSource;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  group: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'email' | 'phone';
  created_at: string;
  updated_at: string;
}

export interface CalculatorSettings {
  id: string;
  default_revenue: number;
  default_current_fc: number;
  default_target_fc: number;
  currency_label: string;
  created_at: string;
  updated_at: string;
}

export interface PageView {
  id: string;
  page: string;
  referrer: string | null;
  user_agent: string | null;
  ip: string | null;
  session_id: string | null;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_name: string;
  event_data: Record<string, unknown> | null;
  page: string | null;
  session_id: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      admin_users: { Row: AdminUser };
      services: { Row: Service };
      products: { Row: Product };
      cases: { Row: CaseStudy };
      testimonials: { Row: Testimonial };
      leads: { Row: Lead };
      site_settings: { Row: SiteSetting };
      calculator_settings: { Row: CalculatorSettings };
      page_views: { Row: PageView };
      analytics_events: { Row: AnalyticsEvent };
      project_logos: { Row: ProjectLogo };
    };
  };
}
