/*
  # Create Treatments Table

  ## Summary
  Sets up the core treatments data table for the medical management dashboard.

  ## New Tables
  - `treatments`
    - `id` (uuid, primary key)
    - `name` (text) - Treatment name
    - `price` (numeric) - Starting price
    - `estimate_duration` (text) - Duration label (e.g. "≈ 1 hour(s)")
    - `duration_note` (text, nullable) - Extra note like "/treatments"
    - `visit_type` (text) - 'single' or 'multiple'
    - `rating` (numeric, nullable) - Star rating 0-5
    - `review_count` (integer) - Number of reviews
    - `is_sample` (boolean) - Whether this is a sample treatment
    - `is_active` (boolean) - Active or inactive
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Public read policy (clinic demo, no auth required for read)
  - Authenticated insert/update/delete
*/

CREATE TABLE IF NOT EXISTS treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  estimate_duration text NOT NULL DEFAULT '≈ 1 hour(s)',
  duration_note text,
  visit_type text NOT NULL DEFAULT 'single' CHECK (visit_type IN ('single', 'multiple')),
  rating numeric,
  review_count integer NOT NULL DEFAULT 0,
  is_sample boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view treatments"
  ON treatments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert treatments"
  ON treatments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update treatments"
  ON treatments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete treatments"
  ON treatments FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO treatments (name, price, estimate_duration, duration_note, visit_type, rating, review_count, is_sample, is_active) VALUES
  ('General Checkup', 50, '≈ 1 hour(s)', NULL, 'single', NULL, 0, true, true),
  ('Teeth Whitening', 300, '≈ 1 hour(s)', '/treatments', 'multiple', NULL, 0, true, true),
  ('Teeth Cleaning', 75, '≈ 1 hour(s)', NULL, 'single', 3.8, 48, false, true),
  ('Tooth Extraction', 300, '≈ 2 hour(s)', '/treatments', 'multiple', 4.5, 110, false, true),
  ('Tooth Fillings', 210, '≈ 1.5 hour(s)', NULL, 'single', 3.2, 75, false, true),
  ('Tooth Scaling', 140, '≈ 1.5 hour(s)', NULL, 'single', 4.5, 186, false, true),
  ('Tooth Braces (Metal)', 3000, '≈ 1.5 hour(s)', '/treatments', 'multiple', 4.5, 220, false, true),
  ('Veneers', 925, '≈ 1.5 hour(s)', '/treatments', 'multiple', 4.0, 32, false, true),
  ('Bonding', 190, '≈ 1.5 hour(s)', NULL, 'single', 4.0, 4, false, true),
  ('Root Canal', 800, '≈ 2 hour(s)', '/treatments', 'multiple', 4.7, 63, false, false);
