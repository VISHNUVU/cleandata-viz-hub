
// We no longer need this file as we're using the official Supabase client
// This file is kept for backwards compatibility
// Import from '@/integrations/supabase/client' instead

import { supabase as supabaseClient } from '@/integrations/supabase/client';
import { getMockRecentUploads } from '@/services/mockDataService';

// Export the official client
export const supabase = supabaseClient;

// For backwards compatibility
export function getMockUploadedFile() {
  return getMockRecentUploads()[0];
}
