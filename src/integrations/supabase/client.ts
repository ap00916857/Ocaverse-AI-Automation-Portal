// Supabase client configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://yftxjpgxnmxwsgtbpvfn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmdHhqcGd4bm14d3NndGJwdmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Nzg0MDgsImV4cCI6MjA5MzQ1NDQwOH0.Lwb7HyvKiXtvn-ClxOBDM3ZnClxYO1AK9GyfA1exTIw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
