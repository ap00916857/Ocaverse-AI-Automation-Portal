CREATE TABLE public.chatbot_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_chatbot_messages_session ON public.chatbot_messages(session_id, created_at);

ALTER TABLE public.chatbot_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert chatbot messages"
ON public.chatbot_messages FOR INSERT
TO anon, authenticated
WITH CHECK (char_length(content) BETWEEN 1 AND 4000 AND role IN ('user','assistant'));

CREATE POLICY "Anyone can read chatbot messages"
ON public.chatbot_messages FOR SELECT
TO anon, authenticated
USING (true);