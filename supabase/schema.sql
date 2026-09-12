-- =========================================================
-- OcaVerse CMS Schema: Tools Items & New Arrivals Items
-- =========================================================

-- 1. Create Tools & Products Table
CREATE TABLE IF NOT EXISTS public.tools_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  category TEXT DEFAULT 'AI Tools',
  badge TEXT DEFAULT 'NEW',
  features TEXT[] DEFAULT '{}',
  demo_url TEXT,
  price TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create New Arrivals Table
CREATE TABLE IF NOT EXISTS public.new_arrivals_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  badge TEXT DEFAULT 'JUST LAUNCHED',
  image_url TEXT,
  video_url TEXT,
  category TEXT DEFAULT 'SaaS & Automation',
  features TEXT[] DEFAULT '{}',
  early_bird_price TEXT,
  standard_price TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row-Level Security
ALTER TABLE public.tools_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.new_arrivals_items ENABLE ROW LEVEL SECURITY;

-- 4. Public Read Policies
DROP POLICY IF EXISTS "Allow public read tools_items" ON public.tools_items;
CREATE POLICY "Allow public read tools_items"
ON public.tools_items
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow public read new_arrivals_items" ON public.new_arrivals_items;
CREATE POLICY "Allow public read new_arrivals_items"
ON public.new_arrivals_items
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Admin Write Policies (authenticated users)
DROP POLICY IF EXISTS "Allow authenticated insert tools_items" ON public.tools_items;
CREATE POLICY "Allow authenticated insert tools_items"
ON public.tools_items
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update tools_items" ON public.tools_items;
CREATE POLICY "Allow authenticated update tools_items"
ON public.tools_items
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete tools_items" ON public.tools_items;
CREATE POLICY "Allow authenticated delete tools_items"
ON public.tools_items
FOR DELETE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert new_arrivals_items" ON public.new_arrivals_items;
CREATE POLICY "Allow authenticated insert new_arrivals_items"
ON public.new_arrivals_items
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update new_arrivals_items" ON public.new_arrivals_items;
CREATE POLICY "Allow authenticated update new_arrivals_items"
ON public.new_arrivals_items
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete new_arrivals_items" ON public.new_arrivals_items;
CREATE POLICY "Allow authenticated delete new_arrivals_items"
ON public.new_arrivals_items
FOR DELETE
TO authenticated
USING (true);

-- 6. Ensure contacts public submission is permitted
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contacts;
CREATE POLICY "Allow public contact form submissions"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 7. Seed Default New Arrival Item
INSERT INTO public.new_arrivals_items (
  title,
  subtitle,
  description,
  badge,
  image_url,
  video_url,
  category,
  features,
  early_bird_price,
  standard_price,
  is_active
) VALUES (
  'Lead Generator Pro',
  'Your AI-powered sales agent that never sleeps - captures, qualifies, and follows up with every lead automatically.',
  'Built for Real Estate, Medical, Legal, Restaurant, and Agencies',
  'JUST LAUNCHED',
  '/lead-gen-preview.png',
  'https://www.youtube-nocookie.com/embed/m6f9HBKB2Ls',
  'AI Sales Agent',
  ARRAY[
    'Up to 2000 leads/month',
    'All tab access included',
    'WhatsApp AI Agent',
    'Full Analytics Dashboard',
    'Priority Support'
  ],
  '?10,000/mo',
  '?15,000/mo',
  true
);

-- 8. Seed Default Tools Items
INSERT INTO public.tools_items (
  title,
  description,
  image_url,
  video_url,
  category,
  badge,
  features,
  demo_url,
  price
) VALUES 
(
  'WhatsApp AI Booking Assistant',
  'Conversational WhatsApp bot that answers inquiries 24/7, books calendar appointments, and captures lead data straight into CRM.',
  '/assets/customer-doctor-B1VMvH-1.jpg',
  'https://www.youtube-nocookie.com/embed/m6f9HBKB2Ls',
  'AI Automation',
  'POPULAR',
  ARRAY['24/7 Instant Responses', 'Google Calendar Sync', 'Automated Reminders', 'Multi-Language Support'],
  'https://wa.me/918796363097?text=Hi%20OcaVerse!%20Show%20me%20the%20WhatsApp%20Bot%20Demo',
  '?8,000/mo'
),
(
  'Instant Website Style Configurator',
  'Interactive 3-step dynamic builder letting businesses choose industry, select color aesthetic, and generate complete website layouts.',
  '/assets/portfolio-1-BNCrqpuF.jpg',
  '',
  'Web Tools',
  'FEATURED',
  ARRAY['Real-time 3D Style Engine', 'Pre-configured Industry Frameworks', 'One-Click Scope Calculation'],
  '/designs',
  'Free Preview'
),
(
  'Smart Omni-Channel Lead Pipeline',
  'Centralized lead management dashboard aggregating contact inquiries, chatbot conversations, and campaign metrics in real-time.',
  '/assets/demo-saas-BAFdEG5a.jpg',
  '',
  'Lead Gen',
  'PRO',
  ARRAY['Real-time Ingestion', 'Temperature Scoring (Hot/Warm/Cold)', 'Export to CSV & Webhook Dispatch'],
  '/admin',
  'Included in Pro'
);
