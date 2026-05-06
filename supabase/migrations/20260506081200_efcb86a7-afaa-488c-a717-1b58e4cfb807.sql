-- Restrict SELECT to admin email only
DROP POLICY IF EXISTS "Authenticated can view contacts" ON public.contacts;

CREATE POLICY "Admin can view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'email') = 'hello@vougesty.com');

-- Allow admin to update status only
CREATE POLICY "Admin can update contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'email') = 'hello@vougesty.com')
WITH CHECK (
  (auth.jwt() ->> 'email') = 'hello@vougesty.com'
  AND status IN ('New', 'Contacted', 'Closed')
);