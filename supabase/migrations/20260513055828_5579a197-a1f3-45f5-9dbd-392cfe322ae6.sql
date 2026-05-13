CREATE TABLE public.build_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  style TEXT NOT NULL,
  estimated_scope TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.build_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a build request
CREATE POLICY "Anyone can submit build requests"
ON public.build_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can read them (admin access via your existing admin flow)
CREATE POLICY "Authenticated users can view build requests"
ON public.build_requests
FOR SELECT
TO authenticated
USING (true);