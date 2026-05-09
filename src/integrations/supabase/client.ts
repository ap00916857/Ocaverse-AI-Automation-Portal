// Manually configured to use the user's own Supabase project.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rrwstaqbxdhljrsnrgzm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_5GpbaBi7lMQeGhDoDmXa0Q_mdP9m3bi";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
