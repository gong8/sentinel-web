import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fyyayfcesffwybpgqiav.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5eWF5ZmNlc2Zmd3licGdxaWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNzQxNTEsImV4cCI6MjA4NDg1MDE1MX0.oWxFbPxJUYN3nkGLhbyAKEf3I4qROEWDogG_ps0hi7Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
