
import { createClient } from '@supabase/supabase-js';

// Check if the Supabase URL and key are provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock supabase client when credentials are not available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient();

// Simple mock implementation for local development
function createMockSupabaseClient() {
  console.log('Using mock Supabase client. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  
  return {
    storage: {
      from: (bucket: string) => ({
        upload: async (path: string, file: File) => ({
          data: { path: `mock/${path}` },
          error: null
        }),
        getPublicUrl: (path: string) => ({
          data: { publicUrl: `https://example.com/${bucket}/${path}` }
        })
      })
    },
    from: (table: string) => ({
      select: () => ({
        order: () => ({
          limit: () => ({
            then: async () => []
          })
        })
      }),
      insert: async () => ({ data: { id: 'mock-id' }, error: null }),
      update: async () => ({ data: {}, error: null })
    })
  };
}
