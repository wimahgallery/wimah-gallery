CREATE TABLE blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content jsonb,
  cover_image_url text,
  cover_image_file_id text,
  author text DEFAULT 'WIMAH' NOT NULL,
  category text,
  published boolean DEFAULT false NOT NULL,
  visible boolean DEFAULT true NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view blogs" ON blogs
  FOR SELECT USING (true);

CREATE POLICY "Authenticated can insert blogs" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update blogs" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete blogs" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');
