-- Migration: Add utm_data column to leads table
-- Run this in Supabase SQL Editor

ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_data jsonb DEFAULT NULL;

COMMENT ON COLUMN leads.utm_data IS 'UTM parameters captured from the visitor session (utm_source, utm_medium, utm_campaign, utm_term, utm_content)';
