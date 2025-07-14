import { createClient } from '@supabase/supabase-js';

//  HTTPS API URL, NOT postgresql//
const supabaseUrl = 'https://onwqwnihlpsjglzdhjkh.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ud3F3bmlobHBzamdsemRoamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0ODU4NTAsImV4cCI6MjA2ODA2MTg1MH0.AkMXiPMTAhBEPse7Nh9GhLxZRrzXdQwVOJJbNMIMrgI';

export const supabase = createClient(supabaseUrl, supabaseKey);
