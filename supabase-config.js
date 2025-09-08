// Supabase configuration
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2';

// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database table name
export const TABLE_NAME = 'attendance_ppt';
