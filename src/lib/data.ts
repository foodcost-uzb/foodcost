import { getSupabaseClient } from '@/lib/supabase/server';
import type { Service, Product, CaseStudy, Testimonial, SiteSetting, ProjectLogo } from '@/lib/supabase/types';

export async function getServices(): Promise<Service[]> {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}

export async function getCases(): Promise<CaseStudy[]> {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('cases')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}

export async function getProjectLogos(): Promise<ProjectLogo[]> {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('project_logos')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}

export async function getSettings(group?: string): Promise<Record<string, string>> {
  const supabase = getSupabaseClient();
  let query = supabase.from('site_settings').select('key, value');
  if (group) query = query.eq('group', group);
  const { data } = await query;
  const map: Record<string, string> = {};
  for (const s of (data || []) as Pick<SiteSetting, 'key' | 'value'>[]) {
    map[s.key] = s.value;
  }
  return map;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  return getSettings();
}
