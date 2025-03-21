
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client - these would be provided by the Supabase integration
// For now we'll use environment variables or fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
